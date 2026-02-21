import type { DataProvider } from 'react-admin';
import Parse from 'parse';

import '../services/parseService'; // Ensure Parse is initialized

const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
        const { field, order } = params.sort || { field: 'createdAt', order: 'DESC' };

        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);

        query.skip((page - 1) * perPage);
        query.limit(perPage);

        if (order === 'DESC') {
            query.descending(field);
        } else {
            query.ascending(field);
        }

        if (params.filter) {
            Object.keys(params.filter).forEach(key => {
                query.equalTo(key, params.filter[key]);
            });
        }

        const [results, count] = await Promise.all([
            query.find(),
            query.count()
        ]);

        return {
            data: results.map(obj => ({ id: obj.id, ...obj.toJSON() })) as any[],
            total: count,
        } as any;
    },

    getOne: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);
        const result = await query.get(params.id as string);
        return {
            data: { id: result.id, ...result.toJSON() } as any,
        };
    },

    getMany: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);
        query.containedIn('objectId', params.ids as string[]);
        const results = await query.find();
        return {
            data: results.map(obj => ({ id: obj.id, ...obj.toJSON() })) as any[],
        };
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
        const { field, order } = params.sort || { field: 'createdAt', order: 'DESC' };

        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);

        query.equalTo(params.target, params.id);
        query.skip((page - 1) * perPage);
        query.limit(perPage);

        if (order === 'DESC') {
            query.descending(field);
        } else {
            query.ascending(field);
        }

        const [results, count] = await Promise.all([
            query.find(),
            query.count()
        ]);

        return {
            data: results.map(obj => ({ id: obj.id, ...obj.toJSON() })) as any[],
            total: count,
        } as any;
    },

    update: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);
        const obj = await query.get(params.id as string);

        // --- Delete files for removed language entries ---
        if (resource === 'Play') {
            const prevLanguages: any[] = params.previousData?.languages ?? [];
            const nextLanguages: any[] = params.data?.languages ?? [];

            // Build a set of file URLs that still exist in the new data
            const nextFileUrls = new Set(
                nextLanguages
                    .map((l: any) => l.file?.url || l.downloadUrl)
                    .filter(Boolean)
            );

            // Find languages that were removed (their file URL is no longer present)
            const removedLanguages = prevLanguages.filter((l: any) => {
                const url = l.file?.url || l.downloadUrl;
                return url && !nextFileUrls.has(url);
            });

            // Delete the associated Parse files via Cloud Function (requires server-side master key)
            await Promise.allSettled(
                removedLanguages.map(async (l: any) => {
                    try {
                        const fileName = l.file?.name || l.name;
                        if (fileName) {
                            await Parse.Cloud.run("deleteFile", { fileName });
                        }
                    } catch (e) {
                        console.warn('Could not delete file for removed language entry:', e);
                    }
                })
            );
        }

        // Handle file uploads
        const data = await uploadFiles(params.data);

        Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'objectId') {
                obj.set(key, data[key]);
            }
        });

        const result = await obj.save();
        return {
            data: { id: result.id, ...result.toJSON() } as any,
        };
    },

    updateMany: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const data = await uploadFiles(params.data);

        const objects = await Promise.all(params.ids.map(async id => {
            const query = new Parse.Query(Class);
            const obj = await query.get(id as string);
            Object.keys(data).forEach(key => {
                if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'objectId') {
                    obj.set(key, data[key]);
                }
            });
            return obj;
        }));

        const results = await Parse.Object.saveAll(objects);
        return {
            data: results.map(obj => obj.id) as any[],
        };
    },

    create: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const obj = new Class();

        // Handle file uploads
        const data = await uploadFiles(params.data);

        Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'objectId') {
                obj.set(key, data[key]);
            }
        });

        const result = await obj.save();
        return {
            data: { id: result.id, ...result.toJSON() } as any,
        };
    },

    delete: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const query = new Parse.Query(Class);
        const obj = await query.get(params.id as string);
        await obj.destroy();
        return {
            data: { id: params.id } as any,
        };
    },

    deleteMany: async (resource, params) => {
        const Class = Parse.Object.extend(resource);
        const objects = await Promise.all(params.ids.map(async id => {
            const query = new Parse.Query(Class);
            return query.get(id as string);
        }));

        await Parse.Object.destroyAll(objects);
        return {
            data: params.ids as any,
        };
    },
};

/**
 * Recursively find and upload File objects to Back4App
 */
const uploadFiles = async (data: any): Promise<any> => {
    if (!data || typeof data !== 'object') return data;

    // Handle React Admin File object (rawFile property)
    if (data.rawFile instanceof File) {
        const parseFile = new Parse.File(data.rawFile.name, data.rawFile);
        await parseFile.save();
        return parseFile;
    }

    // Handle Arrays (like PDF translations)
    if (Array.isArray(data)) {
        return Promise.all(data.map(item => uploadFiles(item)));
    }

    // Handle Objects
    const result: any = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            result[key] = await uploadFiles(data[key]);
        }
    }
    return result;
};

export default dataProvider;

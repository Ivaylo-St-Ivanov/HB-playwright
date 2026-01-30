import {
    Create,
    SimpleForm,
    TextInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    FileInput,
    FileField,
    useTranslate,
    Toolbar,
    SaveButton,
    Button,
    useRedirect,
    required,
    useRecordContext
} from 'react-admin';

import Parse from 'parse';

import MultiLanguageInput from '../../components/MultiLanguageInput';

export const PlayCreate = () => {
    const translate = useTranslate();
    const redirect = useRedirect();

    const PdfPreview = () => {
        const record = useRecordContext();
        const translate = useTranslate();

        if (!record || !record.file || !record.file.url) return null;

        return (
            <div style={{
                margin: '0.5rem 0',
                padding: '0.5rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
            }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.2rem', fontWeight: 'bold' }}>
                    {translate('custom.labels.current_file')}: {record.file.name}
                </div>
                <a
                    href={record.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85rem', color: '#2196f3', textDecoration: 'underline' }}
                >
                    {translate('custom.actions.open_in_new_tab')}
                </a>
            </div>
        );
    };

    const validateUniquePlayId = async (value: string) => {
        if (!value) return undefined;

        const slug = value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        const Play = Parse.Object.extend('Play');
        const query = new Parse.Query(Play);
        query.equalTo('playId', slug);
        const count = await query.count();

        return count > 0 ? 'custom.errors.duplicate_id' : undefined;
    };

    const transform = (data: any) => {
        const title = data.title?.en;
        const playId = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

        return {
            ...data,
            playId
        };
    };

    const CreateToolbar = () => (
        <Toolbar>
            <SaveButton />
            <Button
                label={translate('ra.action.back')}
                sx={{ ml: 2 }}
                onClick={() => redirect('list', 'Play')}
            />
        </Toolbar>
    );

    return (
        <Create transform={transform}>
            <SimpleForm toolbar={<CreateToolbar />}>
                {/* playId is auto-generated */}
                <NumberInput
                    source="year"
                    label={translate('resources.Play.fields.year')}
                    validate={required()}
                />

                <MultiLanguageInput
                    source="title"
                    label={translate('resources.Play.fields.title')}
                    validateBg={required()}
                    validateEn={[required(), validateUniquePlayId]}
                    validateEs={required()}
                    validateDe={required()}
                />
                <MultiLanguageInput
                    source="genre"
                    label={translate('resources.Play.fields.genre')}
                    validateBg={required()}
                    validateEn={required()}
                    validateEs={required()}
                    validateDe={required()}
                />
                <MultiLanguageInput
                    source="description"
                    label={translate('resources.Play.fields.description')}
                    multiline
                    validateBg={required()}
                    validateEn={required()}
                    validateEs={required()}
                    validateDe={required()}
                />



                <div
                    style={{
                        padding: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginTop: '1rem',
                        width: '100%'
                    }}
                >
                    <h3>{translate('custom.titles.pdf_translations')}</h3>
                    <ArrayInput
                        source="languages"
                        label={translate('resources.Play.fields.languages')}
                        validate={required()}
                    >
                        <SimpleFormIterator>
                            <TextInput
                                source="name"
                                label={translate('custom.labels.language_example')}
                                validate={required()}
                            />
                            <PdfPreview />
                            <FileInput
                                source="file"
                                label={translate('custom.actions.select_file')}
                                accept={{ 'application/pdf': [] }}
                                validate={required()}
                            >
                                <FileField source="src" title="name" />
                            </FileInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>
            </SimpleForm>
        </Create>
    );
};

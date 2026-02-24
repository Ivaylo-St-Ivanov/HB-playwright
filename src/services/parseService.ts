import Parse from 'parse';

// Initialize Parse SDK with Back4App credentials
const appId = import.meta.env.VITE_BACK4APP_APP_ID;
const jsKey = import.meta.env.VITE_BACK4APP_JS_KEY;

if (!appId || !jsKey) {
    console.error("CRITICAL: Back4App App ID or JS Key is missing in environment variables!");
} else {
    try {
        Parse.initialize(appId, jsKey);
        Parse.serverURL = 'https://parseapi.back4app.com/';
    } catch (error) {
        console.error("Error initializing Parse SDK:", error);
    }
}

/**
 * Fetch all plays from Back4App
 */
export const fetchPlays = async () => {
    // Uncomment to simulate API error for testing
    // throw new Error("Simulated API Error");

    const Play = Parse.Object.extend('Play');
    const query = new Parse.Query(Play);
    query.ascending('year');

    try {
        const results = await query.find();
        return results.map(play => ({
            id: play.id,
            ...play.toJSON()
        }));
    } catch (error) {
        console.error('Error fetching plays:', error);
        throw error;
    }
};

/**
 * Create a new play in Back4App
 */
export const createPlay = async (playData: any) => {
    const Play = Parse.Object.extend('Play');
    const play = new Play();

    Object.keys(playData).forEach(key => {
        play.set(key, playData[key]);
    });

    try {
        const result = await play.save();
        return result.toJSON();
    } catch (error) {
        console.error('Error creating play:', error);
        throw error;
    }
};

/**
 * Fetch all biography events from Back4App
 */
export const fetchBiographyEvents = async () => {
    const BiographyEvent = Parse.Object.extend('BiographyEvent');
    const query = new Parse.Query(BiographyEvent);
    query.ascending('order'); // Ensure they are sorted chronologically

    try {
        const results = await query.find();
        return results.map(event => ({
            id: event.id,
            ...event.toJSON()
        }));
    } catch (error) {
        console.error('Error fetching biography events:', error);
        throw error;
    }
};

/**
 * Fetch the additional biography info from Back4App
 */
export const fetchBiographyInfo = async () => {
    const BiographyInfo = Parse.Object.extend('BiographyInfo');
    const query = new Parse.Query(BiographyInfo);

    try {
        // There should be only one document
        const results = await query.find();
        if (results.length > 0) {
            return {
                id: results[0].id,
                ...results[0].toJSON()
            };
        }
        return null; // Return null if not found
    } catch (error) {
        console.error('Error fetching biography info:', error);
        throw error;
    }
};

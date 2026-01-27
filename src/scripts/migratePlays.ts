import Parse from 'parse';

// Initialize Parse
Parse.initialize(
    import.meta.env.VITE_BACK4APP_APP_ID,
    import.meta.env.VITE_BACK4APP_JS_KEY
);
Parse.serverURL = 'https://parseapi.back4app.com/';

/**
 * Migration script to transfer plays from JSON to Back4App
 * Run this once to populate the database
 */
export const migratePlaysToBack4App = async () => {
    console.log('🚀 Starting plays migration to Back4App...');

    // Fetch plays data from JSON file
    const response = await fetch('/src/data/plays.json');
    const playsData = await response.json();

    const Play = Parse.Object.extend('Play');
    let successCount = 0;
    let errorCount = 0;

    for (const playData of playsData) {
        try {
            const play = new Play();

            // Set all fields from JSON
            play.set('playId', playData.id);
            play.set('title', playData.title);
            play.set('year', playData.year);
            play.set('genre', playData.genre);
            play.set('description', playData.description);
            play.set('languages', playData.languages);

            await play.save();
            successCount++;
            console.log(`✅ Migrated: ${playData.title.en} (${playData.year})`);

        } catch (error) {
            errorCount++;
            console.error(`❌ Error migrating ${playData.title.en}:`, error);
        }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📝 Total: ${playsData.length}`);

    return { successCount, errorCount, total: playsData.length };
};

// Helper function to clear all plays (useful for testing)
export const clearAllPlays = async () => {
    console.log('🗑️  Clearing all plays from Back4App...');

    const Play = Parse.Object.extend('Play');
    const query = new Parse.Query(Play);
    query.limit(1000);

    try {
        const results = await query.find();
        await Parse.Object.destroyAll(results);
        console.log(`✅ Deleted ${results.length} plays`);
        return results.length;
    } catch (error) {
        console.error('❌ Error clearing plays:', error);
        throw error;
    }
};

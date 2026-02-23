import Parse from 'parse';
import contentData from '../data/content.json';

// Initialize Parse
Parse.initialize(
    import.meta.env.VITE_BACK4APP_APP_ID,
    import.meta.env.VITE_BACK4APP_JS_KEY
);
Parse.serverURL = 'https://parseapi.back4app.com/';

/**
 * Migration script to transfer Biography data from JSON to Back4App
 */
export const migrateBiographyToBack4App = async () => {
    console.log('🚀 Starting biography migration to Back4App...');

    const BiographyEvent = Parse.Object.extend('BiographyEvent');
    let successCount = 0;
    let errorCount = 0;

    // We'll migrate the events from the english version as the base structure,
    // but we'll include translations for all available languages.
    const events = contentData.en.biography.events;

    for (let i = 0; i < events.length; i++) {
        const year = events[i].year;
        try {
            const bioEvent = new BiographyEvent();

            // Set the common year
            bioEvent.set('year', year);

            // Set the order to maintain chronological sorting
            bioEvent.set('order', i);

            // Set translations for each language
            bioEvent.set('text_en', contentData.en.biography.events[i].text);
            bioEvent.set('text_bg', contentData.bg.biography.events[i].text);
            bioEvent.set('text_es', contentData.es.biography.events[i].text);
            bioEvent.set('text_de', contentData.de.biography.events[i].text);
            bioEvent.set('text_ru', contentData.ru.biography.events[i].text);

            await bioEvent.save();
            successCount++;
            console.log(`✅ Migrated event for year: ${year}`);
        } catch (error) {
            errorCount++;
            console.error(`❌ Error migrating event ${year}:`, error);
        }
    }

    // Now let's save the additional info as a separate object or a single settings object
    try {
        const BiographyInfo = Parse.Object.extend('BiographyInfo');
        const info = new BiographyInfo();

        info.set('text_en', contentData.en.biography.additionalInfo);
        info.set('text_bg', contentData.bg.biography.additionalInfo);
        info.set('text_es', contentData.es.biography.additionalInfo);
        info.set('text_de', contentData.de.biography.additionalInfo);
        info.set('text_ru', contentData.ru.biography.additionalInfo);

        await info.save();
        console.log(`✅ Migrated additional info`);
    } catch (error) {
        console.error(`❌ Error migrating additional info:`, error);
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount} events`);
    console.log(`   ❌ Errors: ${errorCount} events`);
    console.log(`   📝 Total: ${events.length} events`);

    return { successCount, errorCount, total: events.length };
};

// Helper function to clear all biography events
export const clearAllBiography = async () => {
    console.log('🗑️  Clearing all biography events from Back4App...');

    const BiographyEvent = Parse.Object.extend('BiographyEvent');
    const BiographyInfo = Parse.Object.extend('BiographyInfo');

    let deletedCount = 0;

    try {
        // Clear events
        const queryEvents = new Parse.Query(BiographyEvent);
        queryEvents.limit(1000);
        const resultsEvents = await queryEvents.find();
        await Parse.Object.destroyAll(resultsEvents);
        deletedCount += resultsEvents.length;

        // Clear additional info
        const queryInfo = new Parse.Query(BiographyInfo);
        queryInfo.limit(1000);
        const resultsInfo = await queryInfo.find();
        await Parse.Object.destroyAll(resultsInfo);
        deletedCount += resultsInfo.length;

        console.log(`✅ Deleted ${deletedCount} biography records`);
        return deletedCount;
    } catch (error) {
        console.error('❌ Error clearing biography:', error);
        throw error;
    }
};

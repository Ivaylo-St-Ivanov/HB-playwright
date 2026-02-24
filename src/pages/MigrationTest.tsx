import { useState } from 'react';

import { migratePlaysToBack4App, clearAllPlays } from '../scripts/migratePlays';
import { migrateBiographyToBack4App, clearAllBiography } from '../scripts/migrateBiography';
import './MigrationTest.css';

/**
 * Temporary test page for running the plays migration
 * This page will be removed after successful migration
 */
export const MigrationTest = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [migrationType, setMigrationType] = useState<'plays' | 'biography'>('plays');

    const handleMigrate = async () => {
        setIsRunning(true);
        setError(null);
        setResult(null);

        try {
            const migrationResult = migrationType === 'plays'
                ? await migratePlaysToBack4App()
                : await migrateBiographyToBack4App();
            setResult(migrationResult);
        } catch (err: any) {
            setError(err.message || 'Migration failed');
            console.error('Migration error:', err);
        } finally {
            setIsRunning(false);
        }
    };

    const handleClear = async () => {
        const typeName = migrationType === 'plays' ? 'пиеси' : 'биография';
        if (!confirm(`Сигурен ли си, че искаш да изтриеш всички ${typeName} от Back4App?`)) {
            return;
        }

        setIsRunning(true);
        setError(null);

        try {
            const count = migrationType === 'plays'
                ? await clearAllPlays()
                : await clearAllBiography();
            alert(`Изтрити ${count} ${migrationType === 'plays' ? 'пиеси' : 'записа от биографията'}`);
            setResult(null);
        } catch (err: any) {
            setError(err.message || 'Clear failed');
            console.error('Clear error:', err);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="migration-test">
            <h1>🔄 Миграция към Back4App</h1>

            <div className="migration-info">
                <p>Тази страница ще прехвърли данни от JSON файла в Back4App базата данни.</p>
                <p><strong>Важно:</strong> Изпълни миграцията само по веднъж за всеки тип!</p>
            </div>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="radio"
                        name="migrationType"
                        value="plays"
                        checked={migrationType === 'plays'}
                        onChange={() => setMigrationType('plays')}
                        disabled={isRunning}
                    />
                    Пиеси (Plays)
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="radio"
                        name="migrationType"
                        value="biography"
                        checked={migrationType === 'biography'}
                        onChange={() => setMigrationType('biography')}
                        disabled={isRunning}
                    />
                    Биография (Biography)
                </label>
            </div>

            <div className="migration-buttons">
                <button
                    onClick={handleMigrate}
                    disabled={isRunning}
                    className="btn-migrate"
                >
                    {isRunning ? '⏳ Изпълнява се...' : '🚀 Стартирай миграция'}
                </button>

                <button
                    onClick={handleClear}
                    disabled={isRunning}
                    className="btn-clear"
                >
                    🗑️ Изчисти всички ({migrationType === 'plays' ? 'пиеси' : 'биография'})
                </button>
            </div>

            {error && (
                <div className="migration-error">
                    <h3>❌ Грешка:</h3>
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="migration-result">
                    <h3>✅ Миграцията завърши!</h3>
                    <ul>
                        <li>Успешни: {result.successCount}</li>
                        <li>Грешки: {result.errorCount}</li>
                        <li>Общо: {result.total}</li>
                    </ul>
                </div>
            )}

            <div className="migration-console">
                <h3>📋 Консола</h3>
                <p>Отвори Developer Console (F12) за да видиш детайли на миграцията.</p>
            </div>
        </div>
    );
};

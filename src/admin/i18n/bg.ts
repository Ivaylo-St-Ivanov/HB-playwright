import type { TranslationMessages } from 'react-admin';
import bulgarianMessages from 'ra-language-bulgarian';

export const bgMessages: TranslationMessages = {
    ...bulgarianMessages,
    ra: {
        ...bulgarianMessages.ra,
        message: {
            ...bulgarianMessages.ra?.message,
            delete_content: 'Сигурни ли сте, че искате да изтриете този запис?',
            delete_title: 'Изтриване на пиеса',
        }
    },
    resources: {
        Play: {
            name: 'Пиеса |||| Пиеси',
            fields: {
                playId: 'ID',
                year: 'Година',
                title: 'Заглавие',
                genre: 'Жанр',
                description: 'Описание',

                languages: 'Преводи (PDF)',
                'languages.name': 'Език',
                'languages.file': 'Файл'
            },
        },
    },
    custom: {
        titles: {

            pdf_translations: 'PDF Преводи',
        },
        actions: {
            add_translation: 'Добави превод',
            select_file: 'Избери файл',
        },
        labels: {
            language_example: 'Език (напр. English)',
            title_bg: 'Заглавие (BG)',
            genre_bg: 'Жанр (BG)',
            id_example: 'ID (напр. colonel-bird)'
        }
    }
};

export default bgMessages;

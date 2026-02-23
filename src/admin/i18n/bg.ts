import type { TranslationMessages } from 'react-admin';
import bulgarianMessages from 'ra-language-bulgarian';

export const bgMessages: TranslationMessages = {
    ...bulgarianMessages,
    ra: {
        ...bulgarianMessages.ra,
        action: {
            ...bulgarianMessages.ra?.action,
            add: 'Добави',
            remove: 'Премахни',
            move_up: 'Премести нагоре',
            move_down: 'Премести надолу',
            clear_array_input: 'Изчисти всички',
        },
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
        BiographyEvent: {
            name: 'Събитие (Биография) |||| Събития (Биография)',
            fields: {
                order: 'Поредност',
                year: 'Година',
                text_bg: 'Текст (Български BG)',
                text_en: 'Текст (Английски EN)',
                text_es: 'Текст (Испански ES)',
                text_de: 'Текст (Немски DE)',
                text_ru: 'Текст (Руски RU)',
            },
        },
        BiographyInfo: {
            name: 'Доп. информация (Биография)',
            fields: {
                text_bg: 'Текст (Български BG)',
                text_en: 'Текст (Английски EN)',
                text_es: 'Текст (Испански ES)',
                text_de: 'Текст (Немски DE)',
                text_ru: 'Текст (Руски RU)',
            }
        }
    },
    custom: {
        titles: {

            pdf_translations: 'PDF Преводи',
        },
        actions: {
            add_translation: 'Добави превод',
            select_file: 'Избери файл',
            open_in_new_tab: 'Отвори в нов таб',
        },
        labels: {
            language_example: 'Език (напр. English)',
            title_bg: 'Заглавие (BG)',
            genre_bg: 'Жанр (BG)',
            id_example: 'ID (напр. colonel-bird)',
            current_file: 'Текущ файл',
            order_info: 'Определя реда на показване (напр. 1, 2, 3...)',
        },
        errors: {
            invalid_login: 'Невалидно потребителско име или парола',
            duplicate_id: 'Вече съществува пиеса с това заглавие (ID). Моля, изберете друго.',
        }
    }
};

export default bgMessages;

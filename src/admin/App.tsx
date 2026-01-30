import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { bgMessages } from './i18n/bg';

import { PlayList } from './resources/plays/PlayList';
import { PlayEdit } from './resources/plays/PlayEdit';
import { PlayCreate } from './resources/plays/PlayCreate';

// Initialize the Bulgarian provider
const i18nProvider = polyglotI18nProvider(() => bgMessages, 'bg');

const AdminApp = () => (
    <Admin
        basename="/admin"
        authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
    >
        <Resource
            name="Play"
            list={PlayList}
            edit={PlayEdit}
            create={PlayCreate}
            recordRepresentation={(record) => {
                if (!record) return '';
                if (record.title?.bg) return record.title.bg;
                if (record.title?.en) return record.title.en;
                if (record.playId) return record.playId;
                return record.id;
            }}
        />
    </Admin>
);

export default AdminApp;

import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { bgMessages } from './i18n/bg';

import { PlayList } from './resources/plays/PlayList';
import { PlayEdit } from './resources/plays/PlayEdit';
import { PlayCreate } from './resources/plays/PlayCreate';

import { BiographyEventList } from './resources/biography/BiographyEventList';
import { BiographyEventEdit } from './resources/biography/BiographyEventEdit';
import { BiographyEventCreate } from './resources/biography/BiographyEventCreate';

import { BiographyInfoList } from './resources/biography/BiographyInfoList';
import { BiographyInfoEdit } from './resources/biography/BiographyInfoEdit';
import { BiographyInfoCreate } from './resources/biography/BiographyInfoCreate';

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
        <Resource
            name="BiographyEvent"
            list={BiographyEventList}
            edit={BiographyEventEdit}
            create={BiographyEventCreate}
            recordRepresentation={(record) => {
                if (!record) return '';
                return `${record.year} - ${record.text_bg?.substring(0, 30)}...`;
            }}
        />
        <Resource
            name="BiographyInfo"
            list={BiographyInfoList}
            edit={BiographyInfoEdit}
            create={BiographyInfoCreate}
            recordRepresentation={(record) => {
                if (!record) return '';
                return 'Допълнителна информация';
            }}
        />
    </Admin>
);

export default AdminApp;

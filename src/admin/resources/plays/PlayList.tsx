import {
    List,
    Datagrid,
    NumberField,
    FunctionField,
    useTranslate,
    BulkDeleteButton
} from 'react-admin';

import ExpandableTextField from '../../components/ExpandableTextField';

// Custom Bulk Action Buttons with confirmation
const PlayBulkActionButtons = () => (
    <>
        <BulkDeleteButton mutationMode="pessimistic" />
    </>
);

export const PlayList = () => {
    const translate = useTranslate();

    return (
        <List
            sort={{ field: 'year', order: 'DESC' }}
        // Add custom bulk actions here
        >
            <Datagrid
                rowClick="edit"
                bulkActionButtons={<PlayBulkActionButtons />}
            >
                <ExpandableTextField source="playId" label={translate('resources.Play.fields.playId')} />

                <FunctionField
                    label={translate('custom.labels.title_bg')}
                    render={(record: any) => record.title?.bg || record.title?.en}
                    sortBy="title.bg"
                />

                <NumberField
                    source="year"
                    label={translate('resources.Play.fields.year')}
                    options={{ useGrouping: false }}
                />

                <FunctionField
                    label={translate('custom.labels.genre_bg')}
                    render={(record: any) => record.genre?.bg || record.genre?.en}
                    sortBy="genre.bg"
                />
            </Datagrid>
        </List>
    );
};

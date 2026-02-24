import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    CreateButton,
    TopToolbar,
    useListContext,
    BulkDeleteButton,
    useTranslate
} from 'react-admin';

const BiographyInfoBulkActionButtons = () => (
    <>
        <BulkDeleteButton
            mutationMode="pessimistic"
            confirmTitle="Изтриване на запис"
            confirmContent="Сигурни ли сте, че искате да изтриете допълнителната информация?"
        />
    </>
);

const BiographyInfoListActions = () => {
    const { total, isLoading } = useListContext();
    if (isLoading) return null;

    // Only show the Create button if there are no records
    return (
        <TopToolbar>
            {total === 0 && <CreateButton />}
        </TopToolbar>
    );
};

export const BiographyInfoList = () => {
    const translate = useTranslate();

    return (
        <List actions={<BiographyInfoListActions />}>
            <Datagrid rowClick="edit" bulkActionButtons={<BiographyInfoBulkActionButtons />}>
                <TextField source="text_bg" label={translate('resources.BiographyInfo.fields.text_bg')} />
                {/* <TextField source="text_en" label={translate('resources.BiographyInfo.fields.text_en')} /> */}
                <EditButton />
                <DeleteButton
                    mutationMode="pessimistic"
                    confirmTitle="Изтриване на запис"
                    confirmContent="Сигурни ли сте, че искате да изтриете допълнителната информация?"
                />
            </Datagrid>
        </List>
    );
};

import {
    List,
    Datagrid,
    TextField,
    NumberField,
    EditButton,
    DeleteButton,
    BulkDeleteButton,
    useTranslate
} from 'react-admin';

// Custom Bulk Action Buttons with specific biography confirmation messages
const BiographyBulkActionButtons = () => (
    <>
        <BulkDeleteButton
            mutationMode="pessimistic"
            confirmTitle="Изтриване на събития"
            confirmContent="Сигурни ли сте, че искате да изтриете избраните събития от биографията?"
        />
    </>
);

export const BiographyEventList = () => {
    const translate = useTranslate();

    return (
        <List sort={{ field: 'order', order: 'ASC' }}>
            <Datagrid rowClick="edit" bulkActionButtons={<BiographyBulkActionButtons />}>
                <NumberField source="order" label={translate('resources.BiographyEvent.fields.order')} />
                <TextField source="year" label={translate('resources.BiographyEvent.fields.year')} />
                <TextField source="text_bg" label={translate('resources.BiographyEvent.fields.text_bg')} />
                {/* <TextField source="text_en" label={translate('resources.BiographyEvent.fields.text_en')} /> */}
                <EditButton />
                <DeleteButton
                    mutationMode="pessimistic"
                    confirmTitle="Изтриване на събитие"
                    confirmContent="Сигурни ли сте, че искате да изтриете това събитие от биографията?"
                />
            </Datagrid>
        </List>
    );
};

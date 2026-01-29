import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    FileInput,
    FileField,
    useTranslate,
    useRecordContext,
    Toolbar,
    SaveButton,
    Button,
    useRedirect,
    required
} from 'react-admin';

import MultiLanguageInput from '../../components/MultiLanguageInput';

const PlayTitle = () => {
    const record = useRecordContext();
    return <span>{record ? (record.title?.bg || record.title?.en) : ''}</span>;
};

export const PlayEdit = () => {
    const translate = useTranslate();
    const redirect = useRedirect();

    const EditToolbar = () => (
        <Toolbar>
            <SaveButton />
            <Button
                label={translate('ra.action.back')}
                sx={{ ml: 2 }}
                onClick={() => redirect('list', 'Play')}
            />
        </Toolbar>
    );

    return (
        <Edit title={<PlayTitle />}>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="playId" label={translate('custom.labels.id_example')} fullWidth disabled />
                <NumberInput source="year" label={translate('resources.Play.fields.year')} />

                <MultiLanguageInput
                    source="title"
                    label={translate('resources.Play.fields.title')}
                    validateEn={required()}
                />
                <MultiLanguageInput source="genre" label={translate('resources.Play.fields.genre')} />
                <MultiLanguageInput
                    source="description"
                    label={translate('resources.Play.fields.description')}
                    multiline
                />

                <div
                    style={{
                        padding: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginTop: '1rem',
                        width: '100%'
                    }}
                >
                    <h3>{translate('custom.titles.pdf_translations')}</h3>
                    <ArrayInput source="languages" label={translate('resources.Play.fields.languages')}>
                        <SimpleFormIterator>
                            <TextInput source="name" label={translate('custom.labels.language_example')} />
                            <FileInput
                                source="file"
                                label={translate('custom.actions.select_file')}
                                accept={{ 'application/pdf': [] }}
                            >
                                <FileField source="src" title="name" />
                            </FileInput>
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>
            </SimpleForm>
        </Edit>
    );
};

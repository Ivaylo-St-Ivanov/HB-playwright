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

const PdfPreview = () => {
    const record = useRecordContext();
    const translate = useTranslate();

    if (!record || !record.file || !record.file.url) return null;

    return (
        <div style={{
            margin: '0.5rem 0',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px'
        }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.2rem', fontWeight: 'bold' }}>
                {translate('custom.labels.current_file')}: {record.file.name}
            </div>
            <a
                href={record.file.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.85rem', color: '#2196f3', textDecoration: 'underline' }}
            >
                {translate('custom.actions.open_in_new_tab')}
            </a>
        </div>
    );
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
                <NumberInput
                    source="year"
                    label={translate('resources.Play.fields.year')}
                    validate={required()}
                />

                <MultiLanguageInput
                    source="title"
                    label={translate('resources.Play.fields.title')}
                    validateBg={required()}
                    validateEn={required()}
                    validateEs={required()}
                    validateDe={required()}
                />
                <MultiLanguageInput
                    source="genre"
                    label={translate('resources.Play.fields.genre')}
                    validateBg={required()}
                    validateEn={required()}
                    validateEs={required()}
                    validateDe={required()}
                />
                <MultiLanguageInput
                    source="description"
                    label={translate('resources.Play.fields.description')}
                    multiline
                    validateBg={required()}
                    validateEn={required()}
                    validateEs={required()}
                    validateDe={required()}
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
                    <ArrayInput
                        source="languages"
                        label={translate('resources.Play.fields.languages')}
                        validate={required()}
                    >
                        <SimpleFormIterator>
                            <TextInput
                                source="name"
                                label={translate('custom.labels.language_example')}
                                validate={required()}
                            />
                            <PdfPreview />
                            <FileInput
                                source="file"
                                label={translate('custom.actions.select_file')}
                                accept={{ 'application/pdf': [] }}
                                validate={required()}
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

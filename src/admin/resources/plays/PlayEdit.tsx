import { useState } from 'react';
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

/** Strip the hex prefix that Parse/Back4App prepends to uploaded file names. */
const cleanFileName = (name: string) => {
    const match = name.match(/^[0-9a-f]{32}_(.+)$/i);
    return match ? match[1] : name;
};

/**
 * Shows existing file info + a "Change file" toggle.
 * When there is no existing file the upload field is always visible.
 */
const PdfSection = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    const [isRemoved, setIsRemoved] = useState(false);

    if (!record) return null;

    const fileUrl = record.file?.url || record.downloadUrl || (typeof record.file === 'string' ? record.file : null);
    const rawFileName = record.file?.name || record.name || (typeof record.file === 'string' ? record.file.split('/').pop() : 'PDF File');
    const fileName = cleanFileName(rawFileName ?? 'PDF File');

    const hasExistingFile = Boolean(fileUrl) && !isRemoved;

    return (
        <>
            {/* Preview of existing file — shown until user removes it */}
            {hasExistingFile && (
                <div style={{
                    margin: '0.5rem 0',
                    padding: '0.5rem',
                    backgroundColor: '#bab1b1',
                    border: '1px solid #bdbdbd',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
                            {translate('custom.labels.current_file')}: {fileName}
                        </div>
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.85rem', color: '#2196f3', textDecoration: 'underline' }}
                        >
                            {translate('custom.actions.open_in_new_tab')}
                        </a>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsRemoved(true)}
                        style={{
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            border: '1px solid #888',
                            background: '#d32f2f',
                            color: '#fff',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {translate('ra.action.delete')}
                    </button>
                </div>
            )}

            {/* Upload field — shown for new items, or once the existing file is removed */}
            {(!hasExistingFile) && (
                <FileInput
                    source="file"
                    label={translate('custom.actions.select_file')}
                    accept={{ 'application/pdf': [] }}
                    validate={required()}
                >
                    <FileField source="src" title="name" />
                </FileInput>
            )}
        </>
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
                            <PdfSection />
                        </SimpleFormIterator>
                    </ArrayInput>
                </div>
            </SimpleForm>
        </Edit>
    );
};

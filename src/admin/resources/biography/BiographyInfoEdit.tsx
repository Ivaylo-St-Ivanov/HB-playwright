import {
    Edit,
    SimpleForm,
    TextInput,
    useTranslate,
    required,
    Toolbar,
    SaveButton,
    Button,
    useRedirect
} from 'react-admin';
import { Typography } from '@mui/material';

export const BiographyInfoEdit = () => {
    const translate = useTranslate();
    const redirect = useRedirect();

    const CustomToolbar = () => (
        <Toolbar>
            <SaveButton />
            <Button
                label={translate('ra.action.back')}
                sx={{ ml: 2 }}
                onClick={() => redirect('list', 'BiographyInfo')}
            />
        </Toolbar>
    );

    return (
        <Edit>
            <SimpleForm toolbar={<CustomToolbar />}>
                <Typography variant="h6" gutterBottom>
                    Additional Information Translations
                </Typography>

                <TextInput
                    source="text_bg"
                    label={translate('resources.BiographyInfo.fields.text_bg')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_en"
                    label={translate('resources.BiographyInfo.fields.text_en')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_es"
                    label={translate('resources.BiographyInfo.fields.text_es')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_de"
                    label={translate('resources.BiographyInfo.fields.text_de')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_ru"
                    label={translate('resources.BiographyInfo.fields.text_ru')}
                    multiline
                    fullWidth
                    validate={required()}
                />
            </SimpleForm>
        </Edit>
    );
};

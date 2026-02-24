import {
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    useTranslate,
    required,
    Toolbar,
    SaveButton,
    Button,
    useRedirect
} from 'react-admin';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const OrderLabel = () => {
    const translate = useTranslate();
    return (
        <Box display="flex" alignItems="center" gap={0.5}>
            <span>{translate('resources.BiographyEvent.fields.order')}</span>
            <Tooltip
                title={
                    <span style={{ fontSize: '1.2rem', padding: '4px' }}>
                        {translate('custom.labels.order_info')}
                    </span>
                }
                arrow
                placement="top"
            >
                <InfoOutlinedIcon color="primary" sx={{ fontSize: 28, cursor: 'pointer' }} />
            </Tooltip>
        </Box>
    );
};

export const BiographyEventEdit = () => {
    const translate = useTranslate();
    const redirect = useRedirect();

    const CustomToolbar = () => (
        <Toolbar>
            <SaveButton />
            <Button
                label={translate('ra.action.back')}
                sx={{ ml: 2 }}
                onClick={() => redirect('list', 'BiographyEvent')}
            />
        </Toolbar>
    );

    return (
        <Edit>
            <SimpleForm toolbar={<CustomToolbar />}>
                <Box display="flex" gap="1rem">
                    <NumberInput
                        source="order"
                        label={<OrderLabel />}
                        validate={required()}
                    />
                    <TextInput
                        source="year"
                        label={translate('resources.BiographyEvent.fields.year')}
                        validate={required()}
                    />
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Translations
                </Typography>

                <TextInput
                    source="text_bg"
                    label={translate('resources.BiographyEvent.fields.text_bg')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_en"
                    label={translate('resources.BiographyEvent.fields.text_en')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_es"
                    label={translate('resources.BiographyEvent.fields.text_es')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_de"
                    label={translate('resources.BiographyEvent.fields.text_de')}
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput
                    source="text_ru"
                    label={translate('resources.BiographyEvent.fields.text_ru')}
                    multiline
                    fullWidth
                    validate={required()}
                />

            </SimpleForm>
        </Edit>
    );
};

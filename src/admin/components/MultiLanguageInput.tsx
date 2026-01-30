import React from 'react';
import { useFormState } from 'react-hook-form';
import { TextInput } from 'react-admin';
import { Box, Tabs, Tab, Badge } from '@mui/material';

interface MultiLanguageInputProps {
    source: string;
    label: string;
    multiline?: boolean;
    validateBg?: any;
    validateEn?: any;
    validateEs?: any;
    validateDe?: any;
}

const MultiLanguageInput: React.FC<MultiLanguageInputProps> = ({
    source, label, multiline = false, validateBg, validateEn, validateEs, validateDe
}) => {
    const [tabValue, setTabValue] = React.useState(0);
    const { errors } = useFormState();

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const hasError = (lang: string) => {
        // Access nested errors in react-hook-form (source.lang.message or similar)
        const fieldError = (errors as any)?.[source]?.[lang];
        return !!fieldError;
    };

    const TabLabel = ({ label, lang }: { label: string, lang: string }) => (
        <Badge variant="dot" color="error" invisible={!hasError(lang)}>
            {label}
        </Badge>
    );

    return (
        <Box
            sx={{
                width: '100%',
                mb: 2,
                border: '1px solid #ccc',
                borderRadius: 1,
                p: 2,
                bgcolor: 'background.paper'
            }}
        >
            <Box sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>{label}</Box>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
                <Tab label={<TabLabel label="🇧🇬 Български" lang="bg" />} />
                <Tab label={<TabLabel label="🇬🇧 English" lang="en" />} />
                <Tab label={<TabLabel label="🇪🇸 Español" lang="es" />} />
                <Tab label={<TabLabel label="🇩🇪 Deutsch" lang="de" />} />
            </Tabs>

            <Box sx={{ mt: 1 }}>
                <Box sx={{ display: tabValue === 0 ? 'block' : 'none' }}>
                    <TextInput
                        source={`${source}.bg`}
                        label={`${label} (BG)`}
                        fullWidth
                        multiline={multiline}
                        size="small"
                        validate={validateBg}
                    />
                </Box>
                <Box sx={{ display: tabValue === 1 ? 'block' : 'none' }}>
                    <TextInput
                        source={`${source}.en`}
                        label={`${label} (EN)`}
                        fullWidth
                        multiline={multiline}
                        size="small"
                        validate={validateEn}
                    />
                </Box>
                <Box sx={{ display: tabValue === 2 ? 'block' : 'none' }}>
                    <TextInput
                        source={`${source}.es`}
                        label={`${label} (ES)`}
                        fullWidth
                        multiline={multiline}
                        size="small"
                        validate={validateEs}
                    />
                </Box>
                <Box sx={{ display: tabValue === 3 ? 'block' : 'none' }}>
                    <TextInput
                        source={`${source}.de`}
                        label={`${label} (DE)`}
                        fullWidth
                        multiline={multiline}
                        size="small"
                        validate={validateDe}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MultiLanguageInput;

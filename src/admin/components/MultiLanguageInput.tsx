import React from 'react';
import { TextInput } from 'react-admin';
import { Box, Tabs, Tab } from '@mui/material';

interface MultiLanguageInputProps {
    source: string;
    label: string;
    multiline?: boolean;
    validateBg?: any;
    validateEn?: any;
}

const MultiLanguageInput: React.FC<MultiLanguageInputProps> = ({
    source, label, multiline = false, validateBg, validateEn
}) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
                <Tab label="🇧🇬 Български" />
                <Tab label="🇬🇧 English" />
                <Tab label="🇪🇸 Español" />
                <Tab label="🇩🇪 Deutsch" />
            </Tabs>

            <Box sx={{ mt: 1 }}>
                {tabValue === 0 && <TextInput
                    source={`${source}.bg`}
                    label={`${label} (BG)`}
                    fullWidth
                    multiline={multiline}
                    size="small"
                    validate={validateBg}
                />}
                {tabValue === 1 && <TextInput
                    source={`${source}.en`}
                    label={`${label} (EN)`}
                    fullWidth
                    multiline={multiline}
                    size="small"
                    validate={validateEn}
                />}
                {tabValue === 2 && <TextInput
                    source={`${source}.es`}
                    label={`${label} (ES)`}
                    fullWidth
                    multiline={multiline}
                    size="small"
                />}
                {tabValue === 3 && <TextInput
                    source={`${source}.de`}
                    label={`${label} (DE)`}
                    fullWidth
                    multiline={multiline}
                    size="small"
                />}
            </Box>
        </Box>
    );
};

export default MultiLanguageInput;

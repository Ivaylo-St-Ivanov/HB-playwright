import { useState } from 'react';
import { useRecordContext, useTranslate } from 'react-admin';
import { Typography, IconButton, Box } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ExpandableTextFieldProps {
    source: string;
    label?: string; // React-Admin uses this for the column header
}

const ExpandableTextField = ({ source }: ExpandableTextFieldProps) => {
    const [expanded, setExpanded] = useState(false);
    const record = useRecordContext();
    const translate = useTranslate();

    if (!record) return null;
    const value = record[source];

    // If there is no value, render nothing
    if (!value) return null;

    return (
        <Box display="flex" alignItems="center" onClick={(e) => e.stopPropagation()}>
            <IconButton
                size="small"
                onClick={() => setExpanded(!expanded)}
                aria-label={expanded
                    ? translate('ra.action.close')
                    : translate('ra.action.expand')}
                sx={{ padding: 0.5 }}
            >
                {expanded
                    ? <KeyboardArrowDownIcon fontSize="small" />
                    : <KeyboardArrowRightIcon fontSize="small" />}
            </IconButton>
            {expanded && (
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    {value}
                </Typography>
            )}
        </Box>
    );
};

export default ExpandableTextField;

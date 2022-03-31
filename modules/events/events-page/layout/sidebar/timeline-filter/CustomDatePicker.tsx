import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { DesktopDatePicker, MobileDatePicker } from '@mui/lab';

interface DatePickerProps {
    onChange: (newValue: Date | null) => void,
    label: string;
    value: number;
}

const CustomDatePicker = (props: DatePickerProps) => <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker value={props.value} label={props.label} onChange={props.onChange} renderInput={(params) => <TextField {...params} />} /></LocalizationProvider>;

export const CustomMobileDatePicker = (props: DatePickerProps) => <LocalizationProvider dateAdapter={AdapterDateFns}><MobileDatePicker value={props.value} label={props.label} onChange={props.onChange} renderInput={(params) => <TextField {...params} />} /></LocalizationProvider>;

export const CustomDesktopDatePicker = (props: DatePickerProps) => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker value={props.value} label={props.label} onChange={props.onChange} renderInput={(params) => <TextField {...params} />} /></LocalizationProvider>;

export default CustomDatePicker;

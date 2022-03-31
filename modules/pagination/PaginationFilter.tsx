import TextField, {} from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface PaginationFilterProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: number;
    label: string;
}

const PaginationFilter = (props: PaginationFilterProps) => <TextField value={props.value} label={props.label} onChange={props.onChange} type="number" size="small" />

export default PaginationFilter;

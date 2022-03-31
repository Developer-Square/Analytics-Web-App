import React, { useState, ChangeEvent } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MiniHeader } from './Date'
import { useAppDispatch, useAppSelector } from '@/modules/redux/app/hooks';
import { eventsPerPageChanged, selectEventsPerPage } from '@/modules/events/events.slice';
import PaginationFilter from '@/modules/pagination/PaginationFilter';


type Props = {}

export default function Display({ }: Props) {
    const dispatch = useAppDispatch();
    const eventsPerPage = useAppSelector(selectEventsPerPage);
    const [identification, setIdentification] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setIdentification(event.target.value as string);
    };

    const handleEventsPerPageChanged = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(eventsPerPageChanged(parseInt(event.target.value, 10)));
    }

    const menuItems = ['Show All', 'Identified Only', 'Unidentified Only']

    return (
        <>
            <MiniHeader>Display</MiniHeader>
            <div className="flex mb-3">
                <Typography variant='body2'>Identification:</Typography>
                <FormControl sx={{ ml: 1, minWidth: 120 }}>
                    <Select
                        value={identification}
                        label="Identification"
                        onChange={handleChange}
                        sx={{ height: '40px' }}
                    >
                        {menuItems.length && menuItems.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="flex mb-3 mt-4">
                <Typography variant='body2'>Events Per Page:</Typography>
                <PaginationFilter
                    value={eventsPerPage}
                    label='Events Per Page'
                    onChange={handleEventsPerPageChanged}
                />
            </div>
        </>
    )
}
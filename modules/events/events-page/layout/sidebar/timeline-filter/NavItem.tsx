import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

import camelize from '@/modules/utilities/camelize'
import { useAppDispatch } from '@/modules/redux/app/hooks';
import { categoryFilterChanged } from '@/modules/events/events.filter.slice'

type Props = {
    title?: string,
}

export default function NavItem({ title }: Props) {
    const dispatch = useAppDispatch()
    const [checked, setChecked] = useState(false)
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, title: string) => {
        if (evt.target.checked) {
            const result = camelize(title)
            dispatch(categoryFilterChanged(result))
        } else {
            dispatch(categoryFilterChanged('All'))
        }

        setChecked(evt.target.checked)
    }
    return (
        <>
            <FormControl sx={{ width: '8.3rem' }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={checked}
                                onChange={(e) => handleChange(e, title ?? '')} name={title} />
                        }

                        label={<Typography variant='body2'>{title ?? 'No label'}</Typography>}
                    />
                </FormGroup>
            </FormControl>
        </>
    )
}
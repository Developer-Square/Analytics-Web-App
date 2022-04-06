import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

import camelize from '@/modules/utilities/camelize'
import { useAppDispatch, useAppSelector } from '@/modules/redux/app/hooks';
import { categoriesFilterAdded, categoriesFilterRemoved, multipleCategoriesAdded, multipleCategoriesRemoved } from '@/modules/events/events.multifilter.slice'

type Props = {
    title?: string,
}

export default function NavItem({ title }: Props) {
    const dispatch = useAppDispatch()
    const events = useAppSelector(state => state.eventsMultipleFilters.events)
    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>, title: string) => {
        const result = camelize(title)
        const commerceItems = ['addToCart', 'removeFromCart', 'newOrder', 'payment']
        const userItems = ['login', 'register', 'userIdentified']
        const trafficItems = ['visitPage']

        if (evt.target.checked) {
            // If the user has selected 'Commerce' in the categories section then display any event
            // related to commerce eg. addToCart, newOrder, payment.
            // The same applies to 'User' and 'Traffic'.
            if (title === 'Commerce') {
                dispatch(multipleCategoriesAdded(commerceItems))
            } else if (title === 'User') {
                dispatch(multipleCategoriesAdded(userItems))
            } else if (title === 'Traffic') {
                dispatch(multipleCategoriesAdded(trafficItems))
            } else {
                dispatch(categoriesFilterAdded(result))
            }
        } else {
            if (title === 'Commerce' || title === 'User' || title === 'Traffic') {
                dispatch(multipleCategoriesRemoved())
            } else {
                dispatch(categoriesFilterRemoved(result))
            }
        }
    }
    return (
        <>
            <FormControl sx={{ width: '8.3rem' }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            // If the action/filter has already been selected then the checkbox should be
                            // checked
                            <Checkbox checked={events.includes(camelize(title ?? '')) ? true : false}
                                onChange={(e) => handleChange(e, title ?? '')} name={title} />
                        }
                        label={<Typography variant='body2'>{title ?? 'No label'}</Typography>}
                    />
                </FormGroup>
            </FormControl>
        </>
    )
}
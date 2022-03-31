import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { BrowserView, MobileView } from 'react-device-detect';
import styled from '@emotion/styled'
import { useAppDispatch, useAppSelector } from '@/modules/redux/app/hooks';
import { finalDateChanged, initialDateChanged, selectFinalDate, selectInitialDate } from '@/modules/redux/universalReducers/dateFilter.slice';
import { CustomMobileDatePicker, CustomDesktopDatePicker } from './CustomDatePicker';


type Props = {}

export default function Date({ }: Props) {
    const dispatch = useAppDispatch();
    const initialDate = useAppSelector(selectInitialDate);
    const finalDate = useAppSelector(selectFinalDate);

    return (
        <>
            <MiniHeader>Date</MiniHeader>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileView>
                    <CustomMobileDatePicker 
                        label='Starting date'
                        value={initialDate}
                        onChange={(newValue) => {
                            if(newValue) dispatch(initialDateChanged(newValue.getTime()))
                        }}
                    />
                    <Box sx={{ my: 2 }}> to </Box>
                    <CustomMobileDatePicker 
                        label='Ending date'
                        value={finalDate}
                        onChange={(newValue) => {
                            if(newValue) dispatch(finalDateChanged(newValue.getTime()))
                        }}
                    />
                </MobileView>
                <BrowserView>
                    <CustomDesktopDatePicker 
                        label='Starting date'
                        value={initialDate}
                        onChange={(newValue) => {
                            if(newValue) dispatch(initialDateChanged(newValue.getTime()))
                        }}
                    />
                    <Box sx={{ my: 2 }}> to </Box>
                    <CustomDesktopDatePicker 
                        label='Ending date'
                        value={finalDate}
                        onChange={(newValue) => {
                            if(newValue) dispatch(finalDateChanged(newValue.getTime()))
                        }}
                    />
                </BrowserView>
            </LocalizationProvider>
        </>
    )
}

export const MiniHeader = styled.h5`
    font-weight: bold;
    margin-bottom: 7px
`
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import { DateRange } from '@mui/lab/DateRangePicker';
import { BrowserView, MobileView } from 'react-device-detect';
import styled from '@emotion/styled'


type Props = {}

export default function Date({ }: Props) {
    const [value, setValue] = useState<DateRange<Date>>([null, null]);
    return (
        <>
            <MiniHeader>Date</MiniHeader>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileView>
                    <MobileDateRangePicker
                        startText="Pick a starting date"
                        endText="Pick an ending date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField size='small' {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField size='small' {...endProps} />
                            </>
                        )}
                    />
                </MobileView>
                <BrowserView>
                    <DesktopDateRangePicker
                        startText="Pick a starting date"
                        endText="Pick an ending date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField size='small' {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField size='small' {...endProps} />
                            </>
                        )}
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
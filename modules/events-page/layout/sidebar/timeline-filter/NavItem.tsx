import Box from '@mui/material/Box'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'

type Props = {
    title?: string
}

export default function NavItem({ title }: Props) {
    return (
        <>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox name={title} />
                        }
                        label={title ?? 'No label'}
                    />
                </FormGroup>
            </FormControl>
        </>
    )
}
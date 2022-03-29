import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'

type Props = {
    title?: string,
}

export default function NavItem({ title }: Props) {
    return (
        <>
            <FormControl sx={{ width: '8.3rem' }} component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox name={title} />
                        }
                        label={<Typography variant='body2'>{title ?? 'No label'}</Typography>}
                    />
                </FormGroup>
            </FormControl>
        </>
    )
}
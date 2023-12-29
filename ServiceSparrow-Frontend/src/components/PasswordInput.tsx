import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


interface Props {
    label: string,
    placeholder: string,
    icon?: any
    onChange?: (e: any) => void;
    value:any   
    style?:any
    id:any


}
const PasswordInput: React.FC<Props> = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.ChangeEvent<any>) => {
      event.preventDefault();
    };

    return(
        <FormControl
        sx={{
          '& label': { paddingLeft: (theme) => theme.spacing(1),top:-3.3 ,
          },
          '& input': { paddingLeft: (theme) => theme.spacing(2),
                
                
    
            },
            "& .MuiInputBase-root": {
                height: 48
            },
            '& fieldset': {
              paddingLeft: (theme) => theme.spacing(2),
              borderRadius: '12px',
              border: "1px solid #DCDBDD",
    
            },
            "&::placeholder": {    // <----- Add this.
                opacity: 1,
                color:'#84818A'
             },
             width:"100%",
             
          }}
        variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
        <OutlinedInput
        fullWidth
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        style={{marginBottom:10}}

          id={props.id}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
               
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={props.label}
        />
      </FormControl>
    )
}

export default PasswordInput;
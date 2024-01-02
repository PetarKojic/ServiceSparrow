import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';


interface Props {
  label: string,
  placeholder: string,
  icon?: any
  onChange?: (e: any) => void;
  value: any
  width?: any
  inputMode?: any;
  id?: any


}

const Input: React.FC<Props> = (props) => {
  return (

    <Box
      component="form"

      sx={{
        '& label': { paddingLeft: (theme) => theme.spacing(1), top: -3.3 },
        '& input': {
          paddingLeft: (theme) => theme.spacing(2),

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
          color: '#84818A'
        },
      }}

      //   sx={{
      //     '& .MuiTextField-root': { m: 1, width: '25ch' },
      //   }}
      noValidate
      autoComplete="off"
    >
      <Grid item xs={12} md={6}>

        <TextField
          id={props.id}
          label={props.label}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          style={{ marginBottom: 20 }}
          sx={{
            width: props.width,
          }}
          inputProps={{ inputMode: props.inputMode }}

        />

      </Grid>
    </Box>
  );
}
export default Input;
import React from "react";
import styled from "styled-components";
import { Button } from '@mui/material';
import Loadercom from "./Loadercom";

interface Props {
    title: string;
    onClick: () => void;
    style?: any;
    width?: any;
    type?: any
    onSubmit?: () => void;
    load?: boolean;
    disabled?: boolean;
    fontSize: any;

}
const buttonStyle = {
    backgroundColor: '#7476d1',
    color: '#fff', 
    borderRadius:5,
    padding: '10px 20px',

  };

const ButtonComp: React.FC<Props> = (props) => {
    return (
        <>
            {!props.load ?
                <Button variant="contained" fullWidth
                    disabled={props.disabled}
                    type="submit"
                    onSubmit={!props.disabled ? props.onSubmit : () => { console.log('disabled') }}
                    onClick={!props.disabled ? props.onClick : () => { console.log('disabled') }}
                    style={buttonStyle}>
                    {props.title}
                </Button>

                :
                <Loadercom />
            }
        </>
    )
}
export default ButtonComp;
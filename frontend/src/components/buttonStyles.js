import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #d12823;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #db504c;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`
  && {
    background-color: #0a1e82;
    color: #fff;
    &:hover {
      background-color: #080a43;
    }
  }
`;

export const PurpleButton = styled(Button)`
 && {
    background: #2f3095;
    color: #fff;
    &:hover {
      font-weight: 400;
      border:2px solid #2f3095;
    }
  }
`;

export const LightPurpleButton = styled(Button)`
  && {
    background: #2f3095;
    color: #fff;
    &:hover {
      background:"none";
      font-weight: 400;
      border:2px solid #2f3095;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #0a1e82;
    color: #fff;
    &:hover {
      background-color: #080a43;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

export const IndigoButton = styled(Button)`
  && {
    background-color: #2f2b80;
    color: white;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;

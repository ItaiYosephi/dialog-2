import { FC } from 'react';
import { DialogConfig } from './types';

export interface DialogProps {
  onConfirm: <T>(value: T) => void;
  onReject: <T>(value: T) => void;
  config?: DialogConfig;
}

export const Dialog: FC<DialogProps> = ({ onConfirm, onReject }) => {
  return <></>;
};

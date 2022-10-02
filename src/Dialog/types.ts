import { ReactNode } from 'react';

export enum DialogType {
  Alert,
  Confirm,
  Prompt,
}

export interface BaseDialogConfig<T extends DialogType> {
  type: T;
  isOpen: boolean;
  title: string;
  buttonText?: string;
}

export type DialogFunctionConfig<T extends BaseDialogConfig<DialogType>> = Omit<
  T,
  'type' | 'isOpen'
>;

export interface ConfirmDialogConfig
  extends BaseDialogConfig<DialogType.Confirm> {
  content: ReactNode;
  secondaryButtonText?: string;
}

export type ConfirmDialogFunctionConfig =
  DialogFunctionConfig<ConfirmDialogConfig>;

export interface AlertDialogConfig extends BaseDialogConfig<DialogType.Alert> {
  content: ReactNode;
}

export type AlertDialogFunctionConfig = DialogFunctionConfig<AlertDialogConfig>;

export interface PromptDialogConfig
  extends BaseDialogConfig<DialogType.Prompt> {
  message: string;
}

export type PromptDialogFunctionConfig =
  DialogFunctionConfig<PromptDialogConfig>;

export interface UseDialogReturnValue {
  confirm: (config: ConfirmDialogFunctionConfig) => Promise<boolean>;
  alert: (config: AlertDialogFunctionConfig) => Promise<void>;
  prompt: (config: PromptDialogFunctionConfig) => Promise<string>;
}

export type DialogConfig =
  | ConfirmDialogConfig
  | AlertDialogConfig
  | PromptDialogConfig;

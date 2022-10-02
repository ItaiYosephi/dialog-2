import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { Dialog } from './Dialog';
import { DialogConfig, DialogType, UseDialogReturnValue } from './types';

const DialogContext = createContext<UseDialogReturnValue | undefined>(
  undefined,
);

export const DialogProvider: FC<PropsWithChildren> = ({ children }) => {
  const [config, setConfig] = useState<DialogConfig>();
  const resolveRef = useRef<(value: any) => void>();

  const createResultPromise = <T,>() => {
    return new Promise<T>((resolve, reject) => {
      resolveRef.current = resolve;
    });
  };

  const alert: UseDialogReturnValue['alert'] = (config) => {
    setConfig({
      isOpen: true,
      type: DialogType.Alert,
      ...config,
    });
    return createResultPromise();
  };

  const confirm: UseDialogReturnValue['confirm'] = (config) => {
    setConfig({
      isOpen: true,
      type: DialogType.Confirm,
      ...config,
    });
    return createResultPromise();
  };

  const prompt: UseDialogReturnValue['prompt'] = (config) => {
    setConfig({
      isOpen: true,
      type: DialogType.Prompt,
      ...config,
    });
    return createResultPromise();
  };

  const onResult = <T,>(result: T) => {
    resolveRef.current?.(result);
  };

  return (
    <>
      <DialogContext.Provider value={{ confirm, alert, prompt }}>
        {children}
      </DialogContext.Provider>
      <Dialog config={config} onConfirm={onResult} onReject={onResult}></Dialog>
    </>
  );
};

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

import { FC } from 'react';
import { DialogProvider, useDialog } from './Dialog/dialog-context';

const Page = () => {
  const { confirm, alert, prompt } = useDialog();
  return (
    <>
      <button
        onClick={async () => {
          const res = await confirm({
            content: 'confirm content',
            title: 'Confirm Title',
            buttonText: 'my button text',
          });
          console.log(res);
        }}>
        Confirm
      </button>
      <button
        onClick={async () => {
          await alert({
            content: 'alert content',
            title: 'Confirm Title',
          });
          console.log('Alert closed!');
        }}>
        Alert
      </button>

      <button
        onClick={async () => {
          const res = await prompt({
            message: `What's your name?`,
            title: 'Name',
          });

          console.log('name: ', res);
        }}>
        Prompt
      </button>
    </>
  );
};

export const App: FC = () => {
  return (
    <DialogProvider>
      <Page></Page>
    </DialogProvider>
  );
};

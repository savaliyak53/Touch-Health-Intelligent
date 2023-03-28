import React from 'react';
import {Modal, Button } from 'antd';
import styles from './Modals.module.scss';
export type IProps = {
  open: boolean;
  handleRetry: () => any;
  handleOk: ()=>any;
  renderData?: any;
  showTryButton?:boolean;
  title: string;
};
const ErrorInteractionModal = ({
  open,
  handleRetry,
  title,
  showTryButton,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      className={"exceptionStyle"}
      open={open}
      closable={false}
      keyboard={false}
      onOk={handleOk}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          {showTryButton && <Button
            key="submit"
            className={styles['error']}
            onClick={handleRetry}
          >
            Try again
          </Button>}
          <Button
            key="submit"
            className={styles['error']}
            onClick={handleOk}
          >
            Go to dashboard
          </Button>
        </div>,
      ]}
    >
     <div className={styles['message']} >Oops! Looks like we cannot continue interaction at this point  <br/>Try again later.</div>
    </Modal>
  );
};

export default ErrorInteractionModal;

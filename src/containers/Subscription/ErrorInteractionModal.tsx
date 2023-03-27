import React, { useState } from 'react';
import { DatePicker, Modal, Button } from 'antd';
import styles from './Subscription.module.scss';
export type IProps = {
  open: boolean;
  handleRetry: () => any;
  handleOk: ()=>any;
  renderData?: any;
  title: string;
};
const ErrorInteractionModal = ({
  open,
  handleRetry,
  title,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      closable={false}
      keyboard={false}
      onOk={handleOk}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button
            key="submit"
            className={styles['Subscribe']}
            onClick={handleRetry}
          >
            Retry
          </Button>
          <Button
            key="submit"
            className={styles['Subscribe']}
            onClick={handleOk}
          >
            Go to dashboard
          </Button>
        </div>,
      ]}
    >
      {renderData}
    </Modal>
  );
};

export default ErrorInteractionModal;

import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Modals.module.scss';
type IProps = {
  open: boolean;
  handleOk: any;
  title: string;
  className?: any;
};
const SessionExpiryModal = ({
  open,
  handleOk,
  className,
}: IProps) => {
  return (
    <Modal
      title='Session Expiry'
      open={open}
      onOk={handleOk}
      closable={false}
      className={`Confirm-Modal ${className}`}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk}>
            Ok
          </Button>
        </div>,
      ]}
    >
      <div className="Description">
        Your session has expired. Please log in to continue.
      </div>
    </Modal>
  );
};

export default SessionExpiryModal;

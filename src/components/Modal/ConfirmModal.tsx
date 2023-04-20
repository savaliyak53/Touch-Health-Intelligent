import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Modals.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
  className?: any
};
const ConfirmModal = ({
  open,
  handleCancel,
  title,
  handleOk,
  renderData,
  className
}: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className={`Confirm-Modal ${className}`}
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk}>
           Confirm
          </Button>
        </div>
      ]
      }
    >
      {renderData}
    </Modal>
  );
};

export default ConfirmModal;

import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Modals.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
};
const ConfirmModal = ({
  open,
  handleCancel,
  title,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          <Button key="submit" className={styles["Subscribe"]} onClick={handleOk}>
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

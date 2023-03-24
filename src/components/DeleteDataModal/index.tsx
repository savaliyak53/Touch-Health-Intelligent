import React, { useState } from 'react';
import { DatePicker, Modal, Button } from 'antd';
import styles from './DeleteModal.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
};
const DeleteModal = ({
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
      className={"Delete-Modal"} 
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          <Button key="submit" className={styles["Action-btn"]} onClick={handleOk}>
            I acknowledge the above and wish to delete my data.
          </Button>
          <Button key="submit" className={styles["Action-btn"]} onClick={handleCancel}>
            Take me back. I do not want to delete my data
          </Button>
        </div>
      ]
      }
    >
      <div className={styles["Data"]}>
        {renderData}
      </div>
    </Modal>
  );
};

export default DeleteModal;

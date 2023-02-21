import React, { useState } from 'react';
import { DatePicker, Modal, Button } from 'antd';
import styles from './Subscription.module.scss';
export type IProps = {
  visible: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  title: string;
};
const LastGoalModal = ({
  visible,
  handleCancel,
  title,
  handleOk,
  renderData,
}: IProps) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button
            key="submit"
            className={styles['Subscribe']}
            onClick={handleOk}
          >
            Keep it
          </Button>
        </div>,
      ]}
    >
      {renderData}
    </Modal>
  );
};

export default LastGoalModal;

import React from 'react';
import { Modal, Button } from 'antd';
import styles from 'components/UI/Modal/Modals.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  renderData?: any;
  className: string;
  title: string;
};
const LastGoalModal = ({
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
      className={`${className}`}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button
            key="submit"
            className={'Submit-Button'}
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

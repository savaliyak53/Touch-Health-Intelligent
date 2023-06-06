import React, { ReactNode } from 'react';
import { Modal, Button } from 'antd';
import styles from './FreeTrialModal.module.scss';
export type IProps = {
  open: boolean;
  handleOk: () => void;
  title: string;
  buttonText: string;
  renderData: ReactNode;
};
const FreeTrialModal = ({ open, title, handleOk, buttonText, renderData }: IProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      className={'FreeTrial-Modal'}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk}>
           {buttonText}
          </Button>
        </div>,
      ]}
    >
      <div className="Description">
        {renderData}
      </div>
    </Modal>
  );
};

export default FreeTrialModal;

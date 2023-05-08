import React from 'react';
import {Modal, Button } from 'antd';
import styles from './Modals.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export type IProps = {
  open: boolean;
  renderData?: any;
  showTryButton?:boolean;
  title: string;
};
const ErrorInteractionModal = ({
  open,
  title,
  showTryButton,
  renderData,
}: IProps) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };
  const handleOk = () => {
    navigate('/dashboard');
  };
  return (
    <Modal
      title={title}
      className={"Delete-Modal"}
      open={open}
      closable={false}
      keyboard={false}
      onOk={handleOk}
      footer={[
        <div key="submit" className={showTryButton? styles['Btn-group-withoutgap'] : styles['Btn-group']}>
          {showTryButton && <Button
            key="submit"
            className={'Submit-Button'}
            onClick={handleRetry}
          >
            Try again
          </Button>}
          <Button
            key="submit"
            className={'Submit-Button'}
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

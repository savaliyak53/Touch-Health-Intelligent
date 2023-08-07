import React from 'react';
import { Modal, Button } from 'antd';
import styles from './Modals.module.scss';
export type IProps = {
  open: boolean;
  handleCancel: () => any;
  handleOk: any;
  className?: any
  price: number
};
const PriceModal = ({
  open,
  handleCancel,
  price,
  handleOk,
  className
}: IProps) => {
  return (
    <Modal
      title={`Confirmation`}
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
    <div className='Description'>
        {`Your monthly subscription is $${price}/month. Would you like to start your subscription now?`}
      </div>
    </Modal>
  );
};

export default PriceModal;
import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import styles from './TrialEndModal.module.scss';
import moment from 'moment';
export type IProps = {
  open: boolean;
  title: string;
  trialEndDate: string;
  handleOk: () => void;
};
const TrialEndModal = ({ open, title, trialEndDate, handleOk }: IProps) => {
  const { Paragraph } = Typography;
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={() => {
        console.log('cancel');
      }}
      className={'FreeTrial-Modal'}
      footer={[
        <div key="submit" className={styles['Btn-group']}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk}>
            Subscribe Now!
          </Button>
        </div>,
      ]}
    >
      <div className="Description">
        <Paragraph>
          Your free trial ended on{' '}
          {moment(trialEndDate).format('MMMM Do, YYYY')}
        </Paragraph>
        <Paragraph>
          We&apos;re thrilled to have you on board! Begin your subscription now
          to continue enjoying our services beyond the trial period!
        </Paragraph>
      </div>
    </Modal>
  );
};

export default TrialEndModal;

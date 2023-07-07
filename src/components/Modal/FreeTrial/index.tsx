import React, { ReactNode } from 'react';
import { Modal, Button, Typography } from 'antd';
import styles from './FreeTrialModal.module.scss';
import moment from 'moment';
const { Paragraph, Text } = Typography;
export type IProps = {
  open: boolean;
  handleOk: () => void;
  title: string;
  buttonText: string;
  trialEndDate?: string;
};
const FreeTrialModal = ({
  open,
  title,
  handleOk,
  buttonText,
  trialEndDate = '',
}: IProps) => {
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
          <>
            <Paragraph>
              Your free trial ended on{' '}
              {moment(trialEndDate).format('MMMM Do, YYYY')}
            </Paragraph>
            <Paragraph>
              We&apos;re thrilled to have you on board! Begin your subscription
              now to continue enjoying our services beyond the trial period!
            </Paragraph>
          </>
      </div>
    </Modal>
  );
};

export default FreeTrialModal;

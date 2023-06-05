import React from 'react';
import { Modal, Button, Typography } from 'antd';
import styles from './FreeTrialModal.module.scss';
export type IProps = {
  open: boolean;
  handleOk: () => void;
  title: string;
};
const FreeTrialModal = ({ open, title, handleOk }: IProps) => {
  const { Paragraph, Text } = Typography;
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
            Let&apos;s get started!
          </Button>
        </div>,
      ]}
    >
      <div className="Description">
        <Paragraph>Dear Valued User,</Paragraph>
        <Text>
          You are currently on a free trial!
          <Text strong italic>
            We want to assure you that there is no need to provide any payment
            details at this moment.
          </Text>
        </Text>

        <Paragraph>
          Enjoy exploring our services without any obligation. Take this
          opportunity to fully experience what we have to offer. We&apos;ll
          guide you through the subscription process if you decide to continue
          after the trial period. Enjoy your journey with us!
        </Paragraph>
      </div>
    </Modal>
  );
};

export default FreeTrialModal;

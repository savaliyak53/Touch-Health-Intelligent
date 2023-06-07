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
        {trialEndDate ? (
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
        ) : (
          <>
            <Paragraph>Dear Valued User,</Paragraph>
            <Text>
              You are currently on a free trial!
              <Text strong italic>
                We want to assure you that there is no need to provide any
                payment details at this moment.
              </Text>
            </Text>
            <Paragraph>
              Enjoy exploring our services without any obligation. Take this
              opportunity to fully experience what we have to offer. We&apos;ll
              guide you through the subscription process if you decide to
              continue after the trial period. Enjoy your journey with us!
            </Paragraph>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FreeTrialModal;

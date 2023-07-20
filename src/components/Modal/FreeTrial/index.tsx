import React from 'react';
import { useNavigate } from 'react-router';
import { Modal, Button, Typography } from 'antd';
import styles from './FreeTrialModal.module.scss';
import moment from 'moment';
const { Paragraph, Text } = Typography;
export type IProps = {
  open: boolean;
  handleOk: () => void;
  title: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  trialEndDate?: Date;
  active: boolean;
};
const FreeTrialModal = ({
  open,
  title,
  handleOk,
  primaryButtonText,
  secondaryButtonText,
  trialEndDate,
  active
}: IProps) => {
  const navigate = useNavigate();

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      className={'FreeTrial-Modal'}
      footer={
        <>
        <div className={styles['Btn-group']}>
          <Button key="submit" className={'Submit-Button'} onClick={handleOk} style={{marginTop: active ? '70px' : ''}}>
            {primaryButtonText}
          </Button>
        </div>
        {!active && (<div className={styles['Btn-group']}>
          <Button key="submit" className={'Secondary-Button'} onClick={() => navigate('/dashboard')}>
            {secondaryButtonText}
          </Button>
        </div>)}
        </>
      }
    >
      <div className="Description">
      {active ? (
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
        ) : moment(trialEndDate).diff(moment(), 'days') == 0 ? (
          <>
            <Paragraph>
              Your free trial is scheduled to end today!
            </Paragraph>
            <Paragraph>
              Begin your subscription now to continue enjoying our services beyond the trial period!
            </Paragraph>
          </>
        ) : (
          <>
            <Paragraph>
              Your free trial is scheduled to end on{' '}
              {moment(trialEndDate).format('MMMM Do, YYYY')}, giving you{' '} 
              {moment(trialEndDate).diff(moment(), 'days')} more days to explore our services. <br />
            </Paragraph>
            <Paragraph>
              Begin your subscription now to continue enjoying our services beyond the trial period!
            </Paragraph>
          </>
        )}
      </div>
    </Modal>
  );
};

export default FreeTrialModal;

import React, { useState, useEffect } from 'react';
import styles from './TermsAndConditions.module.scss';
import { Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../layouts/Layout/Layout';
import Button from '../../components/Button';
type ITerms = {
  termsAndConditions: boolean;
};
function TermsAndCondtions() {
  const navigate = useNavigate();
  const [termsAndConditions, setTermAndConditions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { Title, Paragraph } = Typography;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITerms>({
    mode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const onSubmit = async () => {
      navigate('/security');
  };

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className={styles.Container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title level={2} className={styles.TermsTitle} style={{color:'#6A2C70'}}>Terms and Conditions</Title>
          <Paragraph className={styles.TermsText}>
           {`With that in mind, here are 10 resons to prioritize shut-eye:\n`}</Paragraph>
          <Paragraph className={styles.TermsText}>{`1. You'll Help Your Brain.\n We simply don't have the maximum brainpower we need to function when we're pooped all the time.
           Sleep is the essential downtime that gray matter needs to consolidate memories, process emotions, and simply recharge to focus clearly the next day.`}</Paragraph>

          <div className={styles.TermsBtnWrap}>
            <Button
              className={styles.TermsBtn}
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
             Confirm and sign-up
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default TermsAndCondtions;

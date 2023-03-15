import React, { useState,  useRef  } from 'react';
import { DatePicker, Modal, Button } from 'antd';
import styles from './Subscription.module.scss';
import  ReCAPTCHA  from 'react-google-recaptcha';

export type IProps = {
  open: boolean;
  resendOTP: () => any;
  handleOk?: any;
  renderData?: any;
  title: string;
  setOpenRecaptcha:(state: boolean)=>any
};
const RecaptchaModal = ({
  open,
  title,
  resendOTP,
  setOpenRecaptcha
}: IProps) => {
const refCaptcha = useRef<any>(null)
  return (
    <Modal
      title={title}
      open={open}
      zIndex={100000}
      closable={false}
      keyboard={false}
      footer={[
        <div  key="submit" className={styles["Btn-group"]}>
          {/* <Button key="submit" className={styles["Subscribe"]} onClick={handleOk}>
           Confirm
          </Button> */}
        </div>
      ]
      }
    >
       <ReCAPTCHA
          className={styles["recaptcha"]}
          ref={refCaptcha}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}           
          onChange={async ()=>{
            const token = refCaptcha?.current?.getValue();
            localStorage.setItem("recaptcha-token", token)
            await resendOTP()
            setOpenRecaptcha(false)
           } } 
        />
    </Modal>
  );
};

export default RecaptchaModal;

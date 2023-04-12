import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout/Layout';
import styles from './HelpAndSupport.module.scss'
import { Space, Typography } from 'antd';
const { Paragraph }=Typography;
//Set your APP_ID
var APP_ID = "ipsho729";

(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
const HelpAndSupport = () => {

  useEffect(() => {
    window.Intercom('boot', {app_id: APP_ID, user_id: localStorage.getItem('userId'), set_in_app_message_visibility: false});
    window.Intercom("update", {hide_default_launcher: false, last_request_at: parseInt((new Date()).getTime()/1000)})

  }, []);
  return (
    <Layout defaultHeader={true} hamburger={true}>
      <div className="Content-wrPArCon">
        <h2 className={'Title'}>
          Get in Touch! 
        </h2>
        <div className='Description'>
          <Paragraph>We are here to help.</Paragraph>
          <Space/>
          <Paragraph>If you have any questions, ask us!</Paragraph>
          <Space/>
          <Paragraph>If you have feedback, enlighten us!</Paragraph>
          <Space/>
          <Paragraph>Reach out in the chat bubble at the bottom of the page.</Paragraph>
          <Space/>
          <Paragraph>We are here Monday to Friday from 11:00 AM to 7:00 PM EDT. After hours, just drop us a message and you will be our first priority when we get back.</Paragraph>
          <Space/> 
        </div>
 
       </div>
    </Layout>
  );
};

export default HelpAndSupport;

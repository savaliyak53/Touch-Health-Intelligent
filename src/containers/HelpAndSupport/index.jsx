import React, { useContext, useEffect, useState } from 'react';
import Layout from 'layouts/Layout';
import { Space, Typography } from 'antd';
import AuthContext from '../../contexts/AuthContext';
import AuthContextData from '../../contexts/AuthContext';
const { Paragraph } = Typography;
var APP_ID = "ipsho729";

(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
const HelpAndSupport = () => {
  const authContext = useContext<AuthContextData | undefined>(AuthContext); 
  const userId=authContext?.user;

  useEffect(() => {
    window.Intercom('boot', {app_id: APP_ID, user_id: userId, set_in_app_message_visibility: false});
    window.Intercom("update", {hide_default_launcher: false, last_request_at: parseInt((new Date()).getTime()/1000)})
  }, []);
  return (
    <Layout defaultHeader={true} hamburger={true} title={'Get in Touch!'}>
      <div className="Content-wrPArCon mt-5">
        <div className='text-base font-normal leading-7 text-justify'>
          <Paragraph>🌟 We&apos;re Here to Help! 🌟</Paragraph>
          <Space/>
          <Paragraph>Need answers to technical puzzles? We&apos;ve got the solutions! 🧩</Paragraph>
          <Space/>
          <Paragraph>We cherish your input! Share your valuable feedback to help us shine even brighter! 💡</Paragraph>
          <Space/>
          <Paragraph>Simply click the chat bubble 💬 at the bottom of the page, and we&apos;ll be right there to provide the assistance you need in a flash! ⚡</Paragraph>
          <Space/>
          <Paragraph>And don&apos;t forget, our customer support team is available Monday to Friday, responding ASAP. If it&apos;s the weekend, leave a message, and we&apos;ll be on it first thing on the next workday. Your happiness is our priority, no matter the day. Thanks for choosing us! 🚀📞🌟💬</Paragraph>
          <Space/> 
        </div>
 
       </div>
    </Layout>
  );
};

export default HelpAndSupport;

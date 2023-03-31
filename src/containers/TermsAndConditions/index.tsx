import React, { useState, useEffect } from 'react';
import styles from './TermsAndConditions.module.scss';
import v from '../../variables.module.scss';
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
  const [disabled, setDisabled] = useState(true)
  const { Title, Paragraph,Link  } = Typography;
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
      navigate(`/verification-code`);
  };
  const handleScroll = (e:any) => {
    const bottom = e.target.scrollHeight - Math.ceil(e.target.scrollTop) - e.target.clientHeight < 5;
    if(bottom) setDisabled(!bottom)
};

useEffect(() => {
  window.scrollTo(0,0)
}, [])

  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div  className={styles.Container}>
        <Title level={2} className={styles.TermsTitle1} >Terms and Conditions</Title>
        <form onSubmit={handleSubmit(onSubmit)} onScroll={handleScroll} style={{maxHeight: 1000, overflow: 'auto', marginTop: 100, marginBottom: 50}}>
          <Paragraph className={styles.TermsText}>
           {`These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the touchmedical.ca website (“Website”), “Touch Health Assistant - THA” mobile application (“Mobile Application”) and any of their related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and Touch Medical Intelligence Inc. (“Touch Medical Intelligence Inc.”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Services. By accessing and using the Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and Touch Medical Intelligence Inc., even though it is electronic and is not physically signed by you, and it governs your use of the Services.
           \n\n`}</Paragraph>
          <Title level={1} className={styles.TermsTitle3} >Accounts and membership</Title>

          <Paragraph className={styles.TermsText}>{`\n\nYou must be at least 18 years of age to use the Services. By using the Services and by agreeing to this Agreement you warrant and represent that you are at least 18 years of age.
          If you create an account on the Services, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Billing and payments</Title>
          <Paragraph className={styles.TermsText}>{`You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. Where Services are offered on a free trial basis, payment may be required after the free trial period ends, and not when you enter your billing details (which may be required prior to the commencement of the free trial period). If auto-renewal is enabled for the Services you have subscribed for, you will be charged automatically in accordance with the term you selected. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.\n\n`}</Paragraph>
          
          <Title level={2} className={styles.TermsTitle3} >Accuracy of information
          </Title>
          <Paragraph className={styles.TermsText}>{`Occasionally there may be information on the Services that contains typographical errors, inaccuracies or omissions that may relate to promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information on the Services or Services is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information on the Services including, without limitation, pricing information, except as required by law. No specified update or refresh date applied on the Services should be taken to indicate that all information on the Services or Services has been modified or updated.\n\n`}</Paragraph>
          
          <Title level={2} className={styles.TermsTitle3} >Third party services</Title>
          <Paragraph className={styles.TermsText}>{`\n\nIf you decide to enable, access or use third party services, be advised that your access and use of such other services are governed solely by the terms and conditions of such other services, and we do not endorse, are not responsible or liable for, and make no representations as to any aspect of such other services, including, without limitation, their content or the manner in which they handle data (including your data) or any interaction between you and the provider of such other services. You irrevocably waive any claim against Touch Medical Intelligence Inc. with respect to such other services. Touch Medical Intelligence Inc. is not liable for any damage or loss caused or alleged to be caused by or in connection with your enablement, access or use of any such other services, or your reliance on the privacy practices, data security processes or other policies of such other services. You may be required to register for or log into such other services on their respective platforms. By enabling any other services, you are expressly permitting Touch Medical Intelligence Inc. to disclose your data as necessary to facilitate the use or enablement of such other service.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Links to other resources</Title>
          <Paragraph className={styles.TermsText}>{`\n\nAlthough the Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Services. Your linking to any other off-site resources is at your own risk.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Prohibited uses</Title>
          <Paragraph className={styles.TermsText}>{`\n\nIn addition to other terms as set forth in the Agreement, you are prohibited from using the Services or Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services, third party products and services, or the Internet; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to interfere with or circumvent the security features of the Services, third party products and services, or the Internet. We reserve the right to terminate your use of the Services for violating any of the prohibited uses.\n\n`}</Paragraph>
          
          <Title level={2} className={styles.TermsTitle3} >Intellectual property rights</Title>
          <Paragraph className={styles.TermsText}>{`\n\n“Intellectual Property Rights” means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by Touch Medical Intelligence Inc. or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Touch Medical Intelligence Inc. All trademarks, service marks, graphics and logos used in connection with the Services, are trademarks or registered trademarks of Touch Medical Intelligence Inc. or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Services may be the trademarks of other third parties. Your use of the Services grants you no right or license to reproduce or otherwise use any of Touch Medical Intelligence Inc. or third party trademarks.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Disclaimer of warranty</Title>
          <Paragraph className={styles.TermsText}>{`\n\nYou agree that such Service is provided on an “as is” and “as available” basis and that your use of the Services is solely at your own risk. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through the Service or any transactions entered into through the Service unless stated otherwise. No advice or information, whether oral or written, obtained by you from us or through the Service shall create any warranty not expressly made herein.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Limitation of liability</Title>
          <Paragraph className={styles.TermsText}>{`\n\nTo the fullest extent permitted by applicable law, in no event will Touch Medical Intelligence Inc., its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Touch Medical Intelligence Inc. and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount no greater than one dollar or any amounts actually paid in cash by you to Touch Medical Intelligence Inc. for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.\n\n`}</Paragraph>
          
          <Title level={2} className={styles.TermsTitle3}>Indemnification</Title>
          <Paragraph className={styles.TermsText}>{`\n\nYou agree to indemnify and hold Touch Medical Intelligence Inc. and its affiliates, directors, officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys’ fees, incurred in connection with or arising from any third party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Services or any willful misconduct on your part.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Severability</Title>
          <Paragraph className={styles.TermsText}>{`\n\nAll rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.\n\n`}</Paragraph>
          

          <Title level={2} className={styles.TermsTitle3} >Dispute resolution</Title>
          <Paragraph className={styles.TermsText}>{`\n\nThe formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Alberta, Canada without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of Canada. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in Alberta, Canada, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.\n\n`}</Paragraph>
          
          <Title level={2} className={styles.TermsTitle3} >Changes and amendments</Title>
          <Paragraph className={styles.TermsText}>{`\n\nWe reserve the right to modify this Agreement or its terms related to the Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.
          An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.
          \n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Acceptance of these terms</Title>
          <Paragraph className={styles.TermsText}>{`\n\nYou acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Services.\n\n`}</Paragraph>

          <Title level={2} className={styles.TermsTitle3} >Contacting us</Title>
          <Paragraph className={styles.TermsText}>{`\n\nIf you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:\n`}
          <br/>
          <Link href="mailto:support@touchmedical.ca">support@touchmedical.ca</Link>
          </Paragraph>
          <Paragraph className={styles.TermsText}>{` This document was last updated on November 29, 2022`}</Paragraph>

          <div className={styles.TermsBtnWrap}>
            <Button
              className={styles.TermsBtn}
              loading={isLoading}
              onClick={handleSubmit(onSubmit)}
              disabled={disabled}
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




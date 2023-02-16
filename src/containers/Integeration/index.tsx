import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slider, Tooltip, Button, Spin, Switch } from 'antd';
import styles from './Integeration.module.scss';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import {
  getGoogleCode,
  revokeGoogleFit,
  getIntegrationStatus,
} from '../../services/authservice';
import { toast } from 'react-toastify';
import Layout from '../../layouts/Layout/Layout';
import 'moment-timezone';
import ConfirmModal from '../Subscription/ConfirmModal';
import { deleteAllData } from '../../services/goalsService';

type IFormInputs = {
  engagementLevel: number;
  yob: number;
  sex: string;
};
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
const Integrations = () => {
  const [loading, setloading] = useState(false);
  const [checked, setChecked] = useState<boolean>();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let deferredPrompt: BeforeInstallPromptEvent | null;
    const installApp = document.getElementById('installApp');

    window.addEventListener('beforeinstallprompt', (e) => {
      if (installApp != null) {
        installApp.style.display = 'initial';
      }
      deferredPrompt = e;
    });

    installApp?.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          deferredPrompt = null;
          location.reload();
        }
      }
    });

    //const userId = localStorage.getItem('userId');
    //setSpinning(true);
    //setloading(true);
    getIntegrationStatusService();
  }, []);
  const getIntegrationStatusService = () => {
    getIntegrationStatus()
      .then((response: any) => {
        if (response?.data) {
          setChecked(response.data.enabled);
        }
      })
      .catch((error) => {
        toast('Unknown error');
        setSpinning(false);
      });
  };
  const handleClick = (checked: any) => {
    if (checked) {
      getGoogleCode().then((res) => {
        createAuthLink(res);
      });
    } else {
      revokeCredentials();
    }
  };
  const revokeCredentials = () => {
    revokeGoogleFit().then((res) => {
      if (res.data.message) {
        setChecked(false);
        toast.success('Google fit disabled');
      }
    });
  };
  const handleDeleteModal = () => {
    setShowCancelModal(false);
  };
  const removeUserData = () => {
    deleteAllData()
    .then(res => {
      toast('User data deleted')
      navigate('/questionnaire')
    })
    .catch(err => {
      toast('Unknown error');
    })
  }
  const createAuthLink = (response: any) => {
    setChecked(true);
    const redirect_uri = `${process.env.REACT_APP_FRONTEND}auth/google/code`;
    const params = new URLSearchParams({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.location.read',
        'https://www.googleapis.com/auth/fitness.nutrition.read',
      ]
        .join(' ')
        .trim(),
      access_type: 'offline',
      state: JSON.stringify({
        sessionId: response.data.sessionId,
        redirect_uri: redirect_uri,
      }),
      include_granted_scopes: 'true',
      prompt: 'consent select_account',
    });
    const url = `${
      process.env.REACT_APP_GOOGLE_FIT_OAUTH_ENDPOINT
    }?${params.toString()}`;

    visitLink(url);
  };
  const visitLink = (url: any) => {
    window.location.href = url;
  };
  // const text = <span>prompt text</span>;

  return (
    <Layout defaultHeader={true} hamburger={true}>
      <Spin spinning={spinning}>
        <div className={`Content-wrap ${styles['Pref']}`}>
          <h2 className={styles['Pref-title']}>Integrations</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '25px',
              marginBottom: '24px',
            }}
          >
            <img
              src={'assets/icons/GoogleFit_Icon_Color_RGB.png'}
              height={50}
              width={50}
            />
            Google Fit
            {checked === undefined ? (
              <Spin spinning={checked === undefined ? true : false} />
            ) : (
              <div className="Switch-btn-wrap">
                <Switch checked={checked} onChange={handleClick} />
              </div>
            )}
          </div>

          <div>
            <div className={styles['Question']}>
              <h3
                className={styles['Question-title']}
                style={{ color: '#A5A5A5' }}
              >
                Here is the google fit description about the integration and
                data usage
              </h3>
            </div>
            <div>
              <h3
                className={styles['Question-title']}
                style={{ fontSize: '22px' }}
              >
                Data Use
                <Tooltip
                  title={'You can control data sharing here!'}
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  mouseLeaveDelay={0}
                >
                  <AiOutlineQuestionCircle
                    size={30}
                    className="question-help"
                    style={{ marginLeft: '10px' }}
                  />
                </Tooltip>
              </h3>
              <Button className={`Pref-post-btn ${styles['Data-dlt-btn']}`} onClick={() => setShowCancelModal(true)}>  Delete all my data</Button>
              <ConfirmModal
                title={'Confirmation'}
                visible={showCancelModal}
                handleCancel={handleDeleteModal}
                handleOk={() => removeUserData()}
                renderData={<div>Are you sure you want to delete goal?</div>}
              />
            </div>
          </div>
        </div>
      </Spin>
    </Layout>
  );
};

export default Integrations;

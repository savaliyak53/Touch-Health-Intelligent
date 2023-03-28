import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import DeleteModal from '../../components/Modal/DeleteDataModal';
import { deleteAllData } from '../../services/goalsService';
import {
  postInteractionService,
  preferencesService,
  getInteractionServiceByType
} from '../../services/authservice';
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
interface LocationState {
  state: {
    refId: string,
    redirect: boolean;
  };
}
const Integrations = () => {
  
  const [checked, setChecked] = useState<boolean|any>(undefined);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loc, setLocation] = useState<LocationState>()
  const navigate = useNavigate();
  const refId = localStorage.getItem('refId')
  const redirect = localStorage.getItem('redirect')

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

    getIntegrationStatusService();
    if(refId && redirect) setLocation({
      state: {
        refId: refId,
        redirect: redirect == 'true' ? true : false
      }
    })
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
        setChecked(false);
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
      handleSetUserStatus()
    })
    .catch(err => {
      toast('Unknown error');
    })
  }
  const handleSetUserStatus = () => {
    const userId = localStorage.getItem('userId');
    //after successful subscription set signup_status to onboarding
    preferencesService(
      {
        signup_status: 'onboarding',
      },
      userId
    )
      .then((preferencesResponse) => {
        if (preferencesResponse) {
          //after successful subscription initiate onboarding interaction
          getInteractionServiceByType('onboarding')
            .then((response: any) => {
              if (response) {
                navigate('/questionnaire');
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              toast.error(
                `Something went wrong. Cannot initiate interaction at the moment `
              );
              navigate('/dashboard');
            });
        } else {
          // console.log('navigate to dashboard');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        toast.error(
          `${error.response?.data?.title}`
        );
      });
  };
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

  const handleNext = () => {
    postInteractionService({
      type : "question",
      ref_id : loc?.state.refId ? loc?.state.refId : '',
      question_response : {
        type: "integration_page_redirect",
        value: true
        }
      })
    .then(res => {
      localStorage.removeItem('refId')
      localStorage.removeItem('redirect')
      navigate('/questionnaire')
    })
    .catch(() => {
      toast.error('Something went wrong');
    });
  }

  return (
    <Layout defaultHeader={true} hamburger={loc?.state?.redirect ? false : true}>
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
                Touch Health Assistant collects health and activity data to enable health goal
                analytics, guidance recommendation, and guidance follow up.
              </h3>
            </div>
            <div>
              <h3
                className={styles['Question-title']}
                style={{ fontSize: '22px' }}
              >
                Data Use
                <Tooltip
                  title={'This deletes all your data, setting your entire health profile in the Touch Health Assistant back to 0. We will retain your basic account information but all your data with the app so far will be deleted.'}
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
              <DeleteModal
                title={''}
                open={showCancelModal}
                handleCancel={handleDeleteModal}
                handleOk={() => removeUserData()}
                renderData={<div>By deleting your data, your entire health profile in the Touch Health Assistant will cease to exist. No data will be retained, and you will be sent back to the beginning as if you just started. This is irreversible, proceed with caution.</div>}
              />
            </div>
          </div>
          {loc?.state?.redirect == true && (
            <div className={styles.TermsBtnWrap}>
              <Button
                className={styles.TermsBtn}
                onClick={handleNext}
              >
              Next
              </Button>
            </div>
          )}

        </div>
      </Spin>
    </Layout>
  );
};

export default Integrations;

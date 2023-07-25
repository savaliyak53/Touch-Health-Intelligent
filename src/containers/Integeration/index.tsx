import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Button, Spin, Switch } from 'antd';
import styles from './Integeration.module.scss';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
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
  getInteractionServiceByType,
} from '../../services/authservice';
import AuthContext, { AuthContextData } from '../../contexts/AuthContext';
import GoogleOAuthDisclosureModal from '../../components/Modal/GoogleOAuthDisclosureModal';
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
    refId: string;
    redirect: boolean;
  };
}
const Integrations = () => {
  const [checked, setChecked] = useState<boolean | any>(undefined);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showGoogleOAuthModal, setShowGoogleOAuthModal] = useState(false);
  const [loc, setLocation] = useState<LocationState>();
  const navigate = useNavigate();
  const refId = localStorage.getItem('refId');
  const redirect = localStorage.getItem('redirect');
  const context = useContext<AuthContextData | undefined>(AuthContext);
  const [error, setError] = useState<any>();

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
    if (refId && redirect)
      setLocation({
        state: {
          refId: refId,
          redirect: redirect == 'true' ? true : false,
        },
      });
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const getIntegrationStatusService = () => {
    getIntegrationStatus()
      .then((response: any) => {
        if (response?.data) {
          setChecked(response.data.enabled);
        }
      })
      .catch((error) => {
        setChecked(false);
        setSpinning(false);
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const handleClick = (checked: any) => {
    if (checked) {
      setChecked(true);
      setShowGoogleOAuthModal(true);
    } else {
      revokeCredentials();
    }
  };
  const googleOAuthModalOk = () => {
    getGoogleCode()
      .then((res) => {
        createAuthLink(res);
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const revokeCredentials = () => {
    revokeGoogleFit()
      .then((res) => {
        if (res.data.message) {
          setChecked(false);
          toast.success('Google fit disabled');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const handleDeleteModal = () => {
    setShowCancelModal(false);
  };
  const removeUserData = () => {
    deleteAllData()
      .then((res) => {
        toast('User data deleted');
        handleSetUserStatus();
      })
      .catch((err) => {
        setError({
          code: err.response.status,
          message: err.response.data.details,
        });
      });
  };
  const handleSetUserStatus = () => {
    const userId = context?.user;
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
              setError({
                code: error.response.status,
                message: error.response.data.details,
              });
            });
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };
  const createAuthLink = (response: any) => {
    setChecked(true);
    const redirect_uri = `${process.env.REACT_APP_FRONTEND}auth/google/code`;
    const params = new URLSearchParams({
      client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: ['https://www.googleapis.com/auth/fitness.activity.read']
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

  const handleNext = () => {
    postInteractionService({
      type: 'question',
      ref_id: loc?.state.refId ? loc?.state.refId : '',
      question_response: {
        type: 'integration_page_redirect',
        value: true,
      },
    })
      .then((res) => {
        localStorage.removeItem('refId');
        localStorage.removeItem('redirect');
        navigate('/questionnaire');
      })
      .catch(() => {
        setError({
          code: error.response.status,
          message: error.response.data.details,
        });
      });
  };

  return (
    <Layout
      defaultHeader={true}
      hamburger={loc?.state?.redirect ? false : true}
    >
      <Spin spinning={spinning}>
        <div className={`${styles['Integration-wrap']}`}>
          <h2 className={'Title'}>Integrations</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <img
              src={'assets/icons/GoogleFit_Icon_Color_RGB.png'}
              height={50}
              width={50}
              className={styles['Google-fit-img']}
            />
            <div className={styles['Container-title']}>
              {'Use the toggle to turn Google Fit integration on or off'}
            </div>
            {checked === undefined ? (
              <Spin spinning={checked === undefined ? true : false} />
            ) : (
              <div className="Switch-btn-with-text">
                <Switch
                  checked={checked}
                  onChange={handleClick}
                  checkedChildren="On"
                  unCheckedChildren="Off"
                />
              </div>
            )}
          </div>

          <div>
            {!checked && (
              <div className={styles['Container']}>
                <h3 className={`Description`}>
                  By connecting Touch Health Assistant with Google Fit, you can
                  integrate your fitness activity and movement data from various
                  health apps to help you better understand your progress toward
                  your health goals.
                </h3>
              </div>
            )}
            <div>
              <h3
                className={styles['Container-title']}
                style={{ fontSize: '22px' }}
              >
                Data Use
                <Tooltip
                  className={styles['TooltipIcon']}
                  title={
                    'This deletes all your data, setting your entire health profile in the Touch Health Assistant back to 0. We will retain your basic account information but all your data with the app so far will be deleted.'
                  }
                  placement="bottomRight"
                  overlayStyle={{ marginRight: '10px' }}
                  mouseLeaveDelay={0}
                >
                  <AiOutlineQuestionCircle
                    size={30}
                    style={{ marginLeft: '10px' }}
                  />
                </Tooltip>
              </h3>
              <Button
                className={`Pref-post-btn ${
                  loc?.state.redirect ? 'Pref-post-btn-disabled' : ''
                } ${styles['Data-dlt-btn']}`}
                onClick={() => setShowCancelModal(true)}
                disabled={loc?.state.redirect}
              >
                Delete all my data
              </Button>
              <DeleteModal
                title={''}
                open={showCancelModal}
                handleCancel={handleDeleteModal}
                handleOk={() => removeUserData()}
                renderData={
                  <div>
                    By deleting your data, your entire health profile in the
                    Touch Health Assistant will cease to exist. No data will be
                    retained, and you will be sent back to the beginning as if
                    you just started. This is irreversible, proceed with
                    caution.
                  </div>
                }
              />
              <GoogleOAuthDisclosureModal
                title={''}
                open={showGoogleOAuthModal}
                handleCancel={() => {
                  setShowGoogleOAuthModal(false);
                  setChecked(false);
                }}
                handleOk={googleOAuthModalOk}
                renderData={
                  <div>
                    Touch Health Assistant&apos;s use and transfer to any other
                    app of information received from Google APIs will adhere to{' '}
                    <a href="https://developers.google.com/terms/api-services-user-data-policy">
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </div>
                }
              />
            </div>
          </div>
          {loc?.state?.redirect == true && (
            <div className={styles.TermsBtnWrap}>
              <Button className={'Submit-Button'} onClick={handleNext}>
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

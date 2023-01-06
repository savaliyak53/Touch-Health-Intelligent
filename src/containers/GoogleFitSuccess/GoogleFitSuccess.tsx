import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import Layout from '../../layouts/Layout/Layout';
import '../ThankyouForSubmiting/index.scss';
import { Link } from 'react-router-dom';
import { postGoogleToken } from '../../services/authservice';
import { toast } from 'react-toastify';
const GoogleFitSuccess = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  const logoutClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleBackendParams=()=>{
   
   const query = new URLSearchParams(search);
   const paramCode = query.get('code');
   const paramState = query.get('state');
   const state= JSON.parse(paramState ? paramState:'')
   const paramScope = query.get('scope');
   const body = {
    authCode: paramCode,
    sessionId: state?.sessionId,
    scopes: paramScope,
    redirectUri: state?.redirect_uri
  };
   postGoogleToken(body).then((response:any)=>{
      if(response.data){
        setLoading(false);
        toast.success('Google Fit Integrated')
        navigate("/preferences")
      }
   }).catch((error: any) => {
    toast.error('Something went wrong');
    setLoading(false)
    navigate('/dashboard')
  })
  }
  useEffect(() => {
    setLoading(true);
    handleBackendParams()
  }, []);
  return (
    <Layout defaultHeader={true} hamburger={true}>
      <Spin spinning={loading}>
      <div className="Content-wrap DayCon">
        <div className="Question">
          <Alert message="Google Fit Integration successful" type="success" />
        </div>
        <h3 className="Question-title">Google Fit Integration Success</h3>
      </div>
      </Spin>
      
    </Layout>
  );
};

export default GoogleFitSuccess;

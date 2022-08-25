import React, { useState, useEffect } from 'react';
import './index.css';
import Typography from '@mui/material/Typography';
import { requestPhoneOTP } from '../../services/authservice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import Layout from '../../layouts/Layout/Layout';

function TermsAndCondtions() {
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <div className="cards-terms">
        <div className="card-text">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="resend"
          >
            Welcome to Touch Health Assistant
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="response"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.Lorem Ipsum has been the industrys standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </Typography>
          <div className="resend">
            <span>Resend verification link on Phone.</span>
          </div>
        </div>
      </div>{' '}
    </Layout>
  );
}
export default TermsAndCondtions;

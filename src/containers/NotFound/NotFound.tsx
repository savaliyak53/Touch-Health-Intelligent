import React from 'react';
import Layout from '../../layouts/Layout/Layout';

const NotFound = () => {
  return (
    <Layout defaultHeader={true} hamburger={false}>
      <br />
      <h1>404 - Page Not Found</h1>
      <p>The requested page could not be found.</p>
    </Layout>
  );
};
export default NotFound;

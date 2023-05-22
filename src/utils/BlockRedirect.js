import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const BlockRedirection = ({ shouldBlock }) => {
  const navigate = useNavigate();
  const location = useLocation();
  var pageVisibility = document.visibilityState;
  useEffect(() => {
    const handleBlockedNavigation = (event) => {
      event.preventDefault(); // Prevent manual redirection via URL change

      const confirmDialog = window.confirm('Are you sure you want to leave this page?');
      console.log('confrim dialog', confirmDialog);
      if (confirmDialog) {
        navigate(event.currentTarget.pathname); // Allow redirection
      } else {
        navigate(location.pathname); // Stay on the current page
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Prevent closing the browser/tab
      event.returnValue = ''; // Required for Chrome
      console.log('prevented')
      console.log('page Visibility', pageVisibility);
    };

    if (shouldBlock) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handleBlockedNavigation);
    }

    return () => {
      if (shouldBlock) {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handleBlockedNavigation);
      }
    };
  }, [shouldBlock, navigate, location, pageVisibility]);

  return <div>BlockRedirection component</div>;
};

export default BlockRedirection;

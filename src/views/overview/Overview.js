import React from 'react';

const Overview = () => {
    return (
      <>
      <span>API_HOST: {process.env.REACT_APP_API_HOST}</span><br/>
      <span>NODE_ENV: {process.env.NODE_ENV}</span><br/>
      <span>GCLOUD_PROJECT: {process.env.GCLOUD_PROJECT}</span><br/>
      <span>FIREBASE_CONFIG: {process.env.FIREBASE_CONFIG}</span><br/>
      </>
    )
}

export default Overview
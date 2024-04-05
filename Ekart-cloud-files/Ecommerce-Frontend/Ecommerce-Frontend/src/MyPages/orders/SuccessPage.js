import React from 'react';
import styles from './SuccessPage.module.css'

const SuccessPage = () => {
  return (
    <div className={styles.success_page}>
      <h1 className='text-success'>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button className={`{styles.home_button} btn btn-warning`} onClick={() => window.location.href = '/chome'}>
      Home
    </button>
    </div>
  );
};

export default SuccessPage;
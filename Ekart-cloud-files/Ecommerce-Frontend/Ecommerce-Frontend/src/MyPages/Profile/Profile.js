// Profile.js

import React from 'react';
import { getLoggedInUser } from '../../Auth';
import profile_banner from '../images/profile-banner.jpg';
import adi from '../images/adi.jpg'

import styles from './Profile.module.css';

const Profile = () => {
  const user = getLoggedInUser();


  const handleBack = () => {
    window.history.back();
  };


  return (

    <div class={`bg-warning-subtle ${styles.body4}`}>
      <div
        class="card p-0 bg-body-tertiary"
      >
        <div class="position-relative">
          <img
            src={profile_banner}
            class="card-img-top"
            alt="profile-banner"
          />
          <img
            class={`${styles.profile_img} position-absolute top-100 start-50 translate-middle rounded-circle border border-5 border-white`}
            src={adi}
            alt="profile-img"
          />
        </div>
        <div class="card-body mt-5">
          <h5 class="card-title text-center mt-5 fw-bold fs-2 profile_details">
            {user.first_name}  {user.last_name}
          </h5>
          <h6 class="text-center mt-1"><span class="fw-bold">@</span>{user.username}</h6>

          <div class="profile_details row row-cols-2 pt-4">
            <div class="key">
              <ul class="list-unstyled d-flex flex-column align-items-end">
                <li>Email</li>
                <li>Mobile number</li>
                <li>Address</li>
                <li>Balance</li>
              </ul>
            </div>
            <div class="value">
              <ul class="list-unstyled d-flex flex-column">
                <li>{user.email}</li>
                <li>{user.mobile_no}</li>
                <li>{user.address}</li>
                <li>&#8377; {user.balance}</li>
              </ul>
            </div>
          </div>
          <div class="row d-flex justify-content-center my-4">
            <button class="btn btn-primary col-1" onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

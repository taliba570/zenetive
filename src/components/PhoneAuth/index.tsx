import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAgnTtSfhohkqK8sb98F9b72KRVuPLqJ7w",
  authDomain: "pomodoro-tracker-35c6d.firebaseapp.com",
  projectId: "pomodoro-tracker-35c6d",
  storageBucket: "pomodoro-tracker-35c6d.appspot.com",
  messagingSenderId: "306170685493",
  appId: "1:306170685493:web:6e2c8834b8769c906d697c",
  measurementId: "G-PJN6QB8VS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // Initialize reCAPTCHA
  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',  // or 'normal' if you want a visible captcha
        callback: (response: any) => {
          console.log('reCAPTCHA verified successfully');
        },
      });
    }
  };

  // Send OTP
  const sendOtp = async () => {
    initializeRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!confirmationResult) {
      console.error('No confirmation result available');
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);  // Use the correct confirm() function
      console.log('Phone number verified successfully:', result);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={sendOtp}>Send OTP</button>
      
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOtp}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;

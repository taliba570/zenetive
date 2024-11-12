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
    <div className="flex h-screen">
      {/* Left half: Login form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
        <div className="flex items-center justify-center w-1/2">
          <img
            src="/images/logo.png"
            alt="Attractive Illustration"
            className="h-40 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-80"
        />
        <button
          onClick={sendOtp}
          className="mb-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Send OTP
        </button>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-80"
        />
        <button
          onClick={verifyOtp}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Verify OTP
        </button>
        <div id="recaptcha-container" className="mt-4"></div>
      </div>

      {/* Right half: Image */}
      <div className="flex items-center justify-center w-1/2 bg-blue-500">
        <img
          src="/images/login.JPG"
          alt="Attractive Illustration"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PhoneAuth;

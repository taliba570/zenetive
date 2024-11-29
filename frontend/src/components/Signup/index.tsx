import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useDispatch } from 'react-redux';
import { signupGithubUser } from '../../redux/slices/asyncThunks/userThunk';
import { AppDispatch } from '../../redux/store';

const firebaseConfig = {
  apiKey: "AIzaSyAgnTtSfhohkqK8sb98F9b72KRVuPLqJ7w",
  authDomain: "pomodoro-tracker-35c6d.firebaseapp.com",
  projectId: "pomodoro-tracker-35c6d",
  storageBucket: "pomodoro-tracker-35c6d.appspot.com",
  messagingSenderId: "306170685493",
  appId: "1:306170685493:web:6e2c8834b8769c906d697c",
  measurementId: "G-PJN6QB8VS4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// OAuth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Sign up with Google
  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  // Sign up with GitHub
  const signUpWithGithub = async () => {
    try {
      const result: UserCredential = await signInWithPopup(auth, githubProvider);
  
      // Get the access token from the credential
      const credential = GithubAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
  
      console.log('GitHub sign-in successful:', result.user);
  
      if (accessToken) {
        dispatch(signupGithubUser({
          userId: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          isVerified: result.user.emailVerified,
          accessToken: accessToken,
        }));
      } else {
        console.error('No access token retrieved from GitHub sign-in.');
      }
    } catch (error) {
      console.error('Error during GitHub sign-in:', error);
    }
  };

  // Navigate to phone sign-in page
  const handlePhoneSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="flex h-screen">
      {/* Left half: Signup form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-80"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-80"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 px-4 py-2 border border-gray-300 rounded w-80"
        />

        {/* Sign Up with Phone Number Button */}
        <button
          onClick={handlePhoneSignIn}
          className="mb-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up with Phone Number
        </button>

        <button
          onClick={signUpWithGoogle}
          className="mb-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Sign Up with Google
        </button>
        <button
          onClick={signUpWithGithub}
          className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition"
        >
          Sign Up with GitHub
        </button>
      </div>

      {/* Right half: Image */}
      <div className="flex items-center justify-center w-1/2 bg-blue-500">
        <img
          src="/images/signup-image.jpg"
          alt="Attractive Illustration"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;

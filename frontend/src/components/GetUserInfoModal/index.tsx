import React, { useState } from 'react';
import { User } from '../user/interfaces/user.interface';
import '../../styles/GetUserInfoModal.css';

// Props interface
interface GetUserInfoModalProps {
  user: User | null;
}

const GetUserInfoModal: React.FC<GetUserInfoModalProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save email and password
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">
          {user?.email ? 'Set Your Password' : 'Complete Your Profile'}
        </h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
              <label htmlFor="email">Email <span className='required'>*</span>:</label>
              <input
                type="email"
                id="email"
                value={email}
                readOnly={user?.email ? true : false}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
              />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password <span className='required'>*</span>:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set your password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password <span className='required'>*</span>:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your confirm password"
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetUserInfoModal;

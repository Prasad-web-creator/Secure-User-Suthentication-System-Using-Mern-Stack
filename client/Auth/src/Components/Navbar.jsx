import { useContext, useState } from 'react';
import auth from '../assets/auth.png';
import { useNavigate } from 'react-router-dom';
import { userProfileContext } from '../Routes/AppRouter';

export default function Navbar() {
  const { profileName, setProfileName } = useContext(userProfileContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = profileName !== 'login'; 

  const handleLogout = () => {
    localStorage.removeItem('profileName');
    localStorage.removeItem('token');
    setProfileName('login');
    setShowMenu(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login');       
    } else {
      setShowMenu(prev => !prev); 
    }
  };

  return (
    <div className="container d-flex justify-content-between">
      <div className="d-flex mt-3">
        <img src={auth} alt="auth" width="70" height="70" />
        <h2 className="mt-3">Mern-Auth</h2>
      </div>

      <div className="position-relative mt-4">
        <button
          className="login-btn "
          onClick={handleProfileClick}
        >
          {isLoggedIn  ? profileName : 'Login'}
          {isLoggedIn && (
            <i className="fa-solid fa-chevron-down ms-2"></i>
          )}
        </button>

        {isLoggedIn && showMenu && (
          <div className="profile-menu">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

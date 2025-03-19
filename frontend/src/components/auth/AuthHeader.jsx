import image1 from '/logo.png'
import PropTypes from 'prop-types';

const AuthHeader = ({ isLogin, setIsLogin }) => {
  
  AuthHeader.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    setIsLogin: PropTypes.func.isRequired
  };

  return (
    <div className="auth-header">
      <img src={image1} alt="Dakapathi Logo" className="auth-logo"/>
      <div className="auth-toggle-container">
        <button
          onClick={() => setIsLogin(true)}
          style={{
            padding: '8px 24px',
            border: 'none',
            borderRadius: '25px',
            background: isLogin ? '#085632' : 'transparent',
            color: isLogin ? 'white' : '#666',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)} 
          style={{
            padding: '8px 24px',
            border: 'none',
            borderRadius: '25px',
            background: !isLogin ? '#085632' : 'transparent',
            color: !isLogin ? 'white' : '#666',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AuthHeader; 
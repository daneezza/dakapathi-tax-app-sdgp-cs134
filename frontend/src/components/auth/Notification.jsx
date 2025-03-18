import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Notification = ({ message, variant, onClose, duration = 3000 }) => {
    const [isHiding, setIsHiding] = useState(false);
  
    useEffect(() => {
      
      const hideTimer = setTimeout(() => {
        setIsHiding(true);
        
        const closeTimer = setTimeout(() => {
          onClose();
        }, 500);
        return () => clearTimeout(closeTimer);
      }, duration - 500);
  
      return () => clearTimeout(hideTimer);
    }, [duration, onClose]);
  
    return (
      <div className={`notification ${variant} ${isHiding ? 'hide' : ''}`}>
        {message}
      </div>
    );
  };
  
  Notification.propTypes = {
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
  };
  
  export default Notification;
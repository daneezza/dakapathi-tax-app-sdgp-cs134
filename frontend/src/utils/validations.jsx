  // Email validation using regex
  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // NIC validation for both old (9 digits + V/X) and new (12 digits) formats
  export const isValidNIC = (nic) => {
    const oldNICRegex = /^[0-9]{9}[VvXx]$/;
    const newNICRegex = /^[0-9]{12}$/;
    return oldNICRegex.test(nic) || newNICRegex.test(nic);
  };
  
  // Password validation
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Name validation (only letters, spaces, and periods)
  export const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s.]{2,50}$/;
    return nameRegex.test(name);
  };
  
  // Address validation (alphanumeric, spaces, and common punctuation)
  export const isValidAddress = (address) => {
    const addressRegex = /^[A-Za-z0-9\s,.-/]{5,100}$/;
    return addressRegex.test(address);
  };
  
  // Date validation (must be 18 years or older)
  export const isValidAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age >= 18;
  };
  
  // Password match validation
  export const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  // OTP validation
  export const isValidOTP = (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    return otpRegex.test(otp);
  };

  // Error messages
  export const getErrorMessage = (field, value, isLogin = false) => {
    // For login page, only validate email and password

    // For signup page, validate all fields
    switch (field) {
      case 'email':
        return !isValidEmail(value) ? 'Please enter a valid email address' : '';

      case 'password':
        if (!isLogin) {
          return !isValidPassword(value) 
            ? 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character' 
            : '';
        }
        return '';

      case 'nic':
        return !isValidNIC(value) 
          ? 'Please enter a valid NIC number (old or new format)' 
          : '';
      case 'name':
        return !isValidName(value) 
          ? 'Name should only contain letters, spaces, and periods (2-50 characters)' 
          : '';
      case 'address':
        return !isValidAddress(value) 
          ? 'Please enter a valid address (5-100 characters)' 
          : '';
      case 'birthDate':
        return !isValidAge(value) 
          ? 'You must be at least 18 years old' 
          : '';
      case 'otp':
        return !isValidOTP(value) 
          ? 'Please enter a valid 6-digit OTP' 
          : '';
      default:
        return '';
    }
  }
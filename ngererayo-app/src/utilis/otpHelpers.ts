export const maskPhoneNumber = (phone: string): string => {
  if (phone.length < 4) return phone;
  return phone.slice(0, 3) + '***' + phone.slice(-4);
};

export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  const maskedUsername = username.length > 2 
    ? username[0] + '***' + username.slice(-1)
    : username;
  
  const [domainName, extension] = domain.split('.');
  const maskedDomain = domainName.length > 2
    ? domainName[0] + '**' + domainName.slice(-1)
    : domainName;
    
  return `${maskedUsername}@${maskedDomain}.${extension}`;
};

export const validateOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

export const formatOTPInput = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 6);
};
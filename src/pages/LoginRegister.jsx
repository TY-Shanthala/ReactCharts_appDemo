import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <AuthForm isLogin={isLogin} onSwitch={() => setIsLogin(!isLogin)} />
    </div>
  );
};

export default LoginRegister;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material';
import '../styles/auth.scss';

const AuthForm = ({ isLogin, onSwitch }) => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        // Replace with your test credentials
        const validEmail = 'driver@gmail.com';
        const validPassword = 'driver@123';

        if (isLogin) {
            if (email === validEmail && password === validPassword) {
                navigate('/dashboard');
                localStorage.setItem('token', 'driver-token');

            } else {
                alert('Invalid email or password');
            }
        } else {
            alert('Account created successfully. Please login.');
            onSwitch();
        }
    };

    return (
        <Box className="auth-container">
            <Card className="auth-card">
                <CardContent>
                    <Typography variant="h5" className="auth-title">
                        {isLogin ? 'Driver Login' : 'Driver Sign Up'}
                    </Typography>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="License Number"
                                    variant="outlined"
                                    margin="normal"
                                />
                            </>
                        )}
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            name="email"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            name="password"
                        />

                        <Button
                            type="submit"   // ✅ Important!
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="auth-button"
                        >
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>

                    </form>

                    <Box textAlign="center" marginTop={2}>
                        <Typography variant="body2">
                            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                            <span onClick={onSwitch} className="switch-link">
                                {isLogin ? 'Sign Up' : 'Login'}
                            </span>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    );
};

export default AuthForm;

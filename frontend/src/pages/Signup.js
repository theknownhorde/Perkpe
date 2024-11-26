import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Signup.css'; // Ensure you import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '1021986147883-l5m87q49h95fmh2ir9kd1kcgaj2dq9gd.apps.googleusercontent.com';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true); // Set loading state

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('/users/register', formData);
            setSuccess(data.message || 'Signup successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000); // Redirect after success
        } catch (err) {
            console.error('[ERROR] Signup failed:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'Signup failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        setError('');
        setLoading(true); // Set loading state for Google login

        try {
            const { data } = await axios.post('/users/google-login', { tokenId: credentialResponse.credential });
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            window.location.href = '/'; // Redirect to the dashboard or home
        } catch (err) {
            console.error('[ERROR] Google Signup/Signin failed:', err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'Google Sign Up Failed. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleGoogleLoginError = () => {
        setError('Google Sign Up Failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Container className="signup-container">
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="signup-card">
                            <Card.Body>
                                <h3 className="signup-title">Sign Up</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your name"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter a strong password"
                                        />
                                    </Form.Group>
                                    <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                                    </Button>
                                </Form>
                                <div className="text-center mt-3 google-login-button">
                                    <GoogleLogin
                                        onSuccess={handleGoogleLoginSuccess}
                                        onError={handleGoogleLoginError}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </GoogleOAuthProvider>
    );
};

export default Signup;

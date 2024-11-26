import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import axios from '../utils/api'; // Ensure this is configured correctly
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Basic email format validation (optional)
    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Log the data being sent for debugging
        console.log('[DEBUG] Email entered:', email);
        console.log('[DEBUG] Password entered:', password);

        // Validate email format
        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        try {
            // Log the data being sent
            console.log('[DEBUG] Sending login request with:', { email, password });

            // Send login request to the backend
            const { data } = await axios.post('/users/login', { email, password });

            // Log the successful response
            console.log('[DEBUG] Login successful:', data);

            // Store token and name in localStorage (make sure backend sends them)
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);

            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            // Improved error handling for debugging
            console.error('[ERROR] Login failed:', err.response ? err.response.data : err.message);
            
            // Set error message for display
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    return (
        <Container className="login-container">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="login-card">
                        <Card.Body>
                            <h3 className="login-title">Login</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <a href="/forgot-password" className="forgot-link">
                                    Forgot Password?
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { Form, Button, Alert, Container } from 'react-bootstrap';
// import axios from '../utils/api';

// const TransferPoints = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         platform: '',
//         points: '',
//     });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setError('You need to log in to transfer points.');
//                 return;
//             }

//             console.log('[DEBUG] Sending transfer request:', formData);
//             await axios.post('/transfer', formData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setSuccess('Points transferred successfully!');
//             setFormData({ email: '', platform: '', points: '' }); // Clear form after success
//         } catch (err) {
//             console.error('[ERROR] Transfer failed:', err.response?.data || err.message);
//             setError(err.response?.data?.error || 'Failed to transfer points.');
//         }
//     };

//     return (
//         <Container>
//             <h2>Transfer Points</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             {success && <Alert variant="success">{success}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group>
//                     <Form.Label>Recipient Email</Form.Label>
//                     <Form.Control
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter recipient email"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Platform</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="platform"
//                         value={formData.platform}
//                         onChange={handleInputChange}
//                         placeholder="Enter platform (e.g., Amazon, Flipkart)"
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group>
//                     <Form.Label>Points</Form.Label>
//                     <Form.Control
//                         type="number"
//                         name="points"
//                         value={formData.points}
//                         onChange={handleInputChange}
//                         placeholder="Enter points to transfer"
//                         required
//                         min="1"
//                     />
//                 </Form.Group>
//                 <Button type="submit" className="mt-3">Transfer</Button>
//             </Form>
//         </Container>
//     );
// };

// export default TransferPoints;
import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/api';

const TransferPoints = () => {
    const [formData, setFormData] = useState({
        email: '',
        platform: '',
        points: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to log in to transfer points.');
                return;
            }
            console.log('[DEBUG] Sending transfer request:', formData);
            await axios.post('/transfer', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('Points transferred successfully!');
            setFormData({ email: '', platform: '', points: '' }); // Clear form after success
        } catch (err) {
            console.error('[ERROR] Transfer failed:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to transfer points.');
        }
    };

    const handleBlockchainValidation = () => {
        // Create transaction data for blockchain validation
        const transactionData = {
            ...formData,
            timestamp: new Date().getTime(),
            hash: Math.random().toString(36).substring(7) // Simple placeholder hash
        };
        navigate('/blockchain-validation', { state: { transaction: transactionData } });
    };

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Transfer Points</h2>
                <Button 
                    variant="info"
                    onClick={handleBlockchainValidation}
                    className="d-flex align-items-center"
                >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    View Blockchain Validation
                </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Recipient Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter recipient email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Platform</Form.Label>
                            <Form.Control
                                type="text"
                                name="platform"
                                value={formData.platform}
                                onChange={handleInputChange}
                                placeholder="Enter platform (e.g., Amazon, Flipkart)"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                type="number"
                                name="points"
                                value={formData.points}
                                onChange={handleInputChange}
                                placeholder="Enter points to transfer"
                                required
                                min="1"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary">
                                Transfer Points
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Header className="bg-light">
                    <h5 className="mb-0">What is Blockchain Validation?</h5>
                </Card.Header>
                <Card.Body>
                    <p>
                        Blockchain validation ensures the security and transparency of your point transfers. 
                        Click the "View Blockchain Validation" button to:
                    </p>
                    <ul>
                        <li>View transaction details and status</li>
                        <li>Track validation progress across network nodes</li>
                        <li>Verify transaction authenticity</li>
                        <li>Monitor the blockchain integration process</li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TransferPoints;
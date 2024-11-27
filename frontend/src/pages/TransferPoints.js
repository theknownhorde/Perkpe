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
import { Form, Button, Alert, Container, Modal, Spinner } from 'react-bootstrap';
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
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateInputs = () => {
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (Number(formData.points) <= 0) {
            setError('Points must be greater than zero.');
            return false;
        }
        if (!formData.platform.trim()) {
            setError('Platform cannot be empty.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to log in to transfer points.');
                setLoading(false);
                return;
            }

            console.log('[DEBUG] Sending transfer request:', formData);
            await axios.post('/transfer', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess('Points transferred successfully!');
            setFormData({ email: '', platform: '', points: '' }); // Clear form after success
            setShowPopup(true); // Show blockchain validation popup
        } catch (err) {
            console.error('[ERROR] Transfer failed:', err.response || err.message);
            setError(err.response?.data?.error || 'Failed to transfer points.');
        } finally {
            setLoading(false);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/transfer-summary'); // Redirect to summary or confirmation page
    };

    return (
        <Container>
            <h2>Transfer Points</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
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
                <Form.Group>
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
                <Form.Group>
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
                <Button type="submit" className="mt-3" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Transfer'}
                </Button>
            </Form>

            {/* Blockchain Validation Popup */}
            <Modal show={showPopup} onHide={handleClosePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Blockchain Validation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Points have been transferred and validated on the blockchain.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClosePopup}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TransferPoints;

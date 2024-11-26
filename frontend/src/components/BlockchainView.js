import React, { useEffect, useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import axios from '../utils/api';

const BlockchainView = () => {
    const [blockchain, setBlockchain] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlockchain = async () => {
            try {
                const { data } = await axios.get('/redeem/blockchain');
                setBlockchain(data.blockchain);
            } catch (err) {
                setError('Failed to fetch blockchain data.');
            }
        };
        fetchBlockchain();
    }, []);

    return (
        <Container>
            <h2>Blockchain Transactions</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Timestamp</th>
                        <th>User ID</th>
                        <th>Platform</th>
                        <th>Points Redeemed</th>
                        <th>Amount Credited</th>
                    </tr>
                </thead>
                <tbody>
                    {blockchain.map((block, index) => (
                        <tr key={index}>
                            <td>{block.index}</td>
                            <td>{new Date(block.timestamp).toLocaleString()}</td>
                            <td>{block.data.userId}</td>
                            <td>{block.data.platform}</td>
                            <td>{block.data.pointsRedeemed}</td>
                            <td>₹{block.data.amountCredited}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BlockchainView;

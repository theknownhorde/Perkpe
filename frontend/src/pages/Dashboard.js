import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Table, Button, Form, Navbar, Nav } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from '../utils/api'; // Axios instance with baseURL
import moment from 'moment';
import './Dashboard.css'; // Import custom CSS for styling

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [points, setPoints] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('date');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [name, setName] = useState('');

  // Fetch user points and transactions from the API
  useEffect(() => {
    const fetchPointsAndTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is missing. Please log in.');
        }

        // Fetch user points
        const pointsResponse = await axios.get('/points', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch user transactions
        const transactionsResponse = await axios.get('/points/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPoints(pointsResponse.data.points || {});
        setTransactions(transactionsResponse.data.transactions || []);
        setName(localStorage.getItem('name') || 'User');
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to fetch data.');
      }
    };

    fetchPointsAndTransactions();
  }, []);

  // Logos and colors for platforms
  const platformLogos = {
    Amazon: 'https://via.placeholder.com/150?text=Amazon',
    Flipkart: 'https://via.placeholder.com/150?text=Flipkart',
    Swiggy: 'https://via.placeholder.com/150?text=Swiggy',
    Myntra: 'https://via.placeholder.com/150?text=Myntra',
    Zomato: 'https://via.placeholder.com/150?text=Zomato',
    Uber: 'https://via.placeholder.com/150?text=Uber',
    Ola: 'https://via.placeholder.com/150?text=Ola',
  };

  const platformColors = {
    Amazon: '#FF9900',
    Flipkart: '#2874F0',
    Swiggy: '#FF9900',
    Myntra: '#FF3E6C',
    Zomato: '#CB202D',
    Uber: '#000000',
    Ola: '#FDD835',
  };

  const platforms = Object.keys(points);
  const pointsData = Object.values(points);

  // Chart data
  const chartData = {
    labels: platforms,
    datasets: [
      {
        label: 'Points',
        data: pointsData,
        backgroundColor: platforms.map((platform) => platformColors[platform] || '#6C757D'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Points Distribution Across Platforms',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Platforms',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Points',
        },
      },
    },
  };

  // Handle sort type change
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Handle platform filter change
  const handleFilterChange = (e) => {
    setFilterPlatform(e.target.value);
  };

  // Filter and sort transactions
  const sortedTransactions = transactions
    .filter((txn) => (filterPlatform ? txn.platform === filterPlatform : true))
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortType === 'points') {
        return b.points - a.points;
      }
      return 0;
    });

  return (
    <Container fluid className="dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/profile">{name}</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar>

      {/* Sidebar */}
      <div className="sidebar">
        <h4>Dashboard</h4>
        <ul>
          <li>
            <a href="/" className="sidebar-link">Home</a>
          </li>
          <li>
            <a href="/transfer" className="sidebar-link">Transfer Points</a>
          </li>
          <li>
            <a href="/redeem" className="sidebar-link">Redeem Points</a>
          </li>
          <li>
            <a href="/add-points" className="sidebar-link">Add Points</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Your Dashboard</h2>
        {error && <p className="error">{error}</p>}

        {/* Points Cards */}
        <Col>
          {Object.entries(points).map(([platform, point]) => (
            <div>
              <Row md={4} key={platform}>
                <Card className="points-card">
                  <Card.Body>
                    <Card.Title>{platform}</Card.Title>
                    <Card.Img
                      variant="top"
                      src={platformLogos[platform] || 'https://via.placeholder.com/150'}
                      alt={platform}
                    />
                    <Card.Text className="points-text">{point} Points</Card.Text>
                    <Button variant="primary" className="cta-button">
                      Redeem Points
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </div>
          ))}
        </Col>

        {/* Bar Chart */}
        <div className="chart-container">
          <h4>Points Distribution</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Transaction History */}
        <div className="transaction-history">
          <h4>Transaction History</h4>
          <Form className="transaction-filters">
            <Form.Group controlId="sortType">
              <Form.Label>Sort By</Form.Label>
              <Form.Control as="select" value={sortType} onChange={handleSortChange}>
                <option value="date">Date</option>
                <option value="points">Points</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="filterPlatform">
              <Form.Label>Filter By Platform</Form.Label>
              <Form.Control as="select" value={filterPlatform} onChange={handleFilterChange}>
                <option value="">All</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Points</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{moment(txn.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>{txn.platform}</td>
                  <td>{txn.type}</td>
                  <td>{txn.points}</td>
                  <td>{txn.fromUser?.email || 'N/A'}</td>
                  <td>{txn.toUser?.email || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

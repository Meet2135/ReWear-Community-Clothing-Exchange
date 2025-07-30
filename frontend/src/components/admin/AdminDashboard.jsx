import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge
} from '@mui/material';
import {
  People,
  Inventory,
  SwapHoriz,
  Warning,
  TrendingUp,
  AdminPanelSettings,
  CheckCircle,
  Cancel,
  Delete,
  Visibility,
  Block,
  LockOpen,
  Refresh,
  Analytics,
  Settings
} from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [approvalDialog, setApprovalDialog] = useState(false);
  const [rejectionDialog, setRejectionDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.role !== 'admin') {
      setError('Access denied. Admin privileges required.');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, itemsRes, swapsRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/admin/items', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/admin/swaps', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ]);

      const [statsData, usersData, itemsData, swapsData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        itemsRes.json(),
        swapsRes.json()
      ]);

      if (statsData.success) setStats(statsData.data);
      if (usersData.success) setUsers(usersData.data.users);
      if (itemsData.success) setItems(itemsData.data.items);
      if (swapsData.success) setSwaps(swapsData.data.swaps);
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveItem = async () => {
    if (!selectedItem) return;
    
    try {
      const response = await fetch(`/api/admin/items/${selectedItem._id}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        setItems(prev => prev.map(item => 
          item._id === selectedItem._id 
            ? { ...item, status: 'active' }
            : item
        ));
        setApprovalDialog(false);
        setSelectedItem(null);
      }
    } catch (err) {
      setError('Failed to approve item');
    }
  };

  const handleRejectItem = async () => {
    if (!selectedItem || !rejectionReason) return;
    
    try {
      const response = await fetch(`/api/admin/items/${selectedItem._id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: rejectionReason })
      });
      
      if (response.ok) {
        setItems(prev => prev.map(item => 
          item._id === selectedItem._id 
            ? { ...item, status: 'rejected' }
            : item
        ));
        setRejectionDialog(false);
        setSelectedItem(null);
        setRejectionReason('');
      }
    } catch (err) {
      setError('Failed to reject item');
    }
  };

  const handleBanUser = async (userId, reason = 'Violation of community guidelines') => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });
      
      if (response.ok) {
        setUsers(prev => prev.map(user => 
          user._id === userId 
            ? { ...user, status: 'banned' }
            : user
        ));
      }
    } catch (err) {
      setError('Failed to ban user');
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/unban`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.ok) {
        setUsers(prev => prev.map(user => 
          user._id === userId 
            ? { ...user, status: 'active' }
            : user
        ));
      }
    } catch (err) {
      setError('Failed to unban user');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'banned': return 'error';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  if (user?.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Access denied. Admin privileges required.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ReWear</title>
      </Helmet>
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#2E7D32' }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage users, moderate content, and monitor platform activity
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                color: 'white'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <People sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {stats.totalUsers}
                      </Typography>
                      <Typography variant="body2">
                        Total Users
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                color: 'white'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Inventory sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {stats.totalItems}
                      </Typography>
                      <Typography variant="body2">
                        Total Items
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                color: 'white'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SwapHoriz sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {stats.totalSwaps}
                      </Typography>
                      <Typography variant="body2">
                        Total Swaps
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)',
                color: 'white'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Warning sx={{ fontSize: 40, mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {stats.pendingApprovals}
                      </Typography>
                      <Typography variant="body2">
                        Pending Approvals
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Overview" icon={<Analytics />} />
            <Tab label="Users" icon={<People />} />
            <Tab label="Items" icon={<Inventory />} />
            <Tab label="Swaps" icon={<SwapHoriz />} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Activity
                  </Typography>
                  {stats?.recentActivity && (
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary={`${stats.recentActivity.newUsers} new users today`}
                          secondary="Last 24 hours"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`${stats.recentActivity.newItems} new items today`}
                          secondary="Last 24 hours"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary={`${stats.recentActivity.newSwaps} new swaps today`}
                          secondary="Last 24 hours"
                        />
                      </ListItem>
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<CheckCircle />}
                      onClick={() => setActiveTab(2)}
                      sx={{ backgroundColor: '#4CAF50' }}
                    >
                      Review Pending Items
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<People />}
                      onClick={() => setActiveTab(1)}
                    >
                      Manage Users
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Refresh />}
                      onClick={fetchDashboardData}
                    >
                      Refresh Data
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">User Management</Typography>
                <TextField
                  size="small"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Joined</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.status} 
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {user.status === 'banned' ? (
                            <IconButton
                              color="success"
                              onClick={() => handleUnbanUser(user._id)}
                            >
                              <LockOpen />
                            </IconButton>
                          ) : (
                            <IconButton
                              color="error"
                              onClick={() => handleBanUser(user._id)}
                            >
                              <Block />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeTab === 2 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Item Moderation</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FormControl size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={item.images?.[0]?.url} 
                              sx={{ mr: 2, width: 40, height: 40 }}
                            >
                              {item.title.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {item.description.substring(0, 50)}...
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{item.user?.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Chip 
                            label={item.status} 
                            color={getStatusColor(item.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setSelectedItem(item);
                                setApprovalDialog(true);
                              }}
                              disabled={item.status !== 'pending'}
                            >
                              <CheckCircle />
                            </IconButton>
                            <IconButton
                              color="warning"
                              onClick={() => {
                                setSelectedItem(item);
                                setRejectionDialog(true);
                              }}
                              disabled={item.status !== 'pending'}
                            >
                              <Cancel />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => {
                                // Handle delete
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {activeTab === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Swap Management</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Requester</TableCell>
                      <TableCell>Receiver</TableCell>
                      <TableCell>Items</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {swaps.map((swap) => (
                      <TableRow key={swap._id}>
                        <TableCell>{swap.requester?.name}</TableCell>
                        <TableCell>{swap.receiver?.name}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">
                              {swap.requestedItem?.title} ↔ {swap.offeredItem?.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={swap.status} 
                            color={getStatusColor(swap.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(swap.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Approval Dialog */}
      <Dialog open={approvalDialog} onClose={() => setApprovalDialog(false)}>
        <DialogTitle>Approve Item</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve "{selectedItem?.title}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialog(false)}>Cancel</Button>
          <Button onClick={handleApproveItem} color="success" variant="contained">
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectionDialog} onClose={() => setRejectionDialog(false)}>
        <DialogTitle>Reject Item</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Are you sure you want to reject "{selectedItem?.title}"?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Rejection Reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectionDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleRejectItem} 
            color="error" 
            variant="contained"
            disabled={!rejectionReason}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboard; 
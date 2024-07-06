import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../redux/Action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Modal,
  Container,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, IsLoggedIn, isError, data } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login(formData));
    } else {
      dispatch(register(formData));
    }
    handleClose();
  };

  useEffect(() => {
    console.log('IsLoggedIn changed:', IsLoggedIn);
    if (!IsLoggedIn) {
      toast.success('Log out successfully!');
    }
  }, [IsLoggedIn]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleOpen}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Modal open={open} onClose={handleClose}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Container maxWidth="sm" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '40%' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {!isLogin && (
                  <Grid item xs={12}>
                    <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                {!isLogin && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Role</Typography>
                    <RadioGroup name="role" value={formData.role} onChange={handleChange} row>
                      <FormControlLabel value="student" control={<Radio />} label="Student" />
                      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    </RadioGroup>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    {isLogin ? 'Login' : 'Register'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleToggle} fullWidth>
                    {isLogin ? 'Register' : 'Login'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleClose} fullWidth>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      </Modal>
      <ToastContainer
        style={{ left: '50%', top: '20%', transform: 'translate(-50%, 0)' }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;

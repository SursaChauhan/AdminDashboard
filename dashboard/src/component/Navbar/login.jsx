import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Container, TextField, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
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
          <Container maxWidth="sm" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px',maxWidth:"40%" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <form>
              <Grid container spacing={2}>
                {!isLogin && (
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                  />
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
                    <RadioGroup
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel value="student" control={<Radio />} label="Student" />
                      <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                    </RadioGroup>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>
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
    </div>
  );
};

export default Login;

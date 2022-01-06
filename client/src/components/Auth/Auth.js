import React, {useState} from 'react';
import {Typography, Paper, Button, Grid, Container, Avatar} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {signin, signup} from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({type: 'AUTH', data: {result, token}});// dispatch action
      navigate('/');// redirects back to home page once you login
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try Again Later');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const switchMode = () => { // this is to switch from sign up to sign in
    setIsSignup((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && ( // this code block runs when the use wants to signup
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }

            {/* if the user wants to log in this runs */}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

            {
              // this code runs when the user wants to sign up
              isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
            }

          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
          <GoogleLogin
            clientId="751590656527-4qu6rar482ckohnpapvvpbspmqnjqreg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.paper} fullWidth color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="">Google Sign In</Button>)}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

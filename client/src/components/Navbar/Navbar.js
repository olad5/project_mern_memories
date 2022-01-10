import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import decode from 'jwt-decode';
import usestyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {
  const classes = usestyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;// checks if the token exists

    // check for the JWT during the manual signup
    if (token) {
      const decodedToken = decode(token);// this gives info about when the token is expiring
      if (decodedToken.exp * 1000 < new Date().getTime()) logout(); // logs the user out if token expired
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); // basically this runs when the url of the current page changes

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

        )}
      </Toolbar>
    </AppBar>

  );
};
export default Navbar;

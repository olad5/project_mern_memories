import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() { // we have to setup url search params to know which page we are currently on and what search we are looking for
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery(); // this allows us to use it as a hook
  const navigate = useNavigate();
  const page = query.get('page') || 1; // this reads the current url and check if we have a page there
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags != '') {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);// changes the url on the address bar to the search params
    } else {
      dispatch(getPosts(page));
      navigate('/');// redirects back to home if we search for nothing
    }
  };

  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      searchPost();// searches for posts when the enter key is pressed
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}

              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button className={classes.searchButton} onClick={searchPost} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && ( // shows the pagination if the user doesn't try to use the search functionality
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>

  );
};
export default Home;


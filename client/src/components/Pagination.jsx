import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { getPosts } from '../actions/posts';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]); // fetch the posts when the page changes

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages} // the number of pages, static for now but dynamic later
      page={Number(page) || 1} // currrent page
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};
export default Paginate;

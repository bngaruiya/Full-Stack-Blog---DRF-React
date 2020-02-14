import axios from 'axios';

import { GET_POSTS, ADD_POST, GET_ERRORS } from './types';
import { createMessage } from './messages';
import { tokenConfig } from './auth';

//Get Posts
export const getPosts = () => dispatch => {
  axios
    .get('/api/posts/')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Add Post
export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts/create/', post, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addPost: 'Article Added' }));
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

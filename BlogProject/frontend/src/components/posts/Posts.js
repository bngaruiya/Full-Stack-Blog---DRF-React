import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts } from '../../actions/posts';

export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className='container'>
        {this.props.posts.map(post => (
          <div
            key={post.id}
            className='card text-white bg-secondary mb-3'
            style={{ maxWidth: '50rem' }}
          >
            <div className='card-header'>{post.publish}</div>
            <div className='card-body'>
              <h4 className='card-title'>{post.title}</h4>
              <p className='card-text'>{post.content}</p>
              <a href='#'>Read More...</a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);

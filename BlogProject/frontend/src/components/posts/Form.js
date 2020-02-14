import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPost } from '../../actions/posts';

export class Form extends Component {
  state = {
    title: '',
    content: '',
    image: ''
  };

  static propTypes = PropTypes.func.isRequired;

  onChange = e => {
    switch (e.target.name) {
      case 'image':
        this.setState({ image: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, content, image } = this.state;
    let post = new FormData();

    post.append('title', title);
    post.append('content', content);
    post.append('image', image);

    this.props.addPost(post);
    this.setState({
      title: '',
      content: '',
      image: ''
    });
  };

  render() {
    const { title, content, image } = this.state;
    return (
      <div>
        <div className='card card-body mt-4 mb-4'>
          <h2>Add Post</h2>
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                className='form-control'
                type='text'
                name='title'
                onChange={this.onChange}
                value={title}
              />
            </div>
            <div className='form-group'>
              <label>Content</label>
              <input
                className='form-control'
                type='text'
                name='content'
                onChange={this.onChange}
                value={content}
              />
            </div>
            <div className=''>
              <label>Image</label>
              <input
                className=''
                type='file'
                name='image'
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { addPost })(Form);

// import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import {
//   HashRouter as Router,
//   Route,
//   Switch,
//   Link,
//   Redirect
// } from 'react-router-dom';
// import { Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

// import store from '../store';
// import Header from './layout/Header';
// import Posts from './posts/Posts';
// import Form from './posts/Form';
// import Alerts from './layout/Alerts';
// import Login from './accounts/Login';
// import Register from './accounts/Register';
// import PrivateRoute from './common/PrivateRoute';

// // Alert Options
// const alertOptions = {
//   timeout: 3000,
//   position: 'top center'
// };

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AlertProvider template={AlertTemplate} {...alertOptions}>
//           <Router>
//             <Fragment>
//               <Header />
//               <Alerts />
//               <div className='container'>
//                 <Switch>
//                   <Route exact path='/' component={Posts} />
//                   <Route exact path='/create' component={Form} />
//                   <Route exact path='/register' component={Register} />
//                   <Route exact path='/login' component={Login} />
//                 </Switch>
//               </div>
//               <Link to='/create'>
//                 <button className='btn btn-primary, btn-sm'>Create Post</button>
//               </Link>
//             </Fragment>
//           </Router>
//         </AlertProvider>
//       </Provider>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));

import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import Posts from './posts/Posts';
import Form from './posts/Form';
import Header from './layout/Header';
import store from '../store';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Fragment>
              <Header />
              <Alerts />
              <div className='container'>
                <Link to='/create'>
                  <button className='btn btn-primary, btn-sm'>
                    Create Post
                  </button>
                </Link>
                <Switch>
                  <Route exact path='/' component={Posts} />
                  <PrivateRoute exact path='/create' component={Form} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </AlertProvider>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));

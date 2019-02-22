import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Authenticator';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <div className="ui active centered inline loader"></div>
    );
  }
}

export default withRouter(Callback);
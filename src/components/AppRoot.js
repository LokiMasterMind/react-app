import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from '../images/logo.svg';
import '../css/App.css';
import Loader from './Loader'
import { getDataFromUrl } from '../store/action'
import { selectData, selectLoading } from '../store/selector'

class AppRoot extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Loader loading={this.props.loading}>
          {this.props.children}
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    data: selectData(state),
    loading: selectLoading(state)
})

const actions = { getDataFromUrl }

export default connect(mapStateToProps, actions)(AppRoot);

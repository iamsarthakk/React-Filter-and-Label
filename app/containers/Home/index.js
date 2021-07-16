/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from "react-router-dom";
import "./index.css";

export function Home() {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  return (
    <div className="Home">
      <Link to="/filter" className="Home__link">
        Filtered Calls
      </Link>
      <Link to="/label" className="Home__link">
        Label Calls
      </Link>
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Home);

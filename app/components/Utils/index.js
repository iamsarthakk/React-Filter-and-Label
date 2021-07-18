/**
 *
 * Utils
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Axios from "axios";

const baseURL = "https://damp-garden-93707.herokuapp.com/";
const getListOfAgentsApi = "getlistofagents";
const getFilteredCallsApi = "getfilteredcalls";

function getAgentList() {
    return Axios.get(`${baseURL}${getListOfAgentsApi}`);
}

function getFilteredCalls(agentList, timeRange) {
  return Axios.post(`${baseURL}${getFilteredCallsApi}`, {
    info: {
      filter_agent_list: agentList,
      filter_time_range: timeRange
    }
  });
}

Utils.propTypes = {};

export default memo(getAgentList);

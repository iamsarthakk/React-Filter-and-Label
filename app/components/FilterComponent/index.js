/**
 *
 * FilterComponent
 *
 */

import React, { memo } from 'react';
import { Button } from 'antd';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import "./index.css";
import Home from '../../containers/Home'

function FilterComponent() {
  // const { loading, error, calls, enabled } = this.state;
  // let className = "FilteredCalls";
  // if (loading || error || calls.length) {
  //   className = "FilteredCalls FilteredCalls--sidebar";
  // }
  
  return (
   
    <div>
      <Home />
     
      <div className="FilteredCalls">
        <div className="FilteredCalls__criteria">
          <div className="FilteredCalls__criteria-list">
            <div className="FilteredCalls__agentsList">
              <div className="FilteredCalls__criteria-title">Select agents</div>
              {/* <AgentsSelection onAgentSelected={this.onAgentSelected} /> */}
            </div>
            <div className="FilteredCalls__duration">
              <div className="FilteredCalls__criteria-title">
                Select duration
              </div>
              {/* <DurationRange onDurationSelected={this.onDurationSelected} /> */}
            </div>
          </div>
          <div className="FilteredCalls__actions">
            <Button>
            {/* <Button onClick={this.getFilteredCalls} disabled={!enabled}> */}
              Get Filtered Calls
            </Button>
          </div>
        </div>
        {/* <div className="FilteredCalls__calls">{this.renderCallsList()}</div> */}
      </div>
    </div>
  );
}

FilterComponent.propTypes = {};

export default memo(FilterComponent);

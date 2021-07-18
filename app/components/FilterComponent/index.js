/**
 *
 * FilterComponent
 *
 */

import React, { memo, useState } from 'react';
import { Button } from 'antd';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import "./index.css";
import Home from '../../containers/Home';
import DurationRange from '../DurationRange';
import AgentList from '../AgentList';

// import getAgentList from '../Utils';


function onAgentSelection(data) {
  // setSelectedAgents(data);
  // this.setState({ selectedAgents: data });
  // this.setState({
  //   enabled: this.isEnabled(data, this.state.selectedDuration)
  // });
}



function FilterComponent() {
  // const { loading, error, calls, enabled } = this.state;
  // let className = "FilteredCalls";
  // if (loading || error || calls.length) {
  //   className = "FilteredCalls FilteredCalls--sidebar";
  // }
  const [Agents, setAgents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  if(isLoading){
    function listOfAgents() {
      console.log("listOfAgents");
      fetch("https://damp-garden-93707.herokuapp.com/getlistofagents")
        .then(res => res.json())
        .then(
          (result) => {
            setAgents(result.data.listofagents); 
            // console.log(result.data);
            setLoading(false);
          }
        )
    }
    function getDurationRange() {
      fetch("https://damp-garden-93707.herokuapp.com/getdurationrange")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              min_duration: result.data.minimum,
              max_duration: result.data.maximum,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    listOfAgents();
    getDurationRange();
    return (
      <div>
        <Home />
        <h1>Loading Data...</h1>
        
      </div>
      );
  } 
  else{
  return (
   
    <div>
      
      <Home />
      <div className="" style={{ marginTop: "2rem"}}>
        <div className="">
          <div className=" ">
            <h1 className="text-center">Part 1 - Filter Calls</h1>
            <div className="FilteredCalls__agentsList">
              <div className="FilteredCalls__criteria-title">Select agents</div>
             
              <AgentList agents={Agents}/>
            </div>
            <div className="FilteredCalls__duration">
              <div className="FilteredCalls__criteria-title">
                Select duration
              </div>
              <DurationRange />
            </div>
          </div>
          <div className="FilteredCalls__actions">
            <Button type="primary" >
              Get Filtered Calls
            </Button>
          </div>
          
        </div>
      
        {/* {
          this.state.filtered_list && (
              <TableView columns={this.state.agent_table_columns} data={this.state.filtered_list}/>
            )
        } */}
        </div>
      </div>
  );
      }
}

FilterComponent.propTypes = {};

export default memo(FilterComponent);

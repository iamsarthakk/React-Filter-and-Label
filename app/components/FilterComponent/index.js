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

import FilteredDataList from '../FilteredDataList';
// import getAgentList from '../Utils';


function FilterComponent() {

  const [Agents, setAgents] = useState([]);
  const [duration, setDuration] = useState({min_duration: 0, max_duration: 10});
  const [isLoading, setLoading] = useState(true);
  const [selected_agents, setSelectedAgents]= useState([]);
  const [filter_time_range, setFilteredTimeRange] = useState([0,10]);
  const [filtered_list, setfilteredlist] = useState([]);

  const agentListCallback = (childData) => {
    
    setSelectedAgents(childData);
    console.log(selected_agents);
  };

  const DurationRangeCallback = (childData) => {
    setFilteredTimeRange(childData);
  
  }

  function getFilteredCalls() {
    const filter = {"info": {
        "filter_agent_list": selected_agents,
        "filter_time_range": filter_time_range
        }
      }
    
    fetch("https://damp-garden-93707.herokuapp.com/getfilteredcalls", {
        'Content-Type': 'application/json',
        method: 'POST',
        body: JSON.stringify(filter)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setfilteredlist(result.data);
          console.log(filtered_list);
        }
      )

  }

  if(isLoading){
    function listOfAgents() {
      console.log("listOfAgents");
      fetch("https://damp-garden-93707.herokuapp.com/getlistofagents")
        .then(res => res.json())
        .then(
          (result) => {
            setAgents(result.data.listofagents); 
            // console.log(result.data);
           
          }
        )
    }
    function getDurationRange() {
      fetch("https://damp-garden-93707.herokuapp.com/getdurationrange")
        .then(res => res.json())
        .then(
          (result) => {
            const tempduration = {
              min_duration: result.data.minimum,
              max_duration: result.data.maximum,
            } 
            setDuration(tempduration);
            setLoading(false);
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
             
              <AgentList agents={Agents} parentCallback={agentListCallback}/>
            </div>
            <div className="FilteredCalls__duration">
              <div className="FilteredCalls__criteria-title">
                Select duration
              </div>
              <DurationRange minDuration = {duration.min_duration} maxDuration = {duration.max_duration} parentCallback={DurationRangeCallback}/>
            </div>
          </div>
          <div className="FilteredCalls__actions">
            <Button type="primary" onClick={getFilteredCalls}>
              Get Filtered Calls
            </Button>
          </div>
          
        </div>
       
        {
          filtered_list && (
              <FilteredDataList columns={[
                {
                  title: 'Name',
                  dataIndex: 'agent_id',
                  filters: [],
                  onFilter: (value, record) => record.agent_id.indexOf(value) === 0,
                  sorter: (a, b) => b.agent_id.length - a.agent_id.length,
                  sortDirections: ['descend'],
                },
                {
                  title: 'Call ID',
                  dataIndex: 'call_id',
                  filters: [],
                  // specify the condition of filtering result
                  // here is that finding the name started with `value`
                  onFilter: (value, record) => record.call_id.indexOf(value) === 0,
                  sorter: (a, b) => b.call_id - a.call_id,
                  sortDirections: ['descend'],
                },
                {
                  title: 'Call Time',
                  dataIndex: 'call_time',
                  filters: [],
                  // specify the condition of filtering result
                  // here is that finding the name started with `value`
                  onFilter: (value, record) => record.call_time.indexOf(value) === 0,
                  sorter: (a, b) => b.call_time - a.call_time,
                  sortDirections: ['descend'],
                }
              ]} data={filtered_list}/>
            )
        }
        </div>
      </div>
  );
      }
}

FilterComponent.propTypes = {};

export default memo(FilterComponent);

/**
 *
 * AgentList
 *
 */

import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Select } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const { Option } = Select;

function createOptions(agents) {
  const  Agents  = Array.from(agents);
  return Agents.map(agent => {
    return {
      key: agent,
      text: agent,
      value: agent
    };
  });
}

function onAgentSelection(data) {
  console.log(value);
    console.log(typeof value);
}


const AgentList = props => {
  
  const [agents, setAgents] = useState(Array.from(props.agents));
  
  const [selectedAgents, setSelectedAgents] = useState([]);
  // console.log(agents);
  return (
     <div>
       
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Select Agents"
        defaultValue={[]}
        onChange={(data)=>{setSelectedAgents(data);
          props.parentCallback(data)}} >
          {agents && (agents.map(agent => {
            return <Option key={agent}>{agent}</Option>
          }))}
      </Select>
    </div>
  )
}

AgentList.propTypes = {};

export default AgentList;

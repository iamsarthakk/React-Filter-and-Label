/**
 *
 * AgentList
 *
 */

import React, {useEffect, useState} from 'react';

import { Select } from 'antd';

const { Option } = Select;


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

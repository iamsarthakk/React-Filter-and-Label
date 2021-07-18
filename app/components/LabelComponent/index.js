/**
 *
 * LabelComponent
 *
 */

import React, { memo, useState } from 'react';

import Home from '../../containers/Home';
import './index.css';

import LabelledCallList from '../LabelledCallList'

function LabelComponent() {

  const [callList, setCallList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  const labelChangeCallback = (call_id, labels) => {
    console.log(call_id);
    console.log(labels);
    var call_List = [call_id];
    
    if (labels) {
      let old_labels = callList[call_id].label_id;
      let new_labels = labels.filter(elem => {
        return old_labels.indexOf(elem) == -1;
      });
      let removed_labels = old_labels.filter(elem => {
        return labels.indexOf(elem) == -1;
      });
      new_labels = new_labels.map(elem => {
        return { "name": elem, "op": "add"}
      });
      removed_labels = removed_labels.map(elem => {
        return { "name": elem, "op": "remove" }
      })
      let combined_op = new_labels.concat(removed_labels);
     
      let call_obj = {
        "operation": {
          "callList": call_List,
          "label_ops": combined_op
        }
      };

      applyLabels(call_obj);
    }
  };

  function getCallList() {
    var headers = {
      'user_id': '24b456'
    }
    fetch("https://damp-garden-93707.herokuapp.com/getcalllist", {
        'method': 'GET',
        'Content-Type': 'application/json',
        'headers': headers

      })
      .then(res => res.json())
      .then(
        (result) => {
          setCallList(result.data.call_data);
          
        }
      )
  }

  function getLabelList() {
    var headers = {
      'user_id': '24b456'
    }
    fetch("https://damp-garden-93707.herokuapp.com/getlistoflabels", {
        'method': 'GET',
        'Content-Type': 'application/json',
        'headers': headers
      })
      .then(res => res.json())
      .then(
        (result) => {
          setLabelList(result.data.unique_label_list);
        }
      );
      
  }


  function applyLabels(call_obj) {
    var headers = {
      'user_id': '24b456'
    }
    
    console.log(JSON.stringify(call_obj));
   
    console.log(call_obj);
    fetch("https://damp-garden-93707.herokuapp.com/applyLabels", {
        'Content-Type': 'application/json',
        'headers': headers,
        'method': 'POST',
    
        body: JSON.stringify(call_obj)
      })
      .then(res => res.json())
      .then(
        (result) => {
          setLabelList(result.data);
          console.log(result)
        }
      )
  }

  if(isLoading){
    getCallList();
    getLabelList();
    setLoading(false);
    return(<div>
      <Home/>
      <h1>Data is Loading...</h1>
    </div>);
  }
  
  else{
    // console.log(callList);
    return (
    
      <div>
        
        <Home/>
        <div className="" style={{ marginTop: "2rem"}}>
          <div className="">
            <div className="">
              <h1 className="">Part 2 - Label Calls</h1>
                
            </div>
          </div>
          <LabelledCallList callList={callList} labelList={labelList} parentCallback={labelChangeCallback}/>
        </div>
      </div>
    );
  }
}

LabelComponent.propTypes = {};

export default memo(LabelComponent);

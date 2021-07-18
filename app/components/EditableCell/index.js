/**
 *
 * EditableCell
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Table, Form, Input, InputNumber, Popconfirm, Select} from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const { Option } = Select;
const EditableContext = React.createContext();

const EditableCell = props =>{
  function handleChange(call_id, e) {
      console.log(e);
      // console.log(index);
      // console.log(abc);
      console.log(call_id);
      // console.log(`selected ${value}`);
    }
  
    const getInput = (call_id) => {
      if (props.inputType === 'number') {
        return <InputNumber />;
      } else if (this.props.inputType === 'label') {
        let label_list = this.props.label_list;
        return (<Select mode="tags" 
                        style={{ width: '100%' }} 
                        placeholder="Labels"
                        onChange={(e) => handleChange(call_id, e)}>
                  {(labelList &&
                    labelList.map(label => {
                      return <Option key={label}>{label}</Option>
                    })
                  )}    
                </Select>)
      }
      return <Input />;
    };
  
    const renderCell = ({ getFieldDecorator }) => {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        label_list,
        ...restProps
      } = props;
  
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item style={{ margin: 0 }} labelList={labelList}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
                labelList: labelList
              })(getInput(record.call_id))}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
  
  
      return (<EditableContext.Consumer>{renderCell}</EditableContext.Consumer>);
    
}

EditableCell.propTypes = {};

export default memo(Form.create()(EditableCell));

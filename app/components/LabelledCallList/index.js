/**
 *
 * LabelledCallList
 *
 */

import { Table, Form, Input, InputNumber, Popconfirm, Select} from 'antd';

import React, { memo, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
// import EditableCell from '../EditableCell';

const { Option } = Select;
const EditableContext = React.createContext();



const LabelledCallList = props=> {

  const [editingKey, setEditingKey] = useState('');
  const isEditing = record => record.call_id === editingKey;
  const labelList = [];
  const EditableCell = (props) =>{
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
      } else if (props.inputType === 'label') {
        let labelList = props.labelList;
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
            <Form.Item style={{ margin: 0 }} labelList={props.labelList}>
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

  const cancel = () => {
    setEditingKey('');
  };
  
  function save(form, call_id) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log(call_id, row)
      props.parentCallback(call_id, row.label_id);
      // setEditingKey('');
      window.location.reload();
    });
  }
  
  function edit(call_id) {
    setEditingKey(call_id);
  }
  
  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: 'Call ID',
      dataIndex: 'call_id',
      width: '25%',
      editable: false,
    },
    {
      title: 'Labels',
      dataIndex: 'label_id',
      width: '50%',
      editable: true,
      labelList: props.labelList
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      render: (text, record) => {
       
        const { editingKey } = {editingKey};
        const editable = isEditing(record);
        console.log(record)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  href="javascript:;"
                  onClick={() => save(form, record.call_id)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.call_id)}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey == ''} onClick={() => edit(record.call_id)}>
            Edit
          </a>
        );
      },
    },
  ];

  const cols = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'label_id' ? 'label' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        labelList: col.labelList
      }),
    };
  });

  
  return (
    <EditableContext.Provider value={props.form}>
      <Table
        rowKey={record => record.call_id}
        components={components}
        bordered
        dataSource={props.callList}
        columns={cols}
      
        pagination={{
          onChange: cancel,
        }}
      />
    </EditableContext.Provider>
  );
}

LabelledCallList.propTypes = {};

export default memo(Form.create()(LabelledCallList));

/**
 *
 * FilteredDataList
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Table } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

const FilteredDataList = props=> {
  return (
    <div>
       <Table rowKey={record => record.call_id} columns={props.columns} dataSource={props.data} onChange={onChange} />
    </div>
  );
}

FilteredDataList.propTypes = {};

export default memo(FilteredDataList);

/**
 *
 * DurationRange
 *
 */

import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { InputNumber } from 'antd';


const DurationRange = props => {
  const [minimumDuration, setminimumDuration] = useState(props.minDuration);
  const [maximumDuration, setmaximumDuration] = useState(props.maxDuration);

  return (
    <div> 
				<InputNumber min={0} max={props.maxDuration ?props.maxDuration - 1 : 10} defaultValue={0} onChange={(value)=>{ setmaximumDuration(value); props.parentCallback([minimumDuration, value]);}} />
				&nbsp;
				<InputNumber min={props.minDuration ? props.minDuration + 1 : 0} defaultValue={10} onChange={(value)=>{ setminimumDuration(value); props.parentCallback([value, maximumDuration]);}} />
		</div>
  );
}

DurationRange.propTypes = {};

export default DurationRange;

/**
 *
 * LabelComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Home from '../../containers/Home';

function LabelComponent() {
  return (
    <div>
      <Home/>
      This works
    </div>
  );
}

LabelComponent.propTypes = {};

export default memo(LabelComponent);

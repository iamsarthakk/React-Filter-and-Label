/**
 *
 * DurationRange
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function DurationRange() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DurationRange.propTypes = {};

export default DurationRange;

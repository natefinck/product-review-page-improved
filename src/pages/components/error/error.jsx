/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

function Error({ message }) {
  return (
    <div className="errorContainer">
      { message }
    </div>
  );
}

export default Error;
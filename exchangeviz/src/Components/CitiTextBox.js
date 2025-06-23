import React from 'react';

function CitiTextBox() {
  return (
    <div className="citi-textbox-container">
      <div className="citi-input-group">
        <label htmlFor="volume">Volume</label>
        <input id="volume" type="text" className="citi-input" />
      </div>
      <div className="citi-input-group">
        <label htmlFor="price">Price</label>
        <input id="price" type="text" className="citi-input" />
      </div>
      <div className="citi-input-group">
        <label htmlFor="time">Time</label>
        <input id="time" type="text" className="citi-input" />
      </div>
    </div>
  );
}

export default CitiTextBox;
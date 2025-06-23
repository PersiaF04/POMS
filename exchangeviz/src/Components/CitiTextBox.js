:root {React from 'react';
  --citi-blue: #0033A0;       /* Primary deep blue */
  --citi-dark-blue: #002060;  /* Additional dark blue accent */
  --citi-red: #C8102E;        /* Red accent */
  --citi-light-blue: #e6f2ff;  /* Light accent complement */
  --citi-dark-gray: #333333;  /* For readable text */
  --citi-white: #ffffff;volume">Volume</label>
}       <input id="volume" type="text" className="citi-input" />
      </div>
body {<div className="citi-input-group">
  background-color: var(--citi-dark-blue);l>
  color: var(--citi-white);ype="text" className="citi-input" />
  margin: 0;
  font-family: sans-serif;-input-group">
}       <label htmlFor="time">Time</label>
        <input id="time" type="text" className="citi-input" />
/* Main layout: 3 columns arranged in a row */
.main-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem;itiTextBox;}/* Side columns (left and right) */.side-column {  flex: 0 0 300px;  display: flex;  flex-direction: column;  gap: 2rem;}/* Center column for the main container */.center-column {  flex: 1;  display: flex;  justify-content: center;  padding: 0 2rem;}/* Main central container styling */.citi-container {  background-color: var(--citi-light-blue);  border: 2px solid var(--citi-blue);  padding: 2rem;  border-radius: 8px;  text-align: center;  max-width: 800px;}/* Header and lead text styling */.citi-header {  font-size: 2.5rem;  font-weight: bold;  color: var(--citi-dark-blue);  margin-bottom: 1rem;}.citi-lead {  font-size: 1.25rem;  color: var(--citi-dark-gray);}/* Button styles with spacing */.citi-button {  background-color: var(--citi-red);  color: var(--citi-white);  border: none;  padding: 0.75rem 1.5rem;  border-radius: 4px;  font-size: 1rem;  cursor: pointer;  transition: background-color 0.2s ease-in-out;  margin: 0.5rem;}.citi-button:hover {  background-color: var(--citi-blue);}/* Table styles */.citi-table {  width: 100%;  background-color: var(--citi-white);  border-collapse: collapse;  margin-top: 1rem;}.citi-table th,.citi-table td {  border: 1px solid var(--citi-blue);  padding: 0.75rem;  text-align: center;}.citi-table th {  background-color: var(--citi-blue);  color: var(--citi-white);}/* Common side wrapper styling for side tables */.side-wrapper {  background-color: var(--citi-white);  border: 2px solid var(--citi-blue);  border-radius: 8px;  padding: 1rem;}/* Side table titles now in Citi dark blue */.side-title {  color: var(--citi-dark-blue);  margin-bottom: 1rem;  text-align: center;}

.citi-textbox-container {
  background-color: var(--citi-light-blue);
  border: 2px solid var(--citi-blue);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.citi-input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.citi-input-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--citi-dark-blue);
}

.citi-input {
  padding: 0.5rem;
  border: 1px solid var(--citi-blue);
  border-radius: 4px;
}
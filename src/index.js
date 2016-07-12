import React from 'react';
import ReactDOM from 'react-dom';
import Hollywood from './components/Hollywood';

const pics = [...Array(9).keys()].map(x => `_resources/pic${x + 1}.jpg`);
const audio = "_resources/theme.mp3";

ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, document.getElementById('container'));

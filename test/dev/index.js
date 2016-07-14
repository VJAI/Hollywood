import React from 'react';
import ReactDOM from 'react-dom';
import Hollywood from '../../src/components/Hollywood';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

const pics = [...Array(9).keys()].map(x => `resources/pic${x + 1}.jpg`);
const audio = "resources/theme.mp3";

ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, mountNode);

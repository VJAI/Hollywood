'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Hollywood = require('./hollywood')

const pics = [...Array(9).keys()].map(x => `assets/pic${x + 1}.jpg`);
const audio = "assets/theme.mp3";

ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, document.getElementById('container'));
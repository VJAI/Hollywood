'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let Hollywood = require('./hollywood')

let pics = [...Array(9).keys()].map(x => `assets/pic${x + 1}.jpg`);
let audio= "assets/theme.mp3";

ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, document.getElementById('container'));
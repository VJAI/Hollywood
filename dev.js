import Hollywood from './hollywood';

const pics = [...Array(8).keys()].map(x => `http://prideparrot.com/demos/hollywood/assets/pic${x + 1}.jpg`);
const audio = "http://prideparrot.com/demos/hollywood/assets/theme.mp3";

Hollywood({images: pics, audio: audio});

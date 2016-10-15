import Hollywood from './hollywood';

const pics = [...Array(8).keys()].map(x => `rez/pic${x + 1}.jpg`);
const audio = "rez/audio.mp3";

Hollywood({images: pics, audio: audio})
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));

import './hollywood.scss';

const [W, D, B, P] = [window, document, document.body, Promise];

let state,      // current state
  images,       // array of image urls
  audio,        // audio url
  player,       // HTML5 Audio object
  loading,      // built-in loading required or not?
  loadingBar,   // loading-bar element
  music,        // music element
  bars = [],    // array of bars elements
  stay,         // stay duration
  transit,      // transit duration
  woods,        // main hollywood element
  odd,          // image element
  even,         // image element
  current,      // current active image
  previous,     // previous active image
  active,       // active image element
  inactive,     // inactive image element
  AR,           // window aspect ratio
  iterator,     // circular array iterator
  interval,     // interval id
  gloom,        // lowest opacity
  glow;         // highest opacity

// On window resize reset the dimensions of images
const resize = () => {
  AR = window.innerWidth / window.innerHeight;
  odd.className = even.className = '';
  active && active.classList.add(AR > current.AR ? 'w100' : 'h100');
  inactive && inactive.classList.add(AR > previous.AR ? 'w100' : 'h100');
};

// Function that change the image periodically
const move = () => {
  previous = current;
  current = iterator.next();
  inactive = active;
  active = active === even ? odd : even;
  
  active.src = current.src;
  active.style.opacity = glow;
  active.className = '';
  active.classList.add(AR > current.AR ? 'w100' : 'h100');
  inactive && (inactive.style.opacity = gloom);
};

// Hollywood initialization function.
const Hollywood = (options) => {
  if (state === 'ON') return;
  state = 'ON';
  AR = window.innerWidth / window.innerHeight;
  gloom = 0;
  glow = 0.5;
  
  ({images, audio, loading, stay, transit} = {...{stay: 10, transit: 3, loading: true}, ...options});
  [woods, odd, even] = ['div', 'img', 'img'].map(e => D.createElement(e));
  B.classList.add('hollywood-on');
  woods.classList.add('hollywood');
  [odd, even].forEach(img => {
    woods.appendChild(img);
    img.style.transition = `opacity ${transit}s ease-in`;
  });
  B.appendChild(woods);
  
  if (loading) {
    loadingBar = D.createElement('div');
    loadingBar.classList.add('hollywood-loading');
    B.appendChild(loadingBar);
  }
  
  if (audio) {
    player = new Audio();
    player.loop = true;
    
    music = D.createElement('div');
    music.classList.add('hollywood-bars', 'hollywood-hidden');
    [...Array(5)].forEach(i => {
      let bar = D.createElement('div');
      bar.classList.add('hollywood-bars-bar', 'dancing-bars');
      bars.push(bar);
      music.appendChild(bar);
    });
    B.appendChild(music);
    
    music.addEventListener('click', Hollywood.mute, false);
  }
  
  W.addEventListener('resize', resize, false);
  
  return new P((resolve, reject) => {
    Preload(images, audio, player)
      .then((result) => {
        iterator = Circular(result[0]);
        
        if (player) {
          player.play();
          music.classList.remove('hollywood-hidden');
        }
        
        loading && loadingBar.classList.add('hollywood-hidden')
        
        move();
        state = 'ON';
        interval = W.setInterval(move, stay * 1000);
        resolve('Hollywood is ON!');
      })
      .catch((err) => {
        loading && loadingBar.classList.add('hollywood-hidden')
        reject(`Sorry, can't able to load all resources. ${err}`);
      });
  });
};

Hollywood.mute = () => {
  if (state === 'OFF' || !player) return;
  player.muted = !player.muted;
  bars.map(bar => bar.classList[player.muted ? 'remove' : 'add']('dancing-bars'));
};

Hollywood.destroy = function () {
  if (state === 'OFF') return;
  state = 'OFF';
  
  clearInterval(interval);
  W.removeEventListener('resize', resize, false);
  
  if (player) {
    player.pause();
    player = null;
  }
  
  [woods, music, loadingBar].forEach(x => x && B.removeChild(x));
};

// A simple image and audio pre-loader.
const Preload = (images, audio, player) => {
  const promises = [];
  
  promises.push(P.all(images.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image;
      img.addEventListener('load', () => resolve({src: img.src, AR: img.width / img.height}));
      img.addEventListener('error', reject);
      img.src = image;
    });
  })));
  
  if (audio) {
    promises.push(new P((resolve, reject) => {
      const onCanPlayThrough = () => {
        player.removeEventListener('canplaythrough', onCanPlayThrough);
        resolve();
      };
      player.addEventListener('canplaythrough', onCanPlayThrough);
      player.addEventListener('error', reject);
      player.src = audio;
    }));
  }
  
  return P.all(promises);
};

// A custom iterator that iterates arrays in a circular fashion.
const Circular = (arr) => {
  let current = -1;
  
  return {
    next() {
      current = current >= arr.length - 1 ? 0 : current + 1;
      return arr[current];
    }
  };
};

export default Hollywood;

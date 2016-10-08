import './hollywood.scss';

const [W, D, B, P] = [window, document, document.body, Promise];

let state = 'OFF';

const Hollywood = (options) => {
  if (state !== 'OFF') return;
  
  const {images, audio, loading, stay, transit} = {...{stay: 10, transit: 3, loading: true}, ...options};
  const [woods, odd, even] = ['div', 'img', 'img'].map(e => D.createElement(e));
  
  B.classList.add('hollywood-on');
  woods.classList.add('hollywood');
  [odd, even].forEach(img => {
    woods.appendChild(img);
    img.style.transition = `opacity ${transit}s ease-in`;
  });
  B.appendChild(woods);
  
  let loadingBar, music, bars = [];
  
  if (loading) {
    loadingBar = D.createElement('div');
    loadingBar.classList.add('hollywood-loading');
    B.appendChild(loadingBar);
  }
  
  if (audio) {
    music = D.createElement('div');
    music.classList.add('hollywood-bars', 'hollywood-hidden');
    [...Array(5)].forEach(i => {
      let bar = D.createElement('div');
      bars.push(bar);
      music.appendChild(bar);
    });
    B.appendChild(music);
    
    Hollywood.mute = () => {
      if (state !== 'ON') return;
      let paused;
      (paused = player.paused) ? player.play() : player.pause();
      bars.map(bar => bar.style.animationPlayState = paused ? 'running' : 'paused');
    };
    
    music.addEventListener('click', Hollywood.mute, false);
  }
  
  let current, previous, active, inactive, AR = window.innerWidth / window.innerHeight, iterator, player, interval, gloom = 0, glow = 0.5;
  
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
  
  const resize = () => {
    AR = window.innerWidth / window.innerHeight;
    odd.className = even.className = '';
    active && active.classList.add(AR > current.AR ? 'w100' : 'h100');
    inactive && inactive.classList.add(AR > previous.AR ? 'w100' : 'h100');
  };
  
  W.addEventListener('resize', resize, false);
  
  Hollywood.destroy = function () {
    state = 'OFF';
    
    W.removeEventListener('resize', resize, false);
    
    if (player) {
      player.pause();
      player.src = null;
    }
    
    [woods, music, loadingBar].forEach(x => x && B.removeChild(x));
  };
  
  return new P((resolve, reject) => {
    Preload(images, audio).then((result) => {
      const imgs = result[0].map(i => {
        return {src: i.src, AR: i.width / i.height}
      });
      
      iterator = Circular(imgs);
      
      if (result[1]) {
        player = result[1];
        player.loop = true;
        player.play();
        music.classList.remove('hollywood-hidden');
      }
      
      loading && loadingBar.classList.add('hollywood-hidden');
      
      move();
      state = 'ON';
      interval = W.setInterval(move, stay * 1000);
      resolve('Hollywood is ON!');
    }).catch((err) => {
      reject(`Sorry, can't able to load all resources. ${err}`);
    });
  });
};

const Preload = (images, audio) => {
  const promises = [];
  
  promises.push(P.all(images.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image;
      img.onload = () => resolve(img);
      img.onerror = img.onabort = () => reject;
      img.src = image;
    });
  })));
  
  if (audio) {
    promises.push(new P((resolve, reject) => {
      const aud = new Audio;
      aud.oncanplaythrough = () => resolve(aud);
      aud.onerror = aud.onabort = (e) => reject;
      aud.src = audio;
    }));
  }
  
  return P.all(promises);
};

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

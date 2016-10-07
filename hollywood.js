import './hollywood.scss';

const [W, D, B, P] = [window, document, document.body, Promise];

const Hollywood = (options) => {
  const {images, audio, stay, transit} = {...options, ...{ stay: 10, transit: 3 }};
  const [woods, odd, even, bars, loading, dancingBars = []] = ['div', 'img', 'img', 'div', 'div'].map(e => D.createElement(e));
  
  B.classList.add('hollywood-on');
  woods.classList.add('hollywood');
  bars.classList.add('hollywood-bars', 'hollywood-hidden');
  loading.classList.add('hollywood-loading');
  [odd, even].map(x => {
    woods.appendChild(x);
    x.style.transition = `opacity ${transit}s ease-in`;
  });
  [...Array(5)].map(i => {
    let bar = D.createElement('div');
    dancingBars.push(bar);
    bars.appendChild(bar);
  });
  B.appendChild(woods);
  B.appendChild(bars);
  B.appendChild(loading);
  
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
  
  Hollywood.mute = () => {
    let paused;
    (paused = player.paused) ? player.play() : player.pause();
    dancingBars.map(bar => bar.style.animationPlayState = paused ? 'running' : 'paused');
  };
  
  bars.addEventListener('click', Hollywood.mute, false);
  
  W.addEventListener('resize', () => {
    AR = window.innerWidth / window.innerHeight;
    odd.className = even.className = '';
    active && active.classList.add(AR > current.AR ? 'w100' : 'h100');
    inactive && inactive.classList.add(AR > previous.AR ? 'w100' : 'h100');
  }, false);
  
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
      }
    
      move();
      interval = W.setInterval(move, stay * 1000);
      bars.classList.remove('hollywood-hidden');
      loading.classList.add('hollywood-hidden');
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

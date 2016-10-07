import './hollywood.scss';

const Hollywood = (options) => {
  const [W, D, B, H] = [window, document, document.body, Hollywood];
  const {images, audio, stay, transit} = {...options, ...{ stay: 10, transit: 3 }};
  const [woods, odd, even, bars, dancingBars = []] = ['div', 'img', 'img', 'div'].map(e => D.createElement(e));
  
  B.classList.add('hollywood-on');
  woods.classList.add('hollywood');
  bars.classList.add('bars');
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
  
  let current, previous, active, inactive, AR = window.innerWidth / window.innerHeight, iterator, player, interval, gloom = 0, glow = 0.5;
  
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
  }).catch((err) => alert(`Can't able to preload all resources. ${err}`));
  
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
  
  H.mute = () => {
    let paused;
    (paused = player.paused) ? player.play() : player.pause();
    dancingBars.map(bar => bar.style.animationPlayState = paused ? 'running' : 'paused');
  };
  
  bars.addEventListener('click', H.mute, false);
  
  W.addEventListener('resize', () => {
    AR = window.innerWidth / window.innerHeight;
    odd.className = even.className = '';
    active && active.classList.add(AR > current.AR ? 'w100' : 'h100');
    inactive && inactive.classList.add(AR > previous.AR ? 'w100' : 'h100');
  }, false);
};

const Preload = (images, audio) => {
  const [P, promises] = [Promise, []];
  
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

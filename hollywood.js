import './hollywood.scss';

const Hollywood = (options) => {
  const [W, D, B, H] = [window, document, document.body, Hollywood];
  const {images, audio, stay, duration} = {...options, ...{ stay: 10, transit: 3 }};
  const [woods, even, odd] = ['div', 'img', 'img'].map(e => D.createElement(e));

  B.classList.add('hollywood-on');
  woods.classList.add('hollywood');
  woods.appendChild(even);
  woods.appendChild(odd);
  B.appendChild(woods);
  
  let previous, current, active, AR = window.innerWidth / window.innerHeight, iterator, player, interval, gloom = 0, glow = 0.5;
  
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
    active = active === 'odd' ? 'even' : 'odd';
    
    const picClass = AR > current.AR ? 'w100' : 'h100',
      fadeOutProps = {opacity: gloom, src: previous && previous.src},
      fadeInProps = {opacity: glow, src: current.src},
      evenProps = active && (active === 'even' ? fadeOutProps : fadeInProps),
      oddProps = active === 'odd' ? fadeOutProps : fadeInProps;
    
    even.classList.add(picClass);
    if(evenProps.src) even.src = evenProps.src;
    even.style.opacity = evenProps.opacity;
    
    odd.classList.add(picClass);
    if(oddProps.src) odd.src = oddProps.src;
    odd.style.opacity = oddProps.opacity;
  };
  
  const paint = () => {
    
    
  };
  
  H.mute = () => (player.paused ? player.play() : player.pause());
  
  W.addEventListener('resize', () => {
    AR = window.innerWidth / window.innerHeight;
    
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

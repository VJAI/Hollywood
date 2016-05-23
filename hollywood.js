'use strict';

let React = require('react');
let ReactDOM = require('react-dom');

// -- Utilities --
// A simple iterator that iterates an array in a circular fashion.
let Circular  = (arr) => {
  let current = -1;

  return {
    next: function() {
      current = current >= arr.length - 1 ? 0 : current + 1;
      return arr[current];
    }
  };
}

// -- Mixins --
// A mixin that preloads both images and audio resources.
let PreLoader = {

  loadImages: function(urls) {
    return Promise.all(urls.map(url => {
      return new Promise(function(resolve, reject) {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = img.onabort = () => reject(url);
        img.src = url;
      });
    }));
  },

  loadAudio: function(url) {
    return new Promise(function(resolve, reject) {
      let audio = new Audio();
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = audio.onabort = (e) => reject(url);
      audio.src = url;
    });
  }
};

// A mixin that helps easily to make the document go full-screen by
// hiding the complexity in handling different vendors.
let FullScreen = (function() {
  let d = document, dEl = document.documentElement,
      event = ['onfullscreenchange', 'onwebkitfullscreenchange', 'onmozfullscreenchange', 'onmsfullscreenchange'].find(x => d[x] !== undefined),
      prop = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].find(x => d[x] !== undefined);

  dEl.requestFullScreen = dEl.requestFullScreen || dEl.webkitRequestFullscreen || dEl.mozRequestFullScreen || dEl.msRequestFullscreen;
  d.exitFullscreen = d.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen;
  d.fullscreenEnabled = d.fullscreenEnabled || d.webkitFullscreenEnabled || d.mozFullScreenEnabled || d.msFullscreenEnabled;

  return {
    isFullScreenEnabled: d.fullscreenEnabled,

    goFullScreen: function() {
      dEl.requestFullScreen();
      return true;
    },

    exitFullScreen: function() {
      d.exitFullscreen();
      return false;
    },

    componentDidMount: function() {
      d[event] = () => this.onScreenChange && this.onScreenChange(d[prop] !== null);
    }
  };
})();

// -- Components --
// The Picture component
let Picture = React.createClass({

  propTypes: {
    src: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  render: function() {
    return <img {...this.props} />;
  }
});

// The main Carousel component.
let Hollywood = React.createClass({

  mixins: [PreLoader, FullScreen],

  propTypes: {
    pics: React.PropTypes.array.isRequired,     // image array
    audio: React.PropTypes.string,              // the audio url
    duration: React.PropTypes.number,           // duration to stay in a single image (milliseconds)
    transitionDuration: React.PropTypes.number, // animation duration (milliseconds)
    toolbar: React.PropTypes.bool,              // show/hide toolbar
    position: React.PropTypes.oneOf(['cover', 'contain'])
  },

  getDefaultProps: function () {
    return {
      duration: 8000,
      transitionDuration: 6000,
      toolbar: true,
      position: 'cover'
    };
  },

  getInitialState: function() {
    this.posClassMap = {
      'cover': { true: 'w100', false: 'h100 '},
      'contain': { true: 'h100', false: 'w100'}
    };

    return {
      previous: null,
      current: null,
      active: null,
      sound: true,
      fullScreen: false,
      ready: false,
      AR: null
    };
  },

  componentDidMount: function() {

    this.updateAR();
    window.addEventListener('resize', this.updateAR);

    // Preload the resources and then start the player and timer.
    this.loadImages(this.props.pics)
        .then((images) => {
          this.images = images.map(i => { return { src: i.src, AR: i.width / i.height } });
          this.iterator = Circular(this.images);
          return this.props.audio && this.loadAudio(this.props.audio);
        }, () => alert('Failed to load all images.'))
        .then((audio) => {
          if(this.props.pics.length) {
            if(audio) {
              this.player = audio;
              this.player.loop = true;
              this.player.play();
            }
            this.setState({ ready: true, current: this.iterator.next() });
            this.interval = setInterval(this.move, this.props.duration)
          }
        }, () => alert('Failed to load the audio.'));
  },

  componentWillUnmount: function() { 
    clearInterval(this.interval);
    window.removeEventListener('resize', this.updateAR);
  },

  updateAR: function() {
    let componentDOM = ReactDOM.findDOMNode(this);
    this.setState({ AR: componentDOM.clientWidth / componentDOM.clientHeight });
  },

  onScreenChange: function(isFullScreen) {
    this.setState({ fullScreen: isFullScreen });
  },

  move: function() {
    this.setState({
      previous: this.state.current,
      current: this.iterator.next(),
      active: this.state.active === 'odd' ? 'even' : 'odd'
    });
  },

  toggleSound: function() {
    this.state.sound ? this.player.pause() : this.player.play();
    this.setState({ sound: !this.state.sound });
  },

  toggleFullScreen: function() {
    this.setState({ fullScreen: this.state.fullScreen ? this.exitFullScreen() : this.goFullScreen() });
  },

  render: function() {
    if(!this.state.ready) {
      return <div className="hollywood">
               {
                 this.props.pics.length &&
                 [
                   <div key="loading" className="hollywood-loading" />,
                   <Picture key="odd" />,
                   <Picture key="even" />
                 ]
               }
             </div>;
    }

    let picClass = this.posClassMap[this.props.position][this.state.AR > this.state.current.AR],
        fadeOutProps =  { style : { opacity: 0 }, src: this.state.previous && this.state.previous.src },
        fadeInProps = { style: { opacity: 1 }, src: this.state.current.src },
        oddProps = this.state.active === 'odd' ? fadeOutProps : fadeInProps,
        evenProps = this.state.active && (this.state.active === 'even' ? fadeOutProps : fadeInProps);

    return <div className="hollywood">
              <Picture key="odd" className={picClass} {...oddProps}/>
              <Picture key="even" className={picClass} {...evenProps} />
              {
                this.props.toolbar &&
                <div className="hollywood-toolbar">
                  {this.props.audio &&
                  <span className={`hollywood-icon-sound-${this.state.sound}`} onClick={this.toggleSound}></span>}
                  {this.isFullScreenEnabled &&
                  <span className={`hollywood-icon-fullscreen-${this.state.fullScreen}`} onClick={this.toggleFullScreen}></span>}
                </div>
              }
           </div>;
  }
});

module.exports = Hollywood;
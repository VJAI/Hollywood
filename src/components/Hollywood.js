import React, {Component, PropTypes} from 'react';
import Circular from '../helpers/Circular';
import PreLoader from '../helpers/PreLoader';
import FullScreen from '../helpers/FullScreen';
import Picture from './Picture';
import Toolbar from './Toolbar';
import './Hollywood.scss';

export default class Hollywood extends Component {

  static propTypes = {
    pics: PropTypes.array.isRequired,
    audio: PropTypes.string,
    duration: PropTypes.number,
    transitionDuration: PropTypes.number,
    toolbar: PropTypes.bool,
    bgSize: PropTypes.oneOf(['cover', 'contain'])
  };

  static defaultProps = {
    duration: 10000,
    transitionDuration: 2000,
    toolbar: true,
    bgSize: 'cover'
  };

  posClassMap = {
    'cover': {true: 'w100', false: 'h100 '},
    'contain': {true: 'h100', false: 'w100'}
  };

  state = {
    previous: null,
    current: null,
    active: null,
    sound: true,
    fullScreen: false,
    ready: false,
    AR: null
  };

  constructor(props) {
    super(props);
    this.toggleSound = this.toggleSound.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.onScreenChange = this.onScreenChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.pics.length) return;

    this.updateAR();
    window.addEventListener('resize', this.updateAR.bind(this));

    // Preload the resources and then start the player and timer.
    Promise.all([PreLoader.loadImages(this.props.pics), PreLoader.loadAudio(this.props.audio)])
      .then((result) => {
        const images = result[0];
        this.images = images.map(i => {
          return {src: i.src, AR: i.width / i.height}
        });
        this.iterator = Circular(this.images);

        const audio = result[1];
        if (audio) {
          this.player = audio;
          this.player.loop = true;
          this.player.play();
        }

        FullScreen.subscribe(this.onScreenChange);
        this.setState({ready: true, current: this.iterator.next()});
        this.interval = setInterval(this.move.bind(this), this.props.duration);
      }, () => alert('Failed to load the resources.'));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('resize', this.updateAR);
    FullScreen.unsubscribe(this.onScreenChange);
  }

  updateAR() {
    this.setState({AR: window.innerWidth / window.innerHeight});
  }

  onScreenChange() {
    console.log(FullScreen.isFullScreen());
    this.setState({fullScreen: FullScreen.isFullScreen()});
  }

  move() {
    this.setState({
      previous: this.state.current,
      current: this.iterator.next(),
      active: this.state.active === 'odd' ? 'even' : 'odd'
    });
  }

  toggleSound() {
    this.state.sound ? this.player.pause() : this.player.play();
    this.setState({sound: !this.state.sound});
  }

  toggleFullScreen() {
    this.setState({fullScreen: this.state.fullScreen ? FullScreen.exitFullScreen() : FullScreen.goFullScreen()});
  }

  render() {
    if (!this.state.ready) {
      return <div className="hollywood">
        {
          this.props.pics.length &&
          [
            <div key="loading" className="loading"/>,
            <Picture key="odd"/>,
            <Picture key="even"/>
          ]
        }
      </div>;
    }

    const picClass = this.posClassMap[this.props.bgSize][this.state.AR > this.state.current.AR],
      fadeOutProps = {style: {opacity: 0}, src: this.state.previous && this.state.previous.src},
      fadeInProps = {style: {opacity: 0.3}, src: this.state.current.src},
      oddProps = this.state.active === 'odd' ? fadeOutProps : fadeInProps,
      evenProps = this.state.active && (this.state.active === 'even' ? fadeOutProps : fadeInProps);

    return <div className="hollywood">
      <Picture key="odd" className={picClass} {...oddProps}/>
      <Picture key="even" className={picClass} {...evenProps} />
      {
        this.props.toolbar &&
        <Toolbar isAudioAvailable={this.props.audio ? true : false}
                 isFullScreenEnabled={FullScreen.isFullScreenEnabled}
                 sound={this.state.sound}
                 fullScreen={this.state.fullScreen}
                 onAudioClick={this.toggleSound}
                 onFullScreenClick={this.toggleFullScreen} />
      }
    </div>;
  }
}

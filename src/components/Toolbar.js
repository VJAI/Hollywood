import React, {Component, PropTypes} from 'react';

export default class Toolbar extends Component {

  static propTypes = {
    isAudioAvailable: PropTypes.bool,
    isFullScreenEnabled: PropTypes.bool,
    sound: PropTypes.bool,
    fullScreen: PropTypes.bool,
    onAudioClick: PropTypes.func,
    onFullScreenClick: PropTypes.func
  };
  
  render() {
    return <div className="toolbar">
              {this.props.isAudioAvailable && <span className={`icon-sound-${this.props.sound}`} onClick={this.props.onAudioClick}></span>}
              {this.props.isFullScreenEnabled && <span className={`icon-fullscreen-${this.props.fullScreen}`} onClick={this.props.onFullScreenClick}></span>}
            </div>;
  }
}

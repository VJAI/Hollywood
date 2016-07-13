import React, {Component, PropTypes} from 'react';

export default class Picture extends Component {

  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object
  };

	render() {
		return <img {...this.props} />;
	}
}

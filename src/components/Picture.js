import React, {Component, PropTypes} from 'react';

export default class Picture extends Component {
	render() {
		return <img {...this.props} />;
	}
}

Picture.propTypes = {
	src: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	className: PropTypes.string,
	style: PropTypes.object
};

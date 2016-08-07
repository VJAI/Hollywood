// Helps easily to make the document go full-screen by hiding the complexity in
// handling different vendors.
export default  (() => {
	const d = document, dEl = document.documentElement,
		event = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'].find(x => d['on' + x] !== undefined),
		prop = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].find(x => d[x] !== undefined);

	dEl.requestFullScreen = dEl.requestFullScreen || dEl.webkitRequestFullscreen || dEl.mozRequestFullScreen || dEl.msRequestFullscreen;
	d.exitFullscreen = d.exitFullscreen || d.webkitExitFullscreen || d.mozCancelFullScreen || d.msExitFullscreen;
	d.fullscreenEnabled = d.fullscreenEnabled || d.webkitFullscreenEnabled || d.mozFullScreenEnabled || d.msFullscreenEnabled;

	return {
		isFullScreenEnabled: d.fullscreenEnabled,

		goFullScreen() {
			dEl.requestFullScreen();
			return true;
		},

		exitFullScreen() {
			d.exitFullscreen();
			return false;
		},

		subscribe(onScreenChange) {
      d.addEventListener(event, onScreenChange);
		},

    unsubscribe(onScreenChange) {
      d.removeEventListener(event, onScreenChange);
    },

    isFullScreen() {
      return d[prop] !== null;
    }
	};
})();

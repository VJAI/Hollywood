// Pre-loads images and audio resources.
export default {

	loadImages(urls) {
		return Promise.all(urls.map(url => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.onload = () => resolve(img);
				img.onerror = img.onabort = () => reject(url);
				img.src = url;
			});
		}));
	},

	loadAudio(url) {
		return new Promise((resolve, reject) => {
			if (!url) return resolve();
			const audio = new Audio();
			audio.oncanplaythrough = () => resolve(audio);
			audio.onerror = audio.onabort = (e) => reject(url);
			audio.src = url;
		});
	}
};

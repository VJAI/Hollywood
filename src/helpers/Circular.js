// A simple iterator that iterates an array in a circular fashion.
export default (arr) => {
	let current = -1;

	return {
		next() {
			current = current >= arr.length - 1 ? 0 : current + 1;
			return arr[current];
		}
	};
};

// A simple iterator that iterates an array in a circular fashion.
export default class Circular {

  constructor(arr) {
    this.arr = arr;
    this.current = -1;
  }

  next() {
    this.current = this.current >= this.arr.length - 1 ? 0 : this.current + 1;
    return this.arr[this.current];
  }
}

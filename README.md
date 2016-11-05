# Hollywood

Isn't it boring to always stare at the same background image of a website? Well, "Hollywood" is here to get rid of that boredom! It's a simple stand-alone library that periodically changes the background image of a website with a cool animation. It also can play a nice audio in the background to immerse the user into your website!

[Please check the DEMO](http://prideparrot.com/demos/hollywood/index.html)!

## Installation

Hollywood is not yet available in npm repository or bower, but you can install it through npm command by passing the git url as below,

```
npm install https://github.com/VJAI/Hollywood.git --save
```

or you can copy the files directly from the `dist` folder and include in your project.

## Usage

You can trigger the show by simply calling the `Hollywood` function passing an array of URLs of images and an audio optionally.

```javascript
Hollywood({ images: ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg'], audio: 'audio.mp3' });
```

Note, you don't have to worry about pre-loading the images and audio, Hollywood does itself. The `Hollywood` function returns a promise which is resolved once the resources are pre-loaded. It'll display a small loading icon at the bottom right while the resources are getting loaded. 

## Options

`images` - Array of image urls.

`audio` - Audio url.

`loading` - Boolean that specified whether to display the loading icon or not. As default it's `true`. If you want to display your own loading icon then you've to pass this option as `false` and you can resolve the promise returned by the `Hollywood` function to hide your loading icon.

`stay` - The duration of the stay of an image. The default value is 10 seconds.

`transit` - The transition duration between images. The default value is 3 seconds.

`volume` - The volume of the sound (0.0 - 1.0). The default value is 1.0.

`glow` - The max opacity of the image. The default value is 0.5.

## Methods

`Hollywood.mute()` - To mute the audio programatically.

`Hollywood.destroy()` - To destroy it.

## Supported Browsers

* Chrome
* Firefox
* Safari
* Edge
* IE11 and IE10

## Other Considerations

Hollywood uses fixed positioning and positioned at z-index of 1. You can flow your website content over it by wrapping the complete content in a container and setting it's position as `relative` and z-index to 2 or greater.

```html
.body-container {
  position: relative;
  z-index: 2;
}
```

## License

MIT

# Hollywood

An awesome component that changes the background image of a page with playing an audio built using ReactJS. Please check the [demo](http://prideparrot.com/demos/hollywood/index.html).

## A Simple Example

```javascript
const pics = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
const audio = "backgroundmusic.mp3";

ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, document.getElementById('container'));
```

## Practical Usage

You can use "Hollywood" for a website to periodically change it's background while the remaining content of the website can flow over it. Hollywood creates a &lt;div&gt; that uses fixed positioning. To flow the remaining content of the page over it you should wrap the remaining content in a &lt;div&gt; that should set to absolute positioning.

For ex.,

```html
<html>
  <head>
    <title>A sample website that uses Hollywood</title>
    
    <link href="hollywood.css" rel="stylesheet" />
    
    <!-- Your App Resources -->
    <style>
      .site-content {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <!-- Hollywood Container -->
    <div id="hollywood-container"></div>
    
    <!-- Your Complete Site Content -->
    <div class="site-content">
      <nav>
        <ul>
          <li>...</li>
        </ul>
      </na>
      
      <p>
      ...
      </p>
    </div>    
    
    <!-- React Libs and Hollywood -->
    <script src="https://npmcdn.com/react@latest/dist/react-with-addons.js"></script>
    <script src="https://npmcdn.com/react-dom@latest/dist/react-dom.js"></script>
    <script src="hollywood.js"></script>
    
    <!-- Rendering Hollywood in a container -->
    <script>
      const pics = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
      const audio = "backgroundmusic.mp3";
      
      ReactDOM.render(<Hollywood pics={pics} audio={audio}/>, document.getElementById('hollywood-container'));
    </script>
  </body>
</html>
```

Please check the *index.html* page under the *test/dev* folder for more help.

## NPM Commands

`npm install` - To install all the dependencies.

`npm start` - Run this command for development. Launches the component in browser and monitor for changes.

`npm build` - Create minified files for production. 


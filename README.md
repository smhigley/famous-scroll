#Famo.us Scroll
> Demo project for the Famo.us Hackathon

##Description
Scrolling through large sites can be a strain on the thumb muscles, so this project attempts to save your hand muscles by zooming out on a grid of images and content during scroll and zooming back in on scroll end. Still a work in progress, built during the Famo.us hackathon in San Francisco, May 21st 2014.

Demo: [http://smhigley.github.io/famous-scroll](http://smhigley.github.io/famous-scroll/)

####Future additions:
-   Add horizontal scrolling
-   Fix scroll start/end debounce issue
-   Add touch events
-   Set zoom level to be proportional to scroll acceleration

##Dependencies
It is actually quite simple really

First make sure you have node.js installed... without that nothing works!  You can either install it with your favorite package manager or with [the installer](http://nodejs.org/download) found on [nodejs.org](http://nodejs.org).

This project relies on grunt-cli, and bower to do all the heavy lifting for you

```
npm install -g grunt-cli bower
```

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

*This option is currently borked...*
You can also change the port livereload is running on with the option ```--livereload=8675309```
*... if you think you can fix it check out the [issue on github](https://github.com/Famous/generator-famous/issues/22)*

If you would like to have your server be accessible to other devices on your local machine use the option ```--hostname=0.0.0.0```

##Production

If you would like to compile your project for distribution simply run the command ```grunt``` to build ```dist/``` which will be a deployment ready version of your app.  Preprocessing will be applied to html, all js will be concatenated and minified.  All js / css assets will also have their name prepended with a hash for cache busting.

##Why are styles so strict?

While the default style guidelines are fairly strict, we are doing so with reason.  Famo.us is not only a framework for creating cutting edge web application, but a community project that we are all going to contribute to in the hopes of making the web better.  We truly believe that having consistent style within the community will make it easier for individuals to jump between different Famo.us modules without having to waste valuable time on processing style.

While our Package Manager (which is currently in development) will enforce our style guide if you would like to publish a module, feel free to disable eslint or jscs as you see fit.  If you want to disable linting you will need to comment out lines 18 - 19 in ```grunt/aliases.js```

## Contributing
All contributions are welcome! The simplest way to show your support for this project is to **"star" it**.

##License
ISC

## Release History
 * 2014-05-19   v0.1.0   Generated by the [Yeoman Generator](https://github.com/famous/generator-famous) for [Famo.us](http://famo.us)
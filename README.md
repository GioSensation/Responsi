# Responsi

Responsi makes responsive and retina-ready image management easy, lightweight and asynchronous.

## Advantages

- **Dead simple**: it's easy to use and the implementation is brutally simple
- **Imgs and bgs**: one solution for both `<img>` and css `background-image`
- **Art directing**: you can choose different files for different viewports, like in the `<picture>` element
- **Lightweight**: less than 1k minified, serve it gzipped and it's even better
- **Self contained**: no dependency whatsoever
- **Cross browser**: works everywhere, with an simple fallback even when js is disabled
- **Asynchronous**: you can load images after the `DOMContentLoaded` event, or even create responsi elements dynamically

## How do you use it

Did I say dead simple? Yep, dead simple indeed. This is your responsi element:

    <span class="responsi-img" data-responsi-large="large.jpg" data-responsi-medium="medium.jpg" data-responsi-small="small.jpg" data-responsi-alt="This is the alt test"></span>

You can use most elements as responsi elements, but you might want to use `span`s for images and `div`s for background elements for their respective `inline` and `block` nature.

Responsi tries to be rather forgiving in the declaration. If the `data-responsi-<size>` is not available, responsi will look for other sizes starting from the largest.

The `data-responsi-alt` always tries to come up with something. If you don't set it, responsi will take the document `<title>` tag. Please, note that even though this is good for SEO, it might be pretty bad for accessibility, so use it sparingly and always declare an alt attribute when you can. If you want to set an empty alt attribute (see [decorative images](http://en.wikipedia.org/wiki/Alt_attribute#Decorative_images "Decorative images and alt attributes on Wikipedia")), set `data-responsi-alt` to an empty string.

And here you fire the function: 

    document.addEventListener('DOMContentLoaded', function() {
    	responsi.init();
    }, false);

You can also pass a configuration object as a parameter to the `responsi.init()` function. You can figure out what you need to pass to achieve your goal by looking into the source code, it's pretty well commented. More on the default choice below. Here is the default configuration:

    defaultConfig = {
    	phones	: 480,
    	tabs	: 768,
    	laps	: 1200,
    	desks	: 1900
    };

And as an icing on the cake, you have these two helper properties that might come in handy:

    responsi.viewport // contains the viewport width, shorthand for window.document.documentElement.clientWidth
    responsi.dpi // contains the dpi, shorthand for window.devicePixelRatio (assumes 1 if devicePixelRatio is not supported)

### Fallback when JavaScript is disabled

You can very easily specify a fallback for the crazy nerd that browse the interwebs with almighty JavaScript disabled. Here is your solution:

    <span class="responsi-img" data-responsi-large="large.jpg" data-responsi-medium="medium.jpg" data-responsi-small="small.jpg" data-responsi-alt="This is the alt test">
    	<noscript><img src="large.jpg" alt="Some text" /></noscript>
    </span>

Fallbacks for `background-image` can be easily set via css.

## Default config: how did you decide the breakpoints?

A lot of thought has been put into coming up with the default config and after all this thought, I decided that no such amount of thought is really needed. Put simply, rspondi is not a silver bullet and it certainly isn't a precise solution. It's more of a catch-all solution. Easy as that.

We don't try to address every single possible combination of pixel quantity and density, because that's simply not possible, nor is desirable. Not only on the implementation side, but also on the image management size. I don't want to maintain [two-thousand-seven-hundred-fifty-two](http://www.oldielyrics.com/lyrics/rodriguez/heikkis_suburbia_bus_tour.html "2752 unscheduled stops") images in order to display only one to the user, nor do you.

The solution I adopted is a three-sizes-fit-all. Based on [this article](http://www.netvlies.nl/blog/design-interactie/retina-revolution "Retina revolution"), I assumed that highly compressed @2x images are smaller and perform better to the eye than mildly compressed full-size images. I am aware of the overhead this causes to the GPU when displaying this stuff, but then again, this is not a perfect world and we need to work with shitloads of constrains. For example, we don't even have a native way to display @2x images to @2x screens, we still have to double the size of the image and resize it manually.

So, we have small, medium and large. That's it. You then decide the size you need in your specific cases, which may vary greatly. Some images will be full-screen, other will be half of some wrap-container and so on. Again, refer to the source code for more information on the various breakpoints.

### So, you aren't into picture and srcset?

I tried, gee, I tried. The spec is simply crazy. Picture and srcset will certainly cover a lot more possibilities than responsi, but if I need the support of a NASA engineer to display an humble image to my user, something must be wrong.

Support is still highly insufficient, and the polyfill is immensely heavier than my humble responsi. Responsi addresses 90% of use cases with ease. Those who need more control, please go ahead and use other solutions.

Finally, Picture will certainly become my first choice when browser support get widespread and most importantly when browsers decide to support more advanced features such as image choice based on network quality and user preferences. This isn't yet implemented anywhere and it shouldn't even come too soon, as far as I know.

## Responsi on Bower!

Responsi can also be installed via [Bower](http://http://bower.io "A package manager for the web"). Search for `responsi.js`.

**Happy responsive coding!**

## MIT License

Copyright (c) 2015 Emanuele Feliziani

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
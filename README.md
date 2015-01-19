# Material Design Off Canvas Menu

This project was build using front end technologies, HTML5, CSS3, and JavaScript, to generate an off-canvas menu based on material design principles. It contains four main features:

1. Animated toggle button
2. Animated off canvas menu
3. Animated Menu Items
4. Touch/click ripple effect

[View the live demo here](http://callmenick.com/projects/material-off-canvas-menu/)

## 1 - Animated Toggle Button

The animated toggle button is a neat button created with pure CSS. It's a hamburger icon by default, and animates into an arrow (indicating a close button) when the menu is active/open.

## 2 - Animated Off Canvas Menu

The menu is initially hidden from view, and when the toggle switch is hit, it animates into view. It bumps the main content to the side, and also adds a mask over it. Clicking the mask or the toggle switch again closes the menu, animating it out of view.

## 3 - Animated Menu Items

While the menu slides into view, each item in the menu animates into view with a slight delay. This adds a little layer of neat animation to the menu.

## 4 - Touch/Click Ripple Effect

The touch/click ripple effect is an effect that creates a little animation, mimicking a ripple, expanding outwards from the point of contact with the user. This effect is mentioned and displayed quite a bit in the material design spec, and I replicated it with CSS and JavaScript.

## Support

This project makes use of a few modern techniques:

* Transitions, transforms, and animations
* Transition events
* The `classList` JavaScript method to add, remove, and check classes.

If you want full browser support, you're going to have to implement the necessary fallbacks and polyfills.

## Tests

This project was tested in the following browsers:

* Chrome 39
* Safari 8
* Firefox 34

Anyone else willing to run tests in other browsers, please let me know the results! Any issues, please file them accordingly.

## License

Licensed under the MIT license, http://www.opensource.org/licenses/mit-license.php

Copyright 2014, Call Me Nick

http://callmenick.com

## Live Demo

[View the live demo here](http://callmenick.com/projects/material-off-canvas-menu/).
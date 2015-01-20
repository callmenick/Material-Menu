/**
 * Material Menu
 *
 * The functionality for an off canvas menu, inspired by Google's material
 * design.
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Call Me Nick
 * http://callmenick.com
 */

(function( window ) {

  "use strict";

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // T R A N S I T I O N    E N D    E V E N T S
  // http://davidwalsh.name/css-animation-callback
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  function whichTransitionEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }
  var transitionEvent = whichTransitionEvent();

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // H E L P E R    F U N C T I O N S
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Helper function `getPosition`
   *
   * Get's the position based on event/element.
   */

  function getPosition(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft
        + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop
        + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy
    }
  }

  /**
   * Helper function `getOffsetRect`
   *
   * Get's the position based on event/element.
   */

  function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
     
    var body = document.body;
    var docElem = document.documentElement;
     
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
     
    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
     
    var top  = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
     
    return {
      x: Math.round(left),
      y: Math.round(top)
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //
  // M E N U    C O M P O N E N T
  //
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Menu
   *
   * Constructor function. Cache some vars and get ready for takeoff and menu
   * magic.
   */

  function Menu() {
    this.body = document.body;
    this.wrapper = document.querySelector("#wrapper");
    this.toggle = document.querySelector("#mm-menu-toggle");
    this.menu = document.querySelector("#mm-menu");
    this.menuItems = this.menu.querySelectorAll("li");
    this.menuItemLinks = this.menu.querySelectorAll("a");
    this.menuPosition = "off";
    this.mask = document.createElement("div");
    this.mask.className = "mm-menu-mask";
    document.body.appendChild(this.mask);
    this._init();
  }

  /**
   * Menu `_init`
   *
   * Initialise some stuff for the menu, like transition/animation delays and
   * all that funky jazz. Then get ready for events.
   */

  Menu.prototype._init = function() {
    this._initToggleEvents();
    this._initItemTransitions();
    this._initTouchEffect();
    this._initMaskEvents();
  };

  /**
   * Menu `_initEvents`
   *
   * Get ready for the events taking place. Mainly just the pressing of the
   * toggle button.
   */

  Menu.prototype._initToggleEvents = function() {
    var scope = this;
    this.toggle.addEventListener( "click", function() {
      (scope.menuPosition == "off") ? scope._toggleMenuOn() : scope._toggleMenuOff();
    });
  };

  /**
   * Menu `_toggleMenuOn`
   *
   * Toggles the menu into "on" position.
   */

  Menu.prototype._toggleMenuOn = function() {
    var scope = this;

    this.body.classList.add("mm-menu-open");
    this.wrapper.classList.add("mm-menu-open");
    this.toggle.classList.add("active");
    this.menu.classList.add("active");

    for ( var i = 0; i < scope.menuItems.length; i++ ) {
      var item = scope.menuItems[i];
      (function( item ) {
        item.classList.add("in-view");
      })( item );
    }

    this.mask.classList.add("active");
    this.menuPosition = "on";
  };

  /**
   * Menu `_toggleMenuOff`
   *
   * Toggles the menu into "off" position.
   */

  Menu.prototype._toggleMenuOff = function() {
    var scope = this;

    this.body.classList.remove("mm-menu-open");
    this.wrapper.classList.remove("mm-menu-open");
    this.toggle.classList.remove("active");
    this.menu.classList.remove("active");
    
    for ( var i = 0; i < scope.menuItems.length; i++ ) {
      var item = scope.menuItems[i];
      (function( item ) {
        item.classList.remove("in-view");
      })( item );
    }

    this.mask.classList.remove("active");
    this.menuPosition = "off";
  };

  /**
   * Menu `_initItemTransitions`
   *
   * Initialise the item transistions. Items transition into view as if they
   * are being pulled one by one, giving a neat effect. For this to take place,
   * we need to add a necessary class to each item menu. The classes are
   * named sequentially, and more can be added in the CSS.
   */

  Menu.prototype._initItemTransitions = function() {
    var scope = this;
    var len = this.menuItems.length;
    for ( var i = 0; i < len; i++ ) {
      var num = i+1;
      var menuItem = this.menuItems[i];
      this._itemTransitionHandler( menuItem, num );
    }
  };

  /**
   * Menu `_itemTransitionHandler`
   *
   * Handles the item transitions, appending the correct class onto each
   * element. Classes follow an "item-n" conventin, where n is the number of
   * the item in the list. See CSS, and add more in the CSS if you need.
   *
   * @param {HTMLElement} menuItem The menu item in question
   * @param {Number} num The number to append to the class name
   */

  Menu.prototype._itemTransitionHandler = function( menuItem, num ) {
    menuItem.classList.add("item-"+num);
  };

  /**
   * Menu `_initTouchEffect`
   *
   * Initialises and gets the touch effect ready for action. The touch effect
   * is a material design style that simulates some kind of pressure when a
   * user touches a link, and creates a rippling type effect spanning from the
   * touch point go outward.
   */

  Menu.prototype._initTouchEffect = function() {
    var num = this.menuItemLinks.length;
    for ( var i = 0; i < num; i++ ) {
      var menuItemLink = this.menuItemLinks[i];
      this._touchEffectHandler( menuItemLink );
    }
  };

  /**
   * Menu `_touchEffectHandler`
   *
   * Handler for the touch effect for each particular item in the menu. Does a
   * lot of math calculations to position the actual origin of the animation,
   * animating it outwards.
   *
   * @param {HTMLElement} menuItemLink The menu item link in question
   */

  Menu.prototype._touchEffectHandler = function( menuItemLink ) {
    var elWidth = menuItemLink.offsetWidth,
        elHeight = menuItemLink.offsetHeight,
        touchEffectSize = Math.max(elWidth, elHeight) * 2;
    
    var touchEffectElement = document.createElement("span");
    touchEffectElement.className = "mm-menu__link--touch-effect";
    touchEffectElement.style.width = touchEffectSize+"px";
    touchEffectElement.style.height = touchEffectSize+"px";
    menuItemLink.insertBefore( touchEffectElement, menuItemLink.firstChild );

    menuItemLink.addEventListener( "click", function(e) {
      var relX = getPosition(e).x - getOffsetRect(this).x,
          relY = getPosition(e).y - getOffsetRect(this).y;

      touchEffectElement.style.top = relY+"px";
      touchEffectElement.style.left = relX+"px";
      touchEffectElement.style.marginTop = -(touchEffectSize/2)+"px";
      touchEffectElement.style.marginLeft = -(touchEffectSize/2)+"px";
      touchEffectElement.classList.add("animating");
    });


    touchEffectElement.addEventListener( transitionEvent, function() {
      this.classList.remove("animating");
    });
  };

  /**
   *
   */

  Menu.prototype._initMaskEvents = function() {
    var scope = this;
    this.mask.addEventListener( "click", function(e) {
      e.preventDefault();
      (scope.menuPosition == "on") ? scope._toggleMenuOff() : false;
    });
  };

  /**
   * Add to global namespace.
   */

  window.Menu = Menu;

})( window );
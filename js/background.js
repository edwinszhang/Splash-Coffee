/**
 * Created by edwin on 03/11/2016.
 */
$(document).ready(function(){
  BindingBackgroundListeners(event);
  loadingImage(false, event);
});


// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - //

const IMAGE_REDIRECT_URL = "imageRedirectURL";
const LOAD_INTERVAL = "loadInterval";
const LAST_LOAD = "lastLoad";
const DEFAULT_INTERVAL = 10 * 60 * 1000; // 10 min
const FULLSCREEN_FLG = true; // 10 min

function BindingBackgroundListeners() {
    registerDownloadListener(event);
    registerTimeListener(event);
}

// Open a new tag to download background
function registerDownloadListener() {

    var imageData;
    $('#download').on('click', function () {
        imageData = $('#background').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        window.open(imageData);
    });
}
// Reload images
function registerTimeListener() {
	setInterval(function () {
        if (isRequireToReload()) {
            loadingImage(true, event);
        }
    }, 250);
}

// lazy load
function loadingImage(forceReload) {
    // find element
    var background = $('#background');

    // check if exists
    if (background.length > 0) {
        loadUnsplashImage(setBackground, forceReload);
    } else {
        // do nothing
    }

}

// set background
function setBackground(src) {
    $('#background').css("background-image", "url('"
        + src + "')").delay(500).fadeIn(1000);
    $('#overlay').delay(500).fadeIn(1000);
}

// loading unsplash images
function loadUnsplashImage(func, forceReload) {

    if (forceReload) {
        src = buildUnsplashURL();
    } else {
        // use cache one
        src = localStorage.getItem(IMAGE_REDIRECT_URL) || buildUnsplashURL();
    }

    loadingRedirectUrl(func, src);
}

function buildUnsplashURL() {
    // hack
    var src = 'https://source.unsplash.com/';
    var category = 'random/';
    var width = Math.floor(window.screen.width);   // returns width of browser viewport
    var height = Math.floor(window.screen.height);   // returns height of browser viewport
    src = src + category + width + "x" + height;
    return src;
}

function loadingRedirectUrl(callback, src) {
    var xmlhttp = new XMLHttpRequest();
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var useAjax = true;

    // get 302 src
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {

            if (xmlhttp.status == 200) {
                var redirect = xmlhttp.responseURL;
                localStorage.setItem(IMAGE_REDIRECT_URL, redirect);
                if (useAjax) {
                    callback(redirect);
                }
            } else {
                useAjax = false;
                callback('/img/default.jpg');
            }
        }

    };
    xmlhttp.open("GET", src, true);
    xmlhttp.send();
}


// Time functions
function getCurrentTime() {
	return new Date($.now());
}

function getLastLoadTime() {
	return new Date(localStorage.getItem(LAST_LOAD));
}

function setLastLoadTime(now) {
	localStorage.setItem(LAST_LOAD, now);
}

function isRequireToReload() {
	var interval = localStorage.getItem(LOAD_INTERVAL) || DEFAULT_INTERVAL;
	var lastLoad = getLastLoadTime();
	var now = getCurrentTime();

	if (lastLoad == null || now - lastLoad > interval) {
		setLastLoadTime(now)
		return true;
	} 
	return false;
}

// ## END Time functions ##

// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - - //

function createFullscreen() {
    clearFullscreenNotification();

    chrome.windows.create(
        {
            url: '/view/fullscreen.html',
            type: 'detached_panel',
            focused: true
        },
        function(breakWindow) {
            breakId = breakWindow.id;
            chrome.windows.update(breakWindow.id, {
                state: 'fullscreen'
            });
        }
    );
}

function clearFullscreenNotification(){
    
}

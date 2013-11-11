// @author Daniel Nakhla dnakhla@gmail.com


//vanilla js lightbox in OOP JS.
//right arrow left arrow functionality
//esc functionality
//transistions done in CSS3 (in real life id put fallbacks in)

var lb = (function(divID) {'use strict';
    var Lightbox = function(divID) {
        var container = document.getElementById(divID);
        if (container === undefined) {
            throw ('#' + divID + ' not found');
        }
        var box = createElement('div', 'box', 'hidden');
        var body = createElement('div', 'overlay');
        var self = this;

        var doc = document.getElementsByTagName('body')[0];
        this.ImageList = this.getImageList(container);
        this.box = box;
        this.body = body;
        this.lastImage = false;
        doc.appendChild(box);
        doc.appendChild(body);
        body.addEventListener('mousedown', this.toggleBoxes.bind(this));
        window.addEventListener('keydown', function(k) {
            if (k.keyCode == 27)
                self.toggleBoxes.call(self);
            if (k.keyCode == 39)
                self.toggleBoxes.call(self, self.ImageList[--self.lastImage], true);
            if (k.keyCode == 37)
                self.toggleBoxes.call(self, self.ImageList[++self.lastImage], true);
        });
    };

    function createElement(type, id, cssClass) {
        var newElement = document.createElement(type);
        if (!!id)
            newElement.id = id;
        if (!!cssClass)
            newElement.className = cssClass;
        return newElement;
    }

    Lightbox.prototype.toggleBoxes = function(picture, replace) {
        var createImage = function(picture) {
            var image = createElement('img', '');
            image.src = picture.src;
            var info = createElement('p');
            info.innerHTML = picture.alt;
            this.box.appendChild(image);
            this.box.appendChild(info);
        };
        if (this.body.className === 'faded' && picture === undefined) {
            this.body.className = undefined;
            this.box.className = 'hidden';
            this.box.innerHTML = '';
        } else if (!!picture && replace === undefined && this.body.className !== 'faded'  ) {
            this.body.className = 'faded';
            this.box.className = '';
            createImage.call(this, picture);
        } else if (!!picture && !!replace) {
            this.box.innerHTML = '';
            createImage.call(this, picture);
        }
    };

    Lightbox.prototype.getImageList = function(container) {
        var list = container.getElementsByTagName("img");
        var x, showBox, result, bodyClassName, self;
        self = this;
        result = [];
        showBox = function(picture) {
            this.toggleBoxes(picture);
        };
        for ( x = 0; x < list.length; x++) {
            list[x].addEventListener('mousedown', function(e) {
                e.preventDefault();
                self.lastImage = x;
                showBox.call(self, this);
            });
            result.push(list[x]);
        }
        return result;
    };
    return new Lightbox(divID);
});
//end of library, example of how you call it below

var lightBox = new lb('lightboxed');

(function () {
    var DEFAULT_COUNTER = 0,
        COUNTER_FONT_SIZE = 10,
        COUNTER_FONT = COUNTER_FONT_SIZE + ' px Helvetica',
        COUNTER_FONT_COLOR = '#FFFFFF',
        FIGURE_COLOR = '#000000',
        CIRCLE_RADIUS = 30;

    function Figure() {
        //
    }

    Figure.prototype = {
        clicked: function (x, y) {
            throw new TypeError("Method not implemented");
        },

        draw: function (ctx) {
            throw new TypeError("Method not implemented");
        }
    };

    function Circle(x, y) {
        this.counter = DEFAULT_COUNTER;
        this.radius = CIRCLE_RADIUS;
        this.x = x;
        this.y = y;
    }

    Circle.prototype = Object.create(Figure.prototype);
    Circle.prototype.clicked = function (x, y) {
        var distancesQuared = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);

        return distancesQuared <= this.radius * this.radius;
    };
    Circle.prototype.draw = function (ctx) {
        ctx.arc(this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            true);
    };

    //function Rectangle(){
    //
    //}
    //Rectangle.prototype = Object.create(Figure.prototype);

    function Model() {
        this.collection = [];

        this.add = function (object) {
            this.collection.push(object);
        }
    }

    function Game(Model, View) {
        this.model = Model;
        this.view = View;

        this.init();
    }

    Game.prototype.init = function () {
        var context = this;
        this.addFigures();
        this.callRender();
        this.view.canvas.addEventListener('click', function (e) {
            context.checkHit(e.clientX, e.clientY);
        });

    };
    Game.prototype.addFigures = function () {
        this.model.add(new Circle(60, 60));
        this.model.add(new Circle(160, 160));
    };
    Game.prototype.callRender = function () {
        this.view.render(this.model.collection);

    };
    Game.prototype.checkHit = function (x, y) {
        var elements = this.model.collection;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].clicked(x, y)) {
                elements[i].counter = elements[i].counter + 1;
                this.callRender();
            }
        }
    };

    function View(elementID) {
        this.canvas = document.getElementById(elementID);
        this.width = 500;
        this.height = 500;
        this.ctx = this.canvas.getContext('2d');
    }

    View.prototype.render = function (objects) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < objects.length; i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = FIGURE_COLOR;

            objects[i].draw(this.ctx);
            this.ctx.fill();

            this.ctx.fillStyle = COUNTER_FONT_COLOR;
            this.ctx.font = COUNTER_FONT;
            this.ctx.fillText(objects[i].counter,
                objects[i].x,
                objects[i].y);
        }
    };

    new Game(new Model(), new View('bubbles'));

})();

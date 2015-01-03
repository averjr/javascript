(function(){
    var game;

    window.onload = function() {
        game = new Game();    
        return;
    }
    
    function Game(){
       var  width = 500,
            height = 500,
            ctx,
            canvas,
            objects = [];

        this.init = function() {
            canvas = document.getElementById('bubbles');
			ctx = canvas.getContext('2d');

            objects.push(new Circle(60,60), new Circle(160, 160) );
            canvas.addEventListener('click', function(e){
                this.checkHit(e.clientX, e.clientY);
            }.bind(this));
            
            this.render();
        }

        this.render = function() {
          	ctx.clearRect(0, 0, width, height);
            for(var i=0; i<objects.length; i++ ) {
                ctx.beginPath();

        	    ctx.fillStyle = '#000';
        	    ctx.arc(objects[i].x,
                        objects[i].y,
                        objects[i].radius,
                        0,
                        Math.PI*2,
                        true);
    	    	ctx.fill();
    
        	    ctx.fillStyle = '#fff';
    		    ctx.font = 10 + 'px Helvetica';
            	ctx.fillText(objects[i].counter, 
                             objects[i].x,
                             objects[i].y);
            }
        }

        this.checkHit = function(cx, cy) {
            for(var i=0; i<objects.length; i++){
                var distancesquared = (objects[i].x - cx) * (objects[i].x - cx) + (objects[i].y - cy) * (objects[i].y - cy);

                if(distancesquared <= objects[i].radius * objects[i].radius) {
                    objects[i].counter = objects[i].counter + 1;
                 
                    this.render();
                }
            }
        }

        this.init();
    }
    
    function Circle(x,y){
        this.x = x;
        this.y = y;
        this.counter = 1;
        this.radius = 30;
    }
     
})();

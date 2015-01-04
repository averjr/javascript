(function(){
    var circles = {
        circles : [],
        add: function(circle){
            this.circles.push(circle);
        }
    };
   
    var game = {
         init: function() {
            circles.add(new Circle(60, 60));
            circles.add(new Circle(160, 160));
            view.init();
            view.render(circles.circles);           
         }, 

         checkHit:  function(cx, cy) {
            //Objects are passed by "copy of a reference"
            var objects = circles.circles

            for(var i=0; i<objects.length; i++){
                var distancesquared = (objects[i].x - cx) * (objects[i].x - cx) + (objects[i].y - cy) * (objects[i].y - cy);

                if(distancesquared <= objects[i].radius * objects[i].radius) {
                    objects[i].counter = objects[i].counter + 1;
                 
                    view.render(objects);
                }
            }
          }

    };
    
    var view = {
        init: function() {
           this.width = 500;
           this.height = 500;

           var canvas = document.getElementById('bubbles');
		   this.ctx = canvas.getContext('2d');
            
           canvas.addEventListener('click', function(e){
                game.checkHit(e.clientX, e.clientY);
           }.bind(this));
            
           
        },

        render: function(objects) {
            var ctx = this.ctx;

           	ctx.clearRect(0, 0, this.width, this.height);
            for(var i=0; i<objects.length; i++ ) {
                this.ctx.beginPath();

        	    this.ctx.fillStyle = '#000';
        	    this.ctx.arc(objects[i].x,
                        objects[i].y,
                        objects[i].radius,
                        0,
                        Math.PI*2,
                        true);
    	    	this.ctx.fill();
    
        	    this.ctx.fillStyle = '#fff';
    		    this.ctx.font = 10 + 'px Helvetica';
            	this.ctx.fillText(objects[i].counter, 
                             objects[i].x,
                             objects[i].y);
            }
                
        }   
    }
    
    game.init();
    
    function Circle(x,y){
        this.x = x;
        this.y = y;
        this.counter = 1;
        this.radius = 30;
    }
     
})();

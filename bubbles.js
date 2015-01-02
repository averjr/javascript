(function(){
    var game;

    window.onload = function() {
        game = new Game();    
        return;
    }

    
    function Game(){
        var width = 500,
            height = 500,
            ctx,
            canvas;

        this.init = function() {
            canvas = document.getElementById('bubbles');
			ctx = canvas.getContext('2d');

            var c = new Circle(60,60);
            canvas.addEventListener('click', function(e){
                c.checkHit(e.clientX, e.clientY);

            });
//            new Circle(160,160);
        }

        
        function Circle(x,y){
            var counter = 1,
                radius = 30;
            
            this.render = function(){
    	    	ctx.clearRect(0, 0, width, height);
  	        
                ctx.beginPath();
    	    	ctx.fillStyle = '#000';
    	    	ctx.arc(x,y,radius,0,Math.PI*2,true);
    		    ctx.fill();
    
        		ctx.fillStyle = '#fff';
		        ctx.font = 10 + 'px Helvetica';
        		ctx.fillText(counter, x,y);
            }

            this.checkHit = function(cx, cy){
                var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);

                if(distancesquared <= radius * radius) {
                    counter = counter + 1;
                    this.render();
                }
            }
               
            this.render(); 
        }    

        this.init();
    }
})();

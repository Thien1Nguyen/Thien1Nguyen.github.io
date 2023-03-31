
export class Player{
        constructor(game){
            this.game = game;
            // this.width = 50;
            // this.height = 50;
            this.radius = 20;
            this.x = (this.game.width/2) - (this.radius);
            this.y = (this.game.height/2) - (this.radius);
            // this.image = document.querySelector('#player');
            this.speed = 5;
}
        update(control){
            if(control.includes('d')){
                this.x += this.speed;
            }
            else if (control.includes('a')){
                this.x -= this.speed;
            }
            if (control.includes('w')){
                this.y -= this.speed;
            }
            else if (control.includes('s')){
                this.y += this.speed;
            }
            if(control.includes('Shift')){
                this.x = (this.game.width/2) - (this.radius/2);
                this.y = (this.game.height/2) - (this.radius/2);
                console.log(this.x, this.y)
            }
            
            if(this.x - this.radius < 0){
                this.x = this.radius;
            }
            if(this.x > this.game.width - this.radius){
                this.x = this.game.width - this.radius;
            }
            if(this.y - this.radius< 0){
                this.y = this.radius;
            }
            if(this.y > this.game.height - this.radius){
                this.y = this.game.height - this.radius;
            }
        }
        draw(context){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            context.fillStyle = 'grey';
            context.fill()
            // context.fillStyle = "pink";
            // context.drawImage(this.image, this.x, this.y, 50, 50);
        }
    };

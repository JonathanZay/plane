import Map from './Map';
interface IOptions{
    x:number;
    y:number;
}
/**定义子弹 */
class Bullet{
    public x:number;
    public y:number;
    public radius:number;
    private color:string;
    private speed:number;
    constructor(options:IOptions){
        this.x = options.x;
        this.y = options.y;

        this.radius = 5;
        this.color = 'green';
        this.speed = 5;
    }
    public move():boolean{
        this.y = this.y - this.speed;
        if(this.y < 0){
            return false;
        } 
        this.render();
        return true;
    }
    private render():void{
        Map.ctx.beginPath();
        Map.ctx.fillStyle = this.color;
        Map.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        Map.ctx.fill();
    }
}

export default Bullet;
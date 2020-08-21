import Map from './Map'; 
interface IOptions{
    x:number;
    y:number;
    radius:number;
}
const rand = Math.random;
/**
 * 定义粒子
 */
class Particle{
    private x:number;
    private y:number;
    private vx:number;
    private vy:number;
    public destroy:boolean;
    private speed:number;
    private size:number;
    private color:string;
    private width:number;
    private height:number;

    constructor(options:IOptions){
        this.x = options.x;
        this.y = options.y;
        this.vx = -2+4*rand();
        this.vy = -2+4*rand();
        this.destroy = false;
        this.speed = 0.04;
        this.size = options.radius;
        this.color = 'rgb(30,136,168)';
        this.width = this.size + rand()*2;
        this.height = this.size + rand()*2;
    }

    public move():void{
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        this.width = this.width - this.speed;
        this.height = this.height - this.speed;
        if(this.width < 0){
            this.destroy = true;
        }
    }

    public render():void{
        Map.ctx.fillStyle = this.color;
        Map.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

export default Particle;
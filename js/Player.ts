import Map from './Map';
import Bullet from './Bullet';
import Enemy from './Enemy';
import Particle from './Particle';
/**
 * 定义玩家
 */
class Player {
    private x: number;
    private y: number;
    private planeImg: HTMLImageElement;
    private planeWidth: number;
    private planeHeight: number;
    private planeReady: boolean = false;
    //定义子弹
    private bullets: Array<Bullet>;
    //定义攻速
    private attackSpeed: number;
    //定义粒子数量
    private particlesNum:number;
    //定义粒子
    private particles:Array<Array<Particle>>;
    constructor() {

        this.x = Map.width / 2;
        this.y = Map.height - 100;
        //生成小飞机
        this.planeImg = new Image();
        this.planeImg.src = require('../img/plane.png');
        this.planeWidth = 50;
        this.planeHeight = 50;
        this.planeImg.onload = () => {
            this.planeReady = true;
        }
        this.bullets = [];
        this.attackSpeed = 300;
        this.particlesNum = 30;
        this.particles = [[]];
        this.bind();

        setInterval(() => {
            this.shoot();
        }, this.attackSpeed)
    }
    /**
     * 定义射击
     */
    private shoot(): void {
        let bullet = new Bullet({ x: this.x + (this.planeWidth / 2), y: this.y - (this.planeHeight - 15) });
        this.bullets.push(bullet);
    }
    /**
     * 玩家生成
     */
    public render(enemys: Array<Enemy>): void {

        for (let i = 0; i < enemys.length; i++) {
            enemys[i].render();
            enemys[i].move();
        }

        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].move()) {

                for (let a = 0; a < enemys.length; a++) {
                    if (this.bulletCollision(this.bullets[i], enemys[a])) {
                        this.boom(enemys[a].x,enemys[a].y,enemys[a].radius);
                        enemys.splice(a, 1);
                        this.bullets.splice(i, 1);
                        a = enemys.length;
                    }
                }

            }
            else {
                this.bullets.splice(i, 1);
            }

        }

        if (this.planeReady) {
            Map.ctx.drawImage(this.planeImg, this.x, this.y - 30, this.planeWidth, this.planeHeight);
        }
        if ( this.particles.length) {
            this.renderBoom();
        }
    }
    /**
     * 硬件绑定
     */
    private bind(): void {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.move(e.clientX - 20, e.clientY - 20);
        })
    }

    /**
     * 玩家移动
     */
    private move(posX: number, posY: number): void {
        this.x = posX;
        this.y = posY;
    }

    /**
     * 子弹碰撞检测
     */
    private bulletCollision(bullet: Bullet, enemy: Enemy): boolean {
        const disX = bullet.x - enemy.x;
        const disY = bullet.y - enemy.y;
        return Math.hypot(disX, disY) < (bullet.radius + enemy.radius);
    }
    /**
     * 爆炸
     */
    private boom(x: number, y: number, radius: number): void {
        let eachPart:Array<Particle> = [];
        for (let i = 0; i < this.particlesNum; i++) {
            eachPart.push(new Particle({x,y,radius}));
        }
        this.particles.push(eachPart);
    }
    /**
     * 生成爆炸粒子
     */
    private renderBoom():void{
        for (let i = 0; i < this.particles.length; i++) {
            const eachParticles = this.particles[i]; 
            if(eachParticles.length>0){ 
                for (let a = 0; a < eachParticles.length; a++) {
                    if(eachParticles[a].destroy){
                        eachParticles.splice(a,1);
                    }
                    else{
                        eachParticles[a].render();
                        eachParticles[a].move();
                    } 
                }
            }
            else{
                this.particles.splice(i,1);
            }
        }
    }
}
export default Player;
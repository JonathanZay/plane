import Map from './Map';

interface IOptions {
    x: number;
    y: number;
}
/**
 * 敌人类
 */
class Enemy {
    public x: number;
    public y: number;
    public radius: number;
    public color: string;
    public speed: number;

    constructor(options?: IOptions) {
        this.x = options.x || Math.random() * Map.width;
        this.y = options.y || Math.random() * Map.height;
        this.radius = Math.random() * 2 + 3;
        this.color = '#f00';
        this.speed = Math.random() * 2 + 0.5;
    }
    /**
     * 移动
     */
    public move(): void {
        this.y = this.y + this.speed;
        if (this.y > (Map.height + 10)) {
            this.y = -10 + Math.random() * -20;
        }
    }
    /**
     * 生成敌人
     */
    public render(): void {
        Map.ctx.beginPath;
        Map.ctx.fillStyle = this.color;
        Map.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        Map.ctx.fill();
    }
}

export default Enemy;
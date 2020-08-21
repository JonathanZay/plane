interface IOptions{
    canvas:HTMLCanvasElement; 
}
/**
 * 定义画布
 */
class Map {
    public canvas:HTMLCanvasElement;
    public ctx:CanvasRenderingContext2D;
    public width:number;
    public height:number;
    public init(options:IOptions):void{
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    /**
     * 清除画布
     */
    public clear():void{
        this.ctx.clearRect(0,0,this.width,this.height);
    }
    /**
     * 生成画布
     */
    public render():void{
        this.clear();
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0,this.width,this.height);
    }
}
export default new Map();
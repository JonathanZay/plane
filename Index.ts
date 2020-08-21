import Map from './js/Map';
import Enemy from './js/Enemy';
import Player from './js/Player';

const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

//地图初始化
const canvas = document.getElementById('game') as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
Map.init({ canvas });
//基础数据
let enemys: Array<Enemy> = [];

/**
 * 添加敌人方法
 */
function CreateEnemy(enemyNum: number) {
    for (let i = 0; i < enemyNum; i++) {
        enemys.push(new Enemy());
    } 
}

let player = new Player();

function Animate() {
    Map.render();
    player.render(enemys);
    raf(Animate);
}

function StartGame() {
    CreateEnemy(50);
    Animate();
}
StartGame();
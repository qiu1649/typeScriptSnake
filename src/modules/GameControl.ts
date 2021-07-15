// 引入其他的类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器，控制其他的所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 积分牌
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = '';

    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    // 按键限制
    private XDirection: string[] = ['ArrowLeft', "Left", 'ArrowRight', 'Right'];
    private YDirection: string[] = ['ArrowUp', 'Up', 'ArrowDown', 'Down'];

    constructor(throughWall: boolean = false) {
        this.snake = new Snake(throughWall);
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2);

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));

        // 调用run方法，使蛇移动
        this.run();
    }

    /**
     * ArrowUp -- chrome    Up -- IE
       ArrowLeft            Left
       ArrowDown            Down
       ArrowRight           Right
     * @param event 
     */
    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // 需要检查 event.key 的值是否合法（用户是否按了正确的按键）
        if (this.XDirection.includes(event.key) || this.YDirection.includes(event.key)) { // 按了正确按键
            // 当前的按下按键 跟 本身的按键相同时，不做任何操作
            if (this.direction === event.key) return;
            switch (event.key) {
                case 'Up':
                case 'ArrowUp':
                case 'Down':
                case 'ArrowDown':
                    // 只能一个蛇头时，不进入判断，可以左右掉头
                    if(this.snake.bodies[1])
                        if (this.YDirection.includes(this.direction)) return;
                    this.direction = event.key;
                    break;
                case 'Left':
                case 'ArrowLeft':
                case 'Right':
                case 'ArrowRight':
                    // 只能一个蛇头时，不进入判断，可以上下掉头
                    if(this.snake.bodies[1])
                        if (this.XDirection.includes(this.direction)) return;
                    this.direction = event.key;
                    break;
            }
        }

        

        // 修改direction属性
        // this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /**
         * 根据方向（this.direction） 来使蛇的位置改变
         *      向上 top  减少
         *      向下 top  增加
         *      向左 left 减少
         *      向右 left 增加
         */

        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        // 检查蛇是否迟到食物
        this.checkEat(X, Y)

        try {
            // 修改蛇的X 和 Y 值
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            this.isLive = false;
            alert(e.message + " GAME OVER!")
        }

        this.isLive && setTimeout(this.run.bind(this), 150 - (this.scorePanel.level - 1) * 10);
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change(this.snake.bodies);
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }
}

export default GameControl;
class Snake {
    // 表示蛇头元素
    head: HTMLElement;
    // 蛇的身体（包括蛇头） HTMLCollection是一个集合，会实时刷新
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;
    // 是否可以穿墙
    throughWall: boolean;

    constructor(throughWall: boolean = false) {
        this.element = document.getElementById('snake')!;
        // document.querySelector() 返回的是一个 Element类型
        this.head = document.querySelector('#snake > div') as HTMLElement;
        // querySelectorAll() 获取到的是一个固定的数组 -----  bodies 需要添加新的div (蛇身)
        this.bodies = this.element.getElementsByTagName('div');
        this.throughWall = throughWall;
    }

    // 获取蛇的坐标（蛇头坐标）
    get X() {
        return this.head.offsetLeft;
    }

    // 获取蛇的Y轴坐标
    get Y() {
       return this.head.offsetTop; 
    }

    // 设置蛇头的坐标
    set X(value: number) {

        // 如果新值和旧值相同，则直接返回不再修改
        if(this.X === value) {
            return;
        }

        // X 的值的合法范围 0 - 290 之间
        if(value < 0 || value > 290) {
            // throughWall为true，代表可以穿墙， value 是 蛇头所在的位置
            if(this.throughWall) {
                value < 0 ? value = 290 : '';
                value > 290 ? value = 0 : '';
            }else {
                // 进入判断说明蛇撞墙了
                throw new Error('蛇撞墙了!')
            }
        }

        // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('水平方向发生了掉头')
            // 如果发生了掉头，让蛇向反方向继续移动
            if(value > this.X) {
                // 如果新增value大于旧值X，则说明蛇在向左走，此时发生掉头，应该使蛇继续向左走
                value = this.X - 10;
            }else {
                // 向右走
                value = this.X + 10
            }
        }

        // 移动身体
        this.moveBody()

        // 蛇头当前位置
        this.head.style.left = value + 'px';

        // 检查有没有撞到自己
        this.checkHeadBody();
    }

    set Y(value: number) {

        // 如果新值和旧值相同，则直接返回不再修改
        if(this.Y === value) {
            return;
        }

        // Y 的值的合法范围 0 - 290 之间
        if(value < 0 || value > 290) {
            // throughWall为true，代表可以穿墙， value 是 蛇头所在的位置
            if(this.throughWall) {
                value < 0 ? value = 290 : '';
                value > 290 ? value = 0 : '';
            }else {
                // 进入判断说明蛇撞墙了, 抛出一个异常
                throw new Error('蛇撞墙了!')
            }
        }

        // 修改Y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // console.log('水平方向发生了掉头')
            // 如果发生了掉头，让蛇向反方向继续移动
            if(value > this.Y) {
                // 如果新增value大于旧值Y，则说明蛇在向上走，此时发生掉头，应该使蛇继续向上走
                value = this.Y - 10;
            }else {
                // 向下走
                value = this.Y + 10
            }
        }

        // 移动身体
        this.moveBody()

        // 蛇头当前位置
        this.head.style.top = value + 'px';

        // 检查有没有撞到自己
        this.checkHeadBody();

    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div,  beforeend 在结束标签之前
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        /**
         * 将后边的身体设置为前边身体的位置
         *      举例子：
         *          第 4 节 = 第 3 节的位置
         *          第 3 节 = 第 2 节的位置
         *          第 2 节 = 第 1 节的位置
         *          第 1 节 = 方向 + 每次的位移量;
         */
        // 遍历所有的身体
        for(let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
        }
    }

    // 检查蛇头是否撞到身体的方法
    checkHeadBody() {
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i = 1; i < this.bodies.length; i++) {
            let tl = this.bodies[i] as HTMLElement;
            if(this.X === tl.offsetLeft && this.Y === tl.offsetTop) {
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到了自己');
            }
        }
    }
}

export default Snake;
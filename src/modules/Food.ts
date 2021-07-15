// 定义食物类 Food
class Food {
    // 定义一个属性表示食物所对应的元素
    elememt: HTMLElement;

    constructor() {
        // 获取页面中的food元素并将其赋值给element，   ! 表示不可能为空
        this.elememt = document.getElementById('food')!;
    }

    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.elememt.offsetLeft;
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.elememt.offsetTop;
    }

    // 修改食物的位置
    change(snakeBody: HTMLCollection) { // 传入蛇的身体
        // 生成一个随机位置
        // 食物的位置最小是0 最大是290
        // 蛇移动一次就是一格， 一个的大小就是 10x10,所以就要求食物的坐标必须是整10

        // Math.round(Math.random() * 29) * 10
        let left = Math.floor(Math.random() * 30) * 10; // 0~29 格  * 10 得到对应的位置
        let top = Math.floor(Math.random() * 30) * 10; 

        // 生成的食物不能出现在蛇的身上
        let foodInSnake: boolean = false;
        for(let i = 0; i < snakeBody.length; i++) {
            let body = <HTMLElement>snakeBody[i];
            // 判断食物出现的位置 是否和 蛇所在的位置 重叠
            if(left === body.offsetLeft && top === body.offsetTop) {
                foodInSnake = true;
            }
        }

        if(foodInSnake){ // 食物的位置 和 蛇的位置 重叠，重新生成食物
            this.change(snakeBody)
        }else{
            this.elememt.style.left = left + 'px';
            this.elememt.style.top = top + 'px';
        }
    }
}

export default Food;

// 测试代码
// const food = new Food();
// console.log(food.X,food.Y);
// food.change();

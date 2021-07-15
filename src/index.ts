import "./style/index.less";
// import Food from "./modules/Food";

// const food = new Food();
// console.log(food.X,food.Y);
// food.change();
const throughWall: boolean = true;
import GameControl from './modules/GameControl';
let gameControl = new GameControl(throughWall);
// setInterval(() => {
//     console.log(gameControl.direction)
// },1000)
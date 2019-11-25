import {createMenu} from "./components/menu";
import {createFilters} from "./components/filters";
import {createBoardTasks} from "./components/tasks-board";
import {createTaskCard} from "./components/card";
import {createEditTaskCard} from "./components/edit-card";
import {createMoreButton} from "./components/more-btn";

const CARD_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainBlock = document.querySelector(`.main`);
const mainHeader = document.querySelector(`.main__control`);

render(mainHeader, createMenu());
render(mainBlock, createFilters());
render(mainBlock, createBoardTasks());

const boardTasks = document.querySelector(`.board__tasks`);
const mainBoard = document.querySelector(`.board`);

render(boardTasks, createEditTaskCard());

for (let i = 0; i < CARD_COUNT; i++) {
  render(boardTasks, createTaskCard());
}

render(mainBoard, createMoreButton());

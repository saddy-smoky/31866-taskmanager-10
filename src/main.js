import {createMenu} from "./components/menu";
import {createFilterTemplate} from "./components/filters";
import {createBoardTasks} from "./components/tasks-board";
import {createTaskTemplate} from "./components/card";
import {createTaskEditTemplate} from "./components/edit-card";
import {createMoreButton} from "./components/more-btn";
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const CARD_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainBlock = document.querySelector(`.main`);
const mainHeader = document.querySelector(`.main__control`);

render(mainHeader, createMenu());

const filters = generateFilters();
render(mainBlock, createFilterTemplate(filters), `beforeend`);

render(mainBlock, createBoardTasks());

const boardTasks = document.querySelector(`.board__tasks`);

const tasks = generateTasks(CARD_COUNT);

const mainBoard = document.querySelector(`.board`);

render(boardTasks, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => render(boardTasks, createTaskTemplate(task), `beforeend`));

render(mainBoard, createMoreButton());

const loadMoreButton = mainBoard.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(boardTasks, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

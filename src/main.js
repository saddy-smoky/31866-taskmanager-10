import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {render, RenderPosition} from './utils/render';
import BoardComponent from './components/tasks-board.js';
import FilterComponent from './components/filters.js';

import SiteMenuComponent from './components/menu.js';
import BoardController from "./controllers/board";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);

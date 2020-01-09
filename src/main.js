import {generateTasks} from './mock/task.js';
import {render, RenderPosition} from './utils/render';
import BoardComponent from './components/tasks-board.js';
import FilterController from './controllers/filter.js';
import TasksModel from './models/tasks';
import SiteMenuComponent from './components/menu.js';
import BoardController from "./controllers/board";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render();

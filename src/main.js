import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';
import BoardComponent from './components/tasks-board.js';
import FilterComponent from './components/filters.js';
import LoadMoreButtonComponent from './components/more-btn.js';
import TaskEditComponent from './components/edit-card.js';
import TaskComponent from './components/card.js';
import SiteMenuComponent from './components/menu.js';

const CARD_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    boardTasks.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    boardTasks.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(boardTasks, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainBlock = document.querySelector(`.main`);
const mainHeader = document.querySelector(`.main__control`);

render(mainHeader, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
const boardComponent = new BoardComponent();
render(mainBlock, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

render(mainBlock, boardComponent.getElement(), RenderPosition.BEFOREEND);

const boardTasks = document.querySelector(`.board__tasks`);

const tasks = generateTasks(CARD_COUNT);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(0, showingTasksCount).forEach((task) => {
  renderTask(task);
});

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);


loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => {
      renderTask(task);
    });

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});

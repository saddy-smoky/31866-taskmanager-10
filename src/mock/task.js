const descriptionArr = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const daysArr = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tagsArr = [`homework`, `theory`, `practice`, `intensive`, `keks`];

const colorsArr = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRandomArrayItem = (array) => {
  const randIndex = getRandomInt(0, array.length);

  return array[randIndex];
};

const getRandomInt = (min, max) => min + Math.floor(max * Math.random());

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomInt(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTags = (tags) => tags.filter(() => Math.random() > 0.5).slice(0, 3);

const generateRepeatingDays = () => Object.assign({}, daysArr, {
  'mo': Math.random() > 0.5,
});

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayItem(descriptionArr),
    dueDate,
    repeatingDays: dueDate ? daysArr : generateRepeatingDays(),
    tags: new Set(generateTags(tagsArr)),
    color: getRandomArrayItem(colorsArr),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  const tasksArr = [];

  for (let i = 0; i < count; i++) {
    tasksArr.push(generateTask());
  }
  return tasksArr;
};

export {generateTask, generateTasks};

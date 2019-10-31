const Validate = {
  value: {
    MIN: 0,
    MAX: 1000
  }
}
Validate.message = {
  min: 'Необходимо указать число больше ' + Validate.value.MIN,
  max: 'Необходимо указать число не больше ' + Validate.value.MAX,
  noData: 'Необходимо сгенерировать данные'
};

class Animal {
  constructor(animalTypes) {
    this.types = animalTypes;
    this.typesNumber = {};
    animalTypes.forEach((type) => {
      this.typesNumber[type] = 0;
    })
  }

  getPopularType() {
    let types = this.randomTypes.split('\n');
    types.pop();
    types.forEach((type) => {
      this.typesNumber[type]++
    });

    let popularType = [];
    let maxValue = Math.max(...Object.values(this.typesNumber));

    for (let key in this.typesNumber) {
      if (this.typesNumber[key] === maxValue) {
        popularType.push(key);
      }
    }

    return popularType;
  }

  generateAnimals(numberOfAnimals) {
    numberOfAnimals = parseInt(numberOfAnimals, 10);
    for (let key in this.typesNumber) {
      this.typesNumber[key] = 0
    }

    let animals = '';
    for (let i = 0; i < numberOfAnimals; i++) {
      let index = Math.floor(Math.random() * this.types.length);
      animals += this.types[index] + '\n';
    }
    this.randomTypes = animals;

    if (this.getPopularType().length > 1) {
      return this.generateAnimals(numberOfAnimals);
    }

    return animals;
  }
}
let lemurs = new Animal(['Карликовый', 'Руконожковый', 'Индриевый']);

class Error {
  constructor(errorWindow, input) {
    this.element = errorWindow;
    this.input = input;
  }

  add(text) {
    this.element.textContent = text;
    this.element.classList.add('error-show');
    this.input.style.boxShadow = '0 0 0 2px red';
  }

  remove() {
    if (this.element.classList.contains('error-show')) {
      this.element.classList.remove('error-show');
      this.element.textContent = '';
      this.input.style.boxShadow = 'none';
    }
  }
}
const errorWindow = document.querySelector('.error');
const dataNumberInput = document.querySelector('input');
let errorMessage = new Error(errorWindow, dataNumberInput);

class ReviewBlock {
  constructor(dataCell, resultCell) {
    this.data = dataCell;
    this.result = resultCell;
  }
}
const dataCell = document.querySelector('.data');
const resultCell = document.querySelector('.result');
const reviewBlock = new ReviewBlock(dataCell, resultCell);

class DataButton {
  constructor(button, dataInput, reviewBlock, generateData) {
    this.element = button;
    this.input = dataInput;
    this.reviewBlock = reviewBlock;
    this.generateData = generateData;
  }

  handler() {
    if (this.input.value <= Validate.value.MIN || !this.input.value) {
      errorMessage.add(Validate.message.min, this.input);
    } else if (this.input.value > Validate.value.MAX ) {
      errorMessage.add(Validate.message.max, this.input);
    } else {
      errorMessage.remove(this.input);
      if (this.reviewBlock.result.textContent) {
        this.reviewBlock.result.textContent = '';
      }

      this.reviewBlock.data.textContent = this.input.value + '\n' + this.generateData(this.input.value);
    }
  }
}

const generateDataBtnElement = document.querySelector('.generate-btn');
const generateData = lemurs.generateAnimals.bind(lemurs);
let generateDataBtn = new DataButton(generateDataBtnElement, dataNumberInput, reviewBlock, generateData);
generateDataBtn.element.addEventListener('click', generateDataBtn.handler.bind(generateDataBtn));

class ResultButton {
  constructor(button, dataInput, reviewBlock, getResult) {
    this.element = button;
    this.input = dataInput;
    this.reviewBlock = reviewBlock;
    this.getResult = getResult;
  }

  handler() {
    if (!this.reviewBlock.data.textContent) {
      errorMessage.add(Validate.message.noData, this.input);
    } else {
      errorMessage.remove(this.input);
      this.reviewBlock.result.textContent = this.getResult();
    }
  }
}

const getResultBtnElement = document.querySelector('.get-result-btn');
const getResult = lemurs.getPopularType.bind(lemurs);
let getResultBtn = new ResultButton(getResultBtnElement, dataNumberInput, reviewBlock, getResult);
getResultBtn.element.addEventListener('click', getResultBtn.handler.bind(getResultBtn));

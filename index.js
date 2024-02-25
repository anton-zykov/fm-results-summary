const colors = {
  'Reaction': 'red',
  'Memory': 'yellow',
  'Verbal': 'green',
  'Visual': 'blue',
};

class Stat {
  constructor ({ category, score, icon }) {
    this.category = category;
    this.score = score;
    this.icom = icon;

    this.element = this.createElement();
    this.calculateColor();
  }

  createTemplate () {
    return `
      <div class="stat">
        <p class="stat__title">${this.category}</p>
        <div class="stat__numbers">
          <span class="stat__score">${this.score}</span>
          <span class="stat__maximum">/ 100</span>
        </div>
      </div>
    `;
  }

  createElement () {
    const container = document.createElement('div');
    container.innerHTML = this.createTemplate();
    return container.firstElementChild;
  }

  calculateColor () {
    const color = colors[this.category];
    this.element.style.backgroundColor = `var(--bright-${color})`;
    this.element.querySelector('.stat__title').style = 
      `--icon: url('../images/icon-${this.category.toLowerCase()}.svg');
      color: var(--${color})`;
  }
}

fetch('./data.json')
  .then((response) => response.json())
  .then((data) => data.map((stat) => new Stat(stat)))
  .then((stats) => {
    document.querySelector('.summary__stats').append(...stats.map((stat) => stat.element));
  });
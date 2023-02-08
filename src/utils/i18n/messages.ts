export default {
  en: {
    home: {
      title: 'Menu',
      buttons: {
        play: 'Play',
        about: 'About',
      },
    },
    levels: {
      title: 'Levels',
      buttons: {
        easy: 'Easy',
        normal: 'Normal',
        hard: 'Hard',
      },
    },
    level: {
      title: 'Select a game',
      subtitle: 'Selected level "{level}"',
    },
    game: {
      time: '{minutes}m {seconds}s',
    },
    about: {
      title: 'About Sudoku',
      content: `
        <p>Sudoku (/su:'doʊku:, -'dɒk-, sə-/; Japanese: 数独, romanized: sūdoku,
        lit. 'digit-single'; originally called Number Place)[1] is a logic-based,[2][3]
        combinatorial[4] number-placement puzzle.</p>
        <br />
        <p>In classic Sudoku,
        the objective is to fill a 9 x 9 grid with digits so that each column,
        each row, and each of the nine 3 x 3 subgrids that compose the grid
        (also called "boxes", "blocks", or "regions") contain all of the digits
        from 1 to 9.</p>
        <br />
        <p>The puzzle setter provides a partially completed grid,
        which for a well-posed puzzle has a single solution.</p>
      `,
    },
    finishDialog: {
      title: 'You did it!',
      subtitle: 'You successfully finished this Sudoku!',
      buttons: {
        level: 'Select an another game',
        home: 'Home',
      },
    },
    numbers: {
      clear: 'clear',
    },
    error404: {
      title: '404',
      subtitle: 'Not found',
      homeBtn: 'Go to home',
    },
  },

  ru: {
    home: {
      title: 'Меню',
      buttons: {
        play: 'Играть',
        about: 'Об игре',
      },
    },
    levels: {
      title: 'Уровни',
      buttons: {
        easy: 'Простой',
        normal: 'Нормальный',
        hard: 'Сложный',
      },
    },
    level: {
      title: 'Выберите игру',
      subtitle: 'Выбранный уровень "{level}"',
    },
    game: {
      time: '{minutes}м {seconds}с',
    },
    about: {
      title: 'Об игре Sudoku',
      content: `
        <p>Судоку (/su:'doʊku:, -'dɒk-, sə-/; японский: 数独, латинизированный: судоку,
        горит 'цифра одиночная'; первоначально назывался Number Place)[1] основан на логике,[2][3]
        комбинаторная[4] головоломка с размещением чисел.</p>
        <br />
        <p>В классическом судоку
        цель состоит в том, чтобы заполнить сетку 9 x 9 цифрами так, чтобы каждый столбец,
        каждая строка и каждая из девяти подсеток 3 x 3, составляющих сетку
        (также называемые «ящиками», «блоками» или «областями») содержат все цифры
        от 1 до 9.</p>
        <br />
        <p>Установщик головоломок предоставляет частично заполненную сетку,
        которая для правильно поставленной головоломки имеет единственное решение.</p>
      `,
    },
    finishDialog: {
      title: 'Вы сделали это!',
      subtitle: 'Вы успешно заполнили этот Sudoku!',
      buttons: {
        level: 'Выбрать другую игру',
        home: 'Домой',
      },
    },
    numbers: {
      clear: 'очистить',
    },
    error404: {
      title: '404',
      subtitle: 'Ничего не найдено',
      homeBtn: 'Перейти на главную',
    },
  },
};

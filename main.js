const header = document.querySelector('.header');
const headerLogo = document.querySelector('.header__logo');
const headerLink= document.querySelectorAll('.header__link');
const headerNavWrapp = document.querySelector('.header__nav-wrapper');
const constructorForm = document.querySelector('.constructor__form')
const select = document.getElementById('select__type');
const inputDate = constructorForm.querySelectorAll('input[type="date"]');
const dateFromInput = document.getElementById('date-from');
const dateToInput = document.getElementById('date-to');
const resetButton = constructorForm.querySelector('button[type="reset"]')

let scrollById = false;

headerLogo.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

headerLink.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

select.addEventListener('change', () => {
  const value = select.value;
  (value === 'none') ?
    select.classList.add('constructor__form-select--placeholder')
    :
    select.classList.remove('constructor__form-select--placeholder')
});


inputDate.forEach(elem => {
  elem.addEventListener('input', (event) => {
    (event.target.value) ?
      event.target.classList.remove('constructor__form-input--date-placeholder')
      :
      event.target.classList.add('constructor__form-input--date-placeholder');
  })
});

resetButton.addEventListener('click', makeFromDeafult)

const makeNavToFixed = () => {
  let prevScrollPos = window.pageYOffset;
  let statusFixed = false;
  let statusHidden = false;

  let toUp = 0;
  let toDown = 0;

  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    const requiredScroll = scrollPos > 450
    if (requiredScroll) {
      addFixed()
    } else {
      removeFixed();
      removeHidden();
    }

    if (scrollPos > 1240 & scrollPos > prevScrollPos && !scrollById) {
      toDown++;
      toUp = 0;
      if (toDown > 30) {
        addHidden();
      }
    }
    if (requiredScroll && scrollPos < prevScrollPos && !scrollById) {
      toDown = 0;
      toUp++;
      if (toUp > 25) {
        removeHidden();
      }
      if (statusFixed && scrollPos < 600) {
        addHidden();
      }
    }
    prevScrollPos = scrollPos;
  });

  function addFixed() {
    if (!statusFixed) {
      headerNavWrapp.classList.add('header__nav-wrapper--fixed');
      header.classList.add('header--nav-fixed');
      statusFixed = true;
    }
  }

  function removeFixed() {
    if (statusFixed) {
      headerNavWrapp.classList.remove('header__nav-wrapper--fixed');
      header.classList.remove('header--nav-fixed');
      statusFixed = false;
    }
  }

  function addHidden() {
    if (!statusHidden) {
      headerNavWrapp.classList.add('header__nav-wrapper--hidden');
      statusHidden = true;
    }
  }

  function removeHidden() {
    if (statusHidden) {
      headerNavWrapp.classList.remove('header__nav-wrapper--hidden');
      statusHidden = false;
    }
  }
}


function smoothScroll(event) {
  event.preventDefault();

  const targetLink = event.target.closest('a');

  if (!targetLink) {
    return;
  }

  const targetId  = targetLink.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  const targetPosition = targetElement.offsetTop;
  const offsetPosition = targetPosition - 88;

  scrollById = true;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  setTimeout(() => {
    scrollById = false;
  }, 3000);
}

const removeWarning = (input) => {
  if (input.classList.contains('constructor__form-input--invalid')) {
    input.classList.remove('constructor__form-input--invalid');
  }
}

const addWarning = (input) => {
  if (!input.classList.contains('constructor__form-input--invalid')) {
    input.classList.add('constructor__form-input--invalid');
  }
}

const verifyFormDate = () => {
  let currentDate;
  let correctDate;
  let dateFrom;
  let dateTo;

  inputDate.forEach(elem => elem.addEventListener('change', valideDates));

  function valideDates(event) {
    currentDate = new Date().toISOString().split('T')[0];
    correctDate = currentDate.split('-').map((elem, index) => index === 0 ? Number(elem) + 5 : elem).join('-');
    dateFrom = dateFromInput.value;
    dateTo = dateToInput.value;

    if (event.target === dateFromInput) {
      (dateFrom < currentDate || dateFrom > correctDate) ? addWarning(dateFromInput) : removeWarning(dateFromInput);
      if (dateTo != '') {
        (dateTo <= dateFrom) ? addWarning(dateToInput) : removeWarning(dateToInput);
      }
    }
    if (event.target === dateToInput) {
      (dateTo < currentDate || dateTo > correctDate) ? addWarning(dateToInput) : removeWarning(dateToInput);
      if (dateFrom != '') {
        (dateTo <= dateFrom) ? addWarning(dateToInput) : removeWarning(dateToInput);
      }
    }
  }
};

function makeFromDeafult() {
  inputDate.forEach(input => removeWarning(input))
  inputDate.forEach(input => input.classList.add('constructor__form-input--date-placeholder'))
  select.classList.add('constructor__form-select--placeholder')
}

document.addEventListener('DOMContentLoaded', makeNavToFixed);
verifyFormDate();
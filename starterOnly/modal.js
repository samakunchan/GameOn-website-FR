function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const invalidChars = ['-', '+', 'e'];

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const closeModalBtn = document.querySelector('.close');
const quantityInput = document.getElementById('quantity');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// Close modal form
const closeModal = () => {
  modalbg.style.display = 'none';
}
closeModalBtn.addEventListener('click', closeModal)

const preventErrorForTypeNumber = event => {
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
}
quantityInput.addEventListener('keydown', preventErrorForTypeNumber);

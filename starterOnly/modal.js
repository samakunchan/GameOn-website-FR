const editNav = () => {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const closeModalBtn = document.querySelector('.close');
const modalBtn = document.querySelectorAll('.modal-btn');
const formElement = document.getElementById('form');
const quantityInput = document.getElementById('quantity');
// const formData = document.querySelectorAll('.formData');

// launch modal form
const launchModal = () => {
  modalbg.style.display = 'block';

  // Reset errors messages
  document.querySelectorAll('.error-message').forEach((tag) => {
    tag.remove();
    isFormValid = [];
  });

  // Reset highlight error field
  document.querySelectorAll('.text-control-highlight').forEach((border) => {
    border.classList.toggle('text-control-highlight');
  });

  // Reset success message
  if(document.querySelector('.success-message')) {
    document.querySelector('.success-message').remove();
  }
}
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// Close modal form
const closeModal = () => {
  modalbg.style.display = 'none';
  formElement.reset();
  if(document.querySelector('.success-panel')) {
    document.querySelector('.success-panel').remove();
  }
}
closeModalBtn.addEventListener('click', closeModal)



// Constantes
const validText = 'VALID';
const invalidText = 'INVALID';
const invalidLength = `Veuillez entrer 2 caractères ou plus pour le champ du nom.`;
const invalidBirthdate = `Vous devez entrer votre date de naissance.`;
const invalidQuantity = `Veuillez indiquer un nombre de participation cohérent.`;
const invalidLocation = `Veuillez choisir parmis ces options.`;
const invalidEmail = `Veuillez choisir un format d'email valide.`;
const emptyText = 'Ce champ ne doit pas être vide.';
const invalidAcceptCondition = `Vous devez vérifier que vous acceptez les termes et conditions.`;
const minimumLength = 2;
const validLocations = ['New York', 'San Francisco', 'Seattle', 'Chicago', 'Boston', 'Portland'];
const invalidChars = ['-', '+', 'e'];
const listForbiddenActions = [emptyText, invalidText, invalidLength, invalidEmail, invalidBirthdate, invalidQuantity, invalidLocation, invalidAcceptCondition];
let isFormValid = [];

const preventErrorForTypeNumber = event => {
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
}
quantityInput.addEventListener('keydown', preventErrorForTypeNumber);

const formSubmitted = event => {
  // Transform a form data to an Object
  const group = [...new FormData(event.target)].reduce((r, a) => {

    switch (a[0]) {
      case 'firstname':
      case 'lastname':
        const isLengthValid = validateLength(a[1]);
        r[a[0]] = isLengthValid ? a[1] : invalidLength;
        break;
      case 'email':
        const isEmailValid = validateEmail(a[1]);
        r[a[0]] = isEmailValid ? a[1] : invalidEmail;
        break;
      case 'birthdate':
        const isBirthDateValid = validateBirthdate(a[1]);
        r[a[0]] = isBirthDateValid ? a[1] : invalidBirthdate;
        break;
      case 'quantity':
        const isDigitValid = validateDigit(a[1]);
        r[a[0]] = isDigitValid ? a[1] : invalidQuantity;
        break;
      case 'location':
        const isLocationValid = validateLocation(a[1]);
        r[a[0]] = isLocationValid ? a[1] : invalidLocation;
        break;
      case 'accept_condition':
        const isAcceptConditionValid = validateCondition(a[1]);
        r[a[0]] = isAcceptConditionValid ? a[1] : invalidAcceptCondition;
        break;
      default:
    }

    const isValueEmpty = a[1].length === 0;
    if (isValueEmpty) {
      r[a[0]] = emptyText;
    }

    return r;
  }, {});

  // Specification for location
  if (group[`location`] === undefined) {
    group[`location`] = invalidLocation;
  }

  // Specification for acceptation condition
  if (group[`accept_condition`] === undefined) {
    group[`accept_condition`] = invalidAcceptCondition;
  }

  // Add errors messages in HTML and return a list of booleans
  const errors  = showErrorsInForm(event, group);

  // If all boolean in list contain true, it contains no errors ans it show success message
  if(errors.every((error) => error === true)) {
    // Create all elements HTML
    const successPanel = document.createElement('div');
    const successMessage = document.createElement('p');
    const crossButton = document.createElement('span');
    const closeButtonContainer = document.createElement('div');
    const closeButton = document.createElement('div');

    // Add all class in HTML elements
    crossButton.classList.add('close');
    closeButton.classList.add('close-after-success', 'common-btn');
    closeButtonContainer.classList.add('close-btn-container');
    successPanel.classList.add('success-message', 'success-panel');

    // Add text content
    closeButton.textContent = 'Fermer';
    successMessage.textContent = `Merci pour votre inscription`;

    // Append HTML in correct order
    successPanel.appendChild(crossButton);
    successPanel.appendChild(successMessage);
    successPanel.appendChild(closeButtonContainer);
    closeButtonContainer.appendChild(closeButton);

    document.querySelector('.btn-submit').parentElement.appendChild(successPanel);

    // Bind closeModal callback for events
    crossButton.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);
    event.preventDefault();
  }
  event.preventDefault();
}

formElement.addEventListener('submit', formSubmitted);

// Create a <small class="error-message"></small>
// Returns a list of booleans
const showErrorsInForm = (event, group) => {
  isFormValid = [];
  return listForbiddenActions.map(error => {
    if (Object.values(group).includes(error)) {
      Object.keys(group).forEach(key => {
        if (listForbiddenActions.includes(group[key])) {
          const error = document.createElement('small');
          error.classList.add('error-message');
          error.textContent = group[key];
          if(key === `accept_condition`) {
            if(!document.querySelector('.accept-required')) {
              const error = document.createElement('small');
              error.classList.add('error-message', 'accept-required');
              error.textContent = group[key];
              document.getElementById('accept').appendChild(error);
            }
          } else if(key === 'location') {
            document.getElementById(key).appendChild(error);
          } else {
            document.getElementById(key).parentElement.appendChild(error);
            document.getElementById(key).classList.toggle('text-control-highlight');
          }
        }
      });

      event.preventDefault();
      return false;
    } else {
      return true;
    }
  });
}


// Validators
const validateLength = text => text.length > minimumLength;

const validateEmail = email => email.match(
    /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const validateDigit = quantity => quantity.match(/^\d+$/) && (Number(quantity) >= 0 && Number(quantity) <= 99);

const validateBirthdate = date => date.match(/\d{4}-\d{2}-\d{2}/);

const validateLocation = location => validLocations.includes(location);

const validateCondition = accept => accept === 'on';




// DOM Elements
const modalbg = document.querySelector('.bground');
const closeModalBtn = document.querySelector('.close');
const modalBtn = document.querySelectorAll('.modal-btn');
const formElement = document.getElementById('form');
const quantityInput = document.getElementById('quantity');
const myTopNav = document.getElementById('myTopnav');
const editNav = document.querySelector('.edit-nav');

/**
 * Callback qui gère l'affichage du menu en mode mobile
 */
const openMenuOnMobile = () => {
  if (myTopNav.className === 'topnav') {
    myTopNav.className += ' responsive';
  } else {
    myTopNav.className = 'topnav';
  }
}
editNav.addEventListener('click', openMenuOnMobile);

/**
 * Callback qui gère le lancement de la modal
 */
const launchModal = () => {
  document.body.scrollIntoView({block: 'start'})
  modalbg.style.display = 'block';

  // Reset errors messages
  resetErrorMessagesForm();

  // Reset success message
  if(document.querySelector('.success-message')) {
    document.querySelector('.success-message').remove();
  }
}
modalBtn.forEach(btn => btn.addEventListener('click', launchModal));

/**
 * CallBack qui gère la fermeture de la modal
 */
const closeModal = () => {
  modalbg.style.display = 'none';
  formElement.reset();
  if(document.querySelector('.success-panel')) {
    document.querySelector('.success-panel').remove();
  }
}
closeModalBtn.addEventListener('click', closeModal)

/**
 * Callback qui gère le bug de input type number
 * @param event
 */
const preventErrorForTypeNumber = event => {
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
}
quantityInput.addEventListener('keydown', preventErrorForTypeNumber);

/**
 * Callback qui gère la soumission du formulaire
 * @param event
 */
const formSubmitted = event => {
  resetErrorMessagesForm();

  // Transform a form data to an Object
  const formJson = transformFormDataToJson([...new FormData(event.target)]);

  // Specification for location
  if (formJson[`location`] === undefined) {
    formJson[`location`] = invalidLocation;
  }

  // Specification for acceptation condition
  if (formJson[`accept_condition`] === undefined) {
    formJson[`accept_condition`] = invalidAcceptCondition;
  }

  // Add errors messages in HTML and return a list of booleans
  const errors  = showErrorsInForm(event, formJson);

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

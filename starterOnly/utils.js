// Constantes
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

/**
 * Vérifie si le tag d'erreur existe et ajoute le tag si il n'existe pas
 * @param verify
 * @param apply
 * @example ```
 if(!document.querySelector(.ma-class)) {
 document.getElementById(id).appendChild(...);
 }
 ```
 * @author Samakunchan
 */
const verifyAndApply = (verify, apply) => {
    if(verify) apply();
}

/**
 * Callback qui gère les messages d'érreurs
 * @param event
 * @param formJson
 * @return {boolean[]}
 */
const showErrorsInForm = (event, formJson) => {
    return listForbiddenActions.map(error => {
        if (Object.values(formJson).includes(error)) {
            Object.keys(formJson).forEach(key => {

                // Si listForbiddenActions contient des érreurs
                verifyAndApply(listForbiddenActions.includes(formJson[key]), () => {
                    const error = document.createElement('small');
                    error.classList.add('error-message', key + '-required');
                    error.textContent = formJson[key];

                    // Si l'une des érreurs contient cette clé
                    verifyAndApply(key === `accept_condition`, () => {
                        // Si le message d'érreur est déjà afficher
                        verifyAndApply(!document.querySelector('.accept-required'), () => {
                            const error = document.createElement('small');
                            error.classList.add('error-message', 'accept-required');
                            error.textContent = formJson[key];
                            document.getElementById('accept').appendChild(error);
                        });
                    });

                    // Pour toute les autres érreurs trouvées autre que "accept_condition"
                    verifyAndApply(key !== `accept_condition`, () => {
                        // Si le message d'érreur est déjà afficher
                        verifyAndApply(!document.querySelector('.' + key + '-required'),() => {
                            document.getElementById(key).classList.add('text-control-highlight');
                            if(key === 'location') return;
                            document.getElementById(key).parentElement.appendChild(error);
                        });
                    });

                    // Si l'une des érreurs contient cette clé.
                    // On le gère ici à cause de la position du message qui est spécifique.
                    verifyAndApply(key === `location`, () => {
                        // Si le message d'érreur est déjà afficher
                        verifyAndApply(!document.querySelector('.' + key + '-required'), () => {
                            document.getElementById(key).parentNode.insertBefore(error, document.querySelector('.infos'));
                        });
                    });
                });
            });

            event.preventDefault();
            return false;
        } else {
            return true;
        }
    });
}

/**
 * Reset le formulaire
 */
const resetErrorMessagesForm = () => {
    document.querySelectorAll('.error-message').forEach((tag) => {
        tag.remove();
    });

    document.querySelectorAll('.text-control-highlight').forEach((border) => {
        border.classList.toggle('text-control-highlight');
    });
}

/**
 * Transforme les données du formulaire en json avec les validations
 * @param formData
 * @return {json}
 * @example
 // Résultat du formData
 [
    ['firstname', 'john'],
    ['lastname', 'doe'],
    ['email', 'john-doe@test.com'],
    ['birthdate', ''],
    ...ect
 ]
 // et devient
 {
    firstname: john,
    lastname: doe,
    email: john-doe@test.com,
    birthdate: Vous devez entrer votre date de naissance.,
 }
 */
const transformFormDataToJson = formData => formData.reduce((r, a) => {

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

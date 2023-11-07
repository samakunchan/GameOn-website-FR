/**
 * Valide la taille minimal du text
 * @param text
 * @return {boolean}
 * @example ```
 const minimumLength = 2;

 validateLength(Hello); // true
 validateLength(H); // false
 ```
 * @author Samakunchan
 */
const validateLength = text => text.length >= minimumLength;

/**
 * Valide le format d'email
 * @param email
 * @return {boolean}
 * @example ```
 validateEmail(gameon@app.com); // true
 validateEmail(gameon@app); // false
 ```
 * @author Samakunchan
 */
const validateEmail = email => email.match(
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

/**
 * Valide que les nombres entre 0 et 99
 * @param quantity
 * @return {*|boolean}
 * @example ```
 validateDigit(10); // true
 validateDigit(-5); // false
 validateDigit(103); // false
 ```
 * @author Samakunchan
 */
const validateDigit = quantity => quantity.match(/^\d+$/) && (Number(quantity) >= 0 && Number(quantity) <= 99);

/**
 * Valide le forma date
 * @param date
 * @return {boolean}
 * @example ```
 validateBirthdate(2023-01-01); // true
 validateBirthdate(01-01-2023); // false
 validateBirthdate(1er jan 2023); // false
 ```
 * @author Samakunchan
 */
const validateBirthdate = date => date.match(/\d{4}-\d{2}-\d{2}/);

/**
 * Valide la ville
 * @param location
 * @return {boolean}
 * @example ```
 const validLocations = [Paris, Lyon]

 validateLocation(Paris) // true
 validateLocation(Lille) // false
 ```
 * @author Samakunchan
 */
const validateLocation = location => validLocations.includes(location);

/**
 * Valide si le checkbox est selectionné.
 * @param accept
 * @return {boolean}
 */
const validateCondition = accept => accept === 'on';

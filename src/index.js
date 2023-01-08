import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BurgerService from './burger-service.js';

// UI Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const episodeNumber = document.querySelector('#episode-input').value;
  document.querySelector('#episode-input').value = null;
  let promise = BurgerService.getBurger(episodeNumber);
  promise.then(function(burgerDataArray) {
    printElements(burgerDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function printElements(data) {

  document.querySelector('#showResponse').innerText = `${JSON.stringify(data[0])}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the burger data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BurgerService from './burger-service.js';
import EpisodeService from './episode-service.js';
import {WikiService, parseWikiForPlot} from './wiki-service.js';

// UI Logic

function handleFormSubmission(event) {
  event.preventDefault();
  const burgerNumber = document.querySelector('#burger-input').value;
  document.querySelector('#burger-input').value = null;
  let promise = BurgerService.getBurger(burgerNumber);
  promise.then(function(burgerDataArray) {
    printElements(burgerDataArray);
  }, function(errorArray) { 
    printError(errorArray);
  }); 
}

function printElements(data) {
  document.querySelector('#burgerId').innerText = `${data[0].id}`;
  document.querySelector('#burgerName').innerText = `${data[0].name}`;
  document.querySelector('#burgerPrice').innerText = `${data[0].price}`;
  document.querySelector('#seasonAndEpisode').innerText = `S${data[0].season}E${data[0].episode}`;
  const episodeNumber = data[0].episodeUrl.split('/').pop();
  let promise = EpisodeService.getEpisode(episodeNumber);
  promise.then(function(episodeDataArray) {
    getPlot(episodeDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function getPlot(episodeData) {
  let promise = WikiService.getWikiText(episodeData[0].episodeUrl.split('/').pop());
  promise.then(function(wikiDataArray) {
    printPlot(wikiDataArray[0].parse.text);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function printPlot (html) {
  const plot = parseWikiForPlot(html);
  document.querySelector('#plot').innerHTML = plot;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the burger data for ${error}`;//${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);
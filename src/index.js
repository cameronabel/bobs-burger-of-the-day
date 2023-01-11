import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BurgerService from './burger-service.js';
import EpisodeService from './episode-service.js';
import {WikiService, parseWikiForPlot} from './wiki-service.js';


function getAPIData(burgerNumber) {
  BurgerService.getBurger(burgerNumber)
  .then(function(burgerOutput) {
    if (burgerOutput instanceof Error) {
      const errorMessage = `there was a problem accessing the #${burgerNumber} of burger you requested.
      ${burgerOutput.message}`;
      throw new Error(errorMessage);
    }
    const id = burgerOutput.id;
    const name = burgerOutput.name;
    const price = burgerOutput.price;
    const season = burgerOutput.season;
    const episode = burgerOutput.episode;
    const episodeNumber = burgerOutput.episodeUrl.split('/').pop();
    printElements(id, name, price, season, episode);
    return EpisodeService.getEpisode(episodeNumber);
  })
  .then(function(episodeOutput) {
    if (episodeOutput instanceof Error) {
      const errorMessage =`there was a problem accessing the episode you requested.
      ${episodeOutput.message}`;
      throw new Error(errorMessage);
    }
    const episodeName = episodeOutput.episodeUrl.split('/').pop();
    return WikiService.getWikiText(episodeName)
    })
  .then(function(wikiOutput) {
    if (wikiOutput instanceof Error) {
      const errorMessage= `there was a problem accessing the episode you requested.
      ${wikiOutput.message}`;
      throw new Error(errorMessage);
    } 
    printPlot(wikiOutput.parse.text)
    })
  .catch(function(error) {
    printError(error);
  });
}

// UI Logic

function handleFormSubmission(event) {
  event.preventDefault();
  clearResults();
  const burgerNumber = document.querySelector('#burger-input').value;
  document.querySelector('#burger-input').value = null;
  getAPIData(burgerNumber);
}

function clearResults() {
  document.querySelector('#burgerId').innerText = null;
  document.querySelector('#burgerName').innerText = null;
  document.querySelector('#burgerPrice').innerText = null;
  document.querySelector('#seasonAndEpisode').innerText = null;
  document.querySelector('#plot').innerText = null;
  document.querySelector('#showError').innerText = null;
}

function printPlot (html) {
  const plot = parseWikiForPlot(html);
  document.querySelector('#plot').innerHTML = plot;
}

function printElements(id, name, price, season, episode) {
  document.querySelector('#burgerId').innerText = id;
  document.querySelector('#burgerName').innerText = name;
  document.querySelector('#burgerPrice').innerText = price;
  document.querySelector('#seasonAndEpisode').innerText = `S${season}E${episode}`;
}

function printError(error) {
  document.querySelector('#showError').innerText = `There was an error accessing the burger data for ${error}`;//${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);
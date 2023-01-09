export default class EpisodeService {  
  static getEpisode(episodeNumber) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bobsburgers-api.herokuapp.com/episodes/${episodeNumber}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, episodeNumber]);
        } else {
          reject([this, response, episodeNumber]);
        }
      }); 
      request.open("GET", url, true);
      request.send();
    });
  }
}
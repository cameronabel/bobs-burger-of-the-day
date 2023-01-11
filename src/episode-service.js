export default class EpisodeService {  
  static getEpisode(episodeNumber) {
    return fetch(`https://bobsburgers-api.herokuapp.com/episodes/${episodeNumber}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }   
      })
      .catch(function(error) {
        return error;
      });
  }
}
export class WikiService {  
  static getWikiText(episodeName) {
    return fetch(`http://${process.env.HOST}:${process.env.PORT}/bobs-burgers.fandom.com/api.php?action=parse&format=json&page=${episodeName}&formatversion=2`)
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

export function parseWikiForPlot(html) {
  const re = new RegExp(/id="Plot">Plot<\/span>.+\n<p>([\s\S]+)<\/p>\n<h2>/);
  //console.log(html);
  const plot = html.match(re)[1];
  return plot;
}
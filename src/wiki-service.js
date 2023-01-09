console.log(process.env.HOST)

export class WikiService {  
  static getWikiText(episodeName) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://${process.env.HOST}:${process.env.PORT}/bobs-burgers.fandom.com/api.php?action=parse&format=json&page=${episodeName}&formatversion=2`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, episodeName]);
        } else {
          reject([this, response, episodeName]);
        }
      });
      request.open("GET", url, true);
      request.send(); 
    });
  }
}

export function parseWikiForPlot(html) {
  const re = new RegExp(/id="Plot">Plot<\/span>.+\n<p>([\s\S]+)<\/p>\n<h2>/);
  //console.log(html);
  const plot = html.match(re)[1];
  return plot;
}
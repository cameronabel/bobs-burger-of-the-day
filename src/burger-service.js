export default class BurgerService {  
  static getBurger(burgerNumber) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${burgerNumber}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, burgerNumber]);
        } else {
          reject([this, response, burgerNumber]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}
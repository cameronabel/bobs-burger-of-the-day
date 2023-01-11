export default class BurgerService {  
  static getBurger(burgerNumber) {
    return fetch(`https://bobsburgers-api.herokuapp.com/burgerOfTheDay/${burgerNumber}`)
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
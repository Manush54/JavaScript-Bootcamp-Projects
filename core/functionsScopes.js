let movie = 'Amadeus';
function outer() {
  
    function inner() {
      let movie = "The Shining";
  
      function extraInner() {
        //movie is not defined in this function
        //but it has access to parent function's variables
        console.log(movie.toUpperCase())
      }
      extraInner();
    }
    console.log(movie)  // Executed First
    inner();  // Executed second
  }
  
  outer(); //'AMADEUS'
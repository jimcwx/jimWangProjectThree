$(function() {
  //Declaring Variables
  

  const player = {};

  const weapons = [
    {
      name: "axe",
      damage: 5,
      critical: 6,
    },
    {
      name: "sword",
      damage: 4,
      critical: 7,
    },
    {
      name: "bow",
      damage: 3,
      critical: 8,
    }
  ]


  //This is a search function where the parameters will be a nameKey(string) and myArray(array) where it searches through the objects inside myArray and returns the object where the value of the name property matches the nameKey.
  function search(nameKey, myArray) {
    for (let i=0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  }

  //When the user clicks enter after entering their name, Everything in the below callback function happens.
  $("form.playerName").on("submit", function(event) {
    event.preventDefault();
    //Populating the player object with a name
    player.name = $("input.playerName").val();
    
    $(this).toggleClass("hideYesFootprint")
    
  })



})
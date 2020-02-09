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
  ];


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

    //this checks if the user entered anything;
    if ($("input.playerName").val()) {
      event.preventDefault();
      //Populating the player object with a name
      player.name = $("input.playerName").val();
  
      //This hides the form where the user entered their player name
      $(this).toggleClass("hideYesFootprint");
  
      //This adds the line asking the player to pick their weapon;
      $(".selectionMessage").text(`
        Welcome ${player.name}, Please Select your weapon.
      `);
      
      //This reveals the weaponSelection to the player
      $(".weaponSelection").toggleClass("hideNoFootprint");
      //This scrolls to the bottom of the page
      $('html,body').animate({ scrollTop: 9999 }, 'slow');

    }

  })

  



})
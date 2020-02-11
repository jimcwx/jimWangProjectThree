$(function() {
  //Declaring Variables
  

  const player = {
    health: 100,
  };

  const monster = {
    health: 100,
    name: "Donald",
    weapon: {
      name: "mean tweets",
      damage: 3,
      critical: 5,
    }
  }

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
  //Random Interger generater between 0 to max where max is a parameter that will be filled with a number value
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

      //Populating text tags for the name and health on the battle screen
      $(".battle .hero h3").text(`${player.name}`);
      $(".battle .monster h3").text(`${monster.name}`);

  
      //This adds the line asking the player to pick their weapon;
      $(".selectionMessage").text(`
        Welcome ${player.name}, Please Select your weapon.
      `);
      
      //This hides away the Initial name entering screen and reveals the weaponSelection to the player
      $("header").fadeOut(1500, function() {
        $(".weaponSelection").fadeIn(1500);
      })
      
      
      //This scrolls to the bottom of the page
      $('html,body').animate({ scrollTop: 9999 }, 'slow');

    }

  })

  //This runs the above callback function when enter key is hit instead of a mouse click
  $(".weaponSelection li").keydown(function (event) {
    if (event.which === 13) {
      $(this).click();
    }
  });

  //A callback function that happens when a weapon is selected
  $(".weaponSelection li").on("click", function(){
    //adding the weapon object to the player object
    //name of the weapon the player picked
    const weaponName = $(this).attr("id");
    const userConfirmation = confirm(`You are about to select the ${weaponName}, are you sure?`);
    //Checking if the user is sure about their weapon choice to counter-act accidental clicks.
    if (userConfirmation) {
      //searching through the weapons array for the correct weapon to add to the player object
      const playerWeapon = search(weaponName, weapons);
      player.weapon = playerWeapon;

      //populating the text tags in the battle section of the document
      $(".selectionMessage").text(`
        Well then ${player.name}, with your ${player.weapon.name} in hand it's time to start the battle!!
      `);
      $(".battle .hero p span").text(`${player.health}/100`);
      $(".battle .monster p span").text(`${monster.health}/100`);
      
      //Hiding away the weapon selection and brings forth the battle screen
      $(".weaponSelection").fadeOut(1500, function() {
        $(".battle").fadeIn(1500);
      })
      
      $('html,body').animate({ scrollTop: 9999 }, 'slow');
    }


  })

  function letsBattle(playerObject, monsterObject) {
    const playerCriticalFactor = getRandomInt(3);
    const monsterCriticalFactor = getRandomInt(3);
    let playerDamageToTake;
    let monsterDamageToTake;
    //the below code makes it so that whenever the random interger generates the interger 2, the critical property is used as the damage instead of the damage property. The overall resulting integers could only be either 0, 1, or 2 therefore the chance of hitting 2 is 1/3. I am also populating the p tags showing the damage events on the document.
    if (playerCriticalFactor === 2) {
      monsterDamageToTake = playerObject.weapon.critical;
      $(".battle .events .heroAttack").text(`${playerObject.name} critically strikes ${monsterObject.name} with their ${playerObject.weapon.name} for ${monsterDamageToTake} damage.`)
    } else {
      monsterDamageToTake = playerObject.weapon.damage;
      $(".battle .events .heroAttack").text(`${playerObject.name} attacks ${monsterObject.name} with their ${playerObject.weapon.name} for ${monsterDamageToTake} damage.`)
    }
    if (monsterCriticalFactor === 2) {
      playerDamageToTake = monsterObject.weapon.critical;
      $(".battle .events .monsterAttack").text(`${monsterObject.name} critically strikes ${playerObject.name} with their ${monsterObject.weapon.name} for ${playerDamageToTake} damage.`)
    } else {
      playerDamageToTake = monsterObject.weapon.damage;
      $(".battle .events .monsterAttack").text(`${monsterObject.name} attacks ${playerObject.name} with their ${monsterObject.weapon.name} for ${playerDamageToTake} damage.`)
    }
    
    //Below I will subtract the damage from the health for both battling objects and then update the health text on the document.
    monsterObject.health = monsterObject.health - monsterDamageToTake;
    playerObject.health = playerObject.health - playerDamageToTake;
    $(".battle .hero p span").text(`${playerObject.health}/100`);
    $(".battle .monster p span").text(`${monsterObject.health}/100`);
    
    //Below we go to the end game screen when either the playerObject or the monsterObject reaches 0 health
    if (playerObject.health <= 0) {
      $(".battle").fadeOut(1500, function() {
        $(".endScreen.loserScreen").fadeIn(1500)
      });
      
    } else if (monsterObject.health <= 0) {
      $(".battle").fadeOut(1500, function () {
        $(".endScreen.victoryScreen").fadeIn(1500)
      });
    }

  }

  
  
  //When the user clicks or hits enter on the attack button, the player object will battle the monster object
  $("form.attack").on("submit", function(event) {
    event.preventDefault();
    letsBattle(player, monster);
    $('html,body').animate({ scrollTop: 9999 }, 'slow');
  })
  
  
  //When the user clicks play again the entire page will hard refresh
  $("form.playAgain").on("submit", function(event) {
    location.reload(true);
  })

})
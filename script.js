$(function() {
  //Declaring Variables
  let battleCounter = 0;

  
  const player = {
    health: 100,
  };

  const monsters = [
    {
      health: 100,
      name: "Donald",
      weapon: {
        name: "mean tweets",
        damage: 1,
        critical: 3,
    },
      url:"./assets/donald.png"
    },
    {
      health: 100,
      name: "Vlad",
      weapon: {
        name: "polonium poison",
        damage: 1,
        critical: 3,
      },
      url: "./assets/vlad.png"
    }
]

  let monsterToFight;

  const bossMonster = {
    health: 100,
    name: "Late-stage Capitalism",
    weapon: {
      name: "trickle down economy",
      damage: 3,
      critical: 5
    },
    url:"./assets/lateStageCapitalism.png"
  }

  const weapons = [
    {
      name: "axe",
      damage: 5,
      critical: 6,
      url: "./assets/axe.png",
      alt: "An axe, freshly sharpened, ready to taste blood",
    },
    {
      name: "sword",
      damage: 4,
      critical: 7,
      url:"./assets/sword.png",
      alt: "Silver sword with a blue hilt, shiny, majestic",
    },
    {
      name: "bow",
      damage: 3,
      critical: 8,
      url:"./assets/bow.png",
      alt: "A wooden bow, if you listen closely it's humming with killing intent"
    }
  ];

  const weaponsToDrop = [
    {
      name: "halberd",
      damage: 6,
      critical: 8,
      url: "./assets/halberd.png",
      alt: "A shiny halberd, you feel stronger just by staring at it"
    },
    {
      name: "crossbow",
      damage: 5,
      critical: 10,
      url: "./assets/crossbow.png",
      alt: "A finely tuned and calibrated crossbow, capable of killing from a long distance"
    },
    {
      name: "katana",
      damage: 4,
      critical: 15,
      url: "./assets/katana.png",
      alt: "A curved, single edged blade with a long grip to accommodate two hands"
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

      randomMonsterIndex = getRandomInt(monsters.length);
      monsterToFight = monsters[randomMonsterIndex];

      //Populating text and img tags for the name and health on the battle screen
      $(".battle .hero h3").text(`${player.name}`);
      $(".battle .monster h3").text(`${monsterToFight.name}`);
      $(".battle .monster img").attr("src", `${monsterToFight.url}`);

  
      //This adds the line asking the player to pick their weapon;
      $(".selectionMessage").text(`
        Welcome ${player.name}, Please Select your weapon.
      `);
      
      //This hides away the Initial name entering screen and reveals the weaponSelection to the player
      $("header").fadeOut(1500, function() {
        $(".weaponSelection").fadeIn(1500);
      })
    } else {
      event.preventDefault();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your name"
      })
    }
  })

  //This runs the above callback function when enter key is hit instead of a mouse click
  $(".weaponSelection li").keyup(function (event) {
    if (event.which === 13) {
      $(this).click();
    }
  });
  $(".weaponDrop li").keyup(function (event) {
    if (event.which === 13) {
      $(this).click();    
    }
  });

  //A callback function that happens when a weapon is selected
  $(".weaponSelection li").on("click", function(){
    //adding the weapon object to the player object
    //name of the weapon the player picked
    const weaponName = $(this).attr("id");
    
    //Using sweetAlert2 to deal with user confirming their weapon
    Swal.fire({
      icon: 'warning',
      text: `You are about to choose ${weaponName}, are you sure?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: "d33",
      confirmButtonText: "Yes",
    }).then(function(result) {
      if (result.value) {
        //searching through the weapons array for the correct weapon to add to the player object
        const playerWeapon = search(weaponName, weapons);
        player.weapon = playerWeapon;

        //populating the text tags in the battle section of the document
        $(".selectionMessage").text(`
        Well then ${player.name}, with your ${player.weapon.name} in hand it's time to start the battle!!
      `);
        $(".battle .hero p span").text(`${player.health}`);
        $(".battle .monster p span").text(`${monsterToFight.health}`);

        //Hiding away the weapon selection and brings forth the battle screen
        $(".weaponSelection").fadeOut(200, function () {
          $(".battle").fadeIn(1500);
        })
      }
    })
  });

  //A callback function that happens when the player selects either the dropped weapon or keeps the original weapon.
  $(".weaponDrop li").on("click", function() {

    const weaponName = $(this).children("h3").text();
    //Using sweetAlert2 to deal with user confirming their weapon
    Swal.fire({
      icon: 'warning',
      text: `You are about to choose ${weaponName}, are you sure?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: "d33",
      confirmButtonText: "Yes",
    }).then(function (result) {
      if (result.value) {
        //searching through the weapons array for the correct weapon to add to the player object

        if (search(weaponName,weapons)) {
          const playerWeapon = search(weaponName, weapons);
          player.weapon = playerWeapon;
  
          //populating the text tags in the battle section of the document
          $(".selectionMessage").text(`
          Well then ${player.name}, with your ${player.weapon.name} in hand it's time to start the battle!!
          `);
          $(".battle .hero p span").text(`${player.health}`);
          $(".battle .monster p span").text(`${bossMonster.health}`);
          $(".battle .monster h3").text(`${bossMonster.name}`);
          $(".battle .monster img").attr("src", `${bossMonster.url}`);
          $(".battle .monster img").attr("alt", `${bossMonster.alt}`);
          $(".battle .events .heroAttack").text(" ");
          $(".battle .events .monsterAttack").text(" ");
          //Hiding away the weapon selection and brings forth the battle screen
          $(".weaponDrop").fadeOut(200, function () {
            $(".battle").fadeIn(1500);
          })

        } else {
          const playerWeapon = search(weaponName, weaponsToDrop);
          player.weapon = playerWeapon;
          //populating the battle page
          $(".selectionMessage").text(`
          Well then ${player.name}, with your ${player.weapon.name} in hand it's time to start the battle!!
          `);
          $(".battle .hero p span").text(`${player.health}`);
          $(".battle .monster p span").text(`${bossMonster.health}`);
          $(".battle .monster h3").text(`${bossMonster.name}`);
          $(".battle .monster img").attr("src", `${bossMonster.url}`);
          $(".battle .monster img").attr("alt", `${bossMonster.alt}`);
          $(".battle .events .heroAttack").text(" ");
          $(".battle .events .monsterAttack").text(" ");
          //Hiding away the weapon selection and brings forth the battle screen
          $(".weaponDrop").fadeOut(200, function () {
            $(".battle").fadeIn(1500);
          })
        }
      }
    })


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
    $(".battle .hero p span").text(`${playerObject.health}`);
    $(".battle .monster p span").text(`${monsterObject.health}`);

    //We will add background animation to indicate the player that their health is low or critically low

    if (playerObject.health <= 50) {
      $("body").addClass("lowHealth");
      $(".selectionMessage").text(`
      Watchout ${player.name}, your health is getting low`);
      };
    if (playerObject.health <= 25) {
      $("body").removeClass("lowHealth").addClass("veryLowHealth");
      $(".selectionMessage").text(`
      ${player.name}, pray to Yog-sa-zoth because your health is dangerously low!`);
    };

    
    //Below we go to the user fail screen if they reach 0 health, we go to the weapon drop screen if the battleCounter is less than 1, and we go to victory screen when the battleCounter is greater or equal to 1.

    if (playerObject.health <=0 && monsterObject.health <=0) {
      //removing the animated background
      $("body").removeClass("lowHealth");
      $("body").removeClass("veryLowHealth");

      $(".battle").fadeOut(200, function () {
        $(".endScreen.tieScreen").fadeIn(1500)
      });
    }else if (playerObject.health <= 0) {
      //removing the animated background
      $("body").removeClass("lowHealth");
      $("body").removeClass("veryLowHealth");
      
      $(".battle").fadeOut(200, function() {
        $(".endScreen.loserScreen").fadeIn(1500)
      });
      
    } else if (monsterObject.health <= 0 && battleCounter >= 1) {
      //removing the animated background
      $("body").removeClass("lowHealth");
      $("body").removeClass("veryLowHealth");
      $(".battle").fadeOut(200, function () {
        $(".endScreen.victoryScreen").fadeIn(1500)
      });
    } else if (monsterObject.health <= 0 && battleCounter < 1) {

      battleCounter++;

      $(".battle").fadeOut(200, function () {
        //Changing the picture on the battle page
        $(".characters .monster .imgContainer img").attr("src", `${bossMonster.url}`);
        //Randomizing which weapon to drop and then populating the weaponDrop page
        const weaponDropId = getRandomInt(weaponsToDrop.length);
        $(".weaponDrop .oldWeapon h3").text(`${player.weapon.name}`);
        $(".weaponDrop .oldWeapon .damage").text(`${player.weapon.damage}`);
        $(".weaponDrop .oldWeapon .critical").text(`${player.weapon.critical}`);
        $(".weaponDrop .oldWeapon img").attr("src",`${player.weapon.url}`);
        $(".weaponDrop .oldWeapon img").attr("alt", `${player.weapon.alt}`);
        $(".weaponDrop .newWeapon h3").text(weaponsToDrop[weaponDropId].name);
        $(".weaponDrop .newWeapon .damage").text(weaponsToDrop[weaponDropId].damage);
        $(".weaponDrop .newWeapon .critical").text(weaponsToDrop[weaponDropId].critical);
        $(".weaponDrop .newWeapon img").attr("src", `${weaponsToDrop[weaponDropId].url}`);
        $(".weaponDrop .newWeapon img").attr("alt", `${weaponsToDrop[weaponDropId].alt}`);
        $(".weaponDrop").fadeIn(1500);
      })
    }
  }
  //When the user clicks or hits enter on the attack button, the player object will battle the monster object
  $("form.attack").on("submit", function(event) {
    event.preventDefault();
    if (battleCounter < 1) {
      letsBattle(player, monsterToFight);
    } else {
      letsBattle(player, bossMonster);
    }
  });
  
  //When the user clicks play again the entire page will hard refresh
  $("form.playAgain").on("submit", function(event) {
    event.preventDefault();
    location.reload(true);
  });
})
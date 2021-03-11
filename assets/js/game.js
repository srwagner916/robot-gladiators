// Game Functions

// function to start a new game
var startGame= function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for(var i = 0; i < enemyInfo.length; i++) {
    //check player stats
    console.log(playerInfo);

    // if player is still alive, keep fighting
    if(playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      console.log(pickedEnemyObj);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if player is still alive and we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          // ask if player wants to use the store before next round
          var storeConfirm = window.confirm("the fight is over, visit the store before the next round?");
          
          // if yes, take them to the store() function
          if (storeConfirm) {
            shop();
        }
      }
    }
    //if player is not alive, break out of the loop and let endGame function run
    else {
      break;
    }
  }
  
  // after loop ends, we are either out of player.health or enemies to fight, so run the endGame function
      endGame();
    };

// funtion to end the entire game
var endGame = function() {
  // if player is till alive, player wins!
  if ( playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + Math.max(0, playerInfo.money) + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

// ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//fight function

// fight function
var fight = function(enemy) {
  // repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {
      if (fightOrSkip()) {
      // if ture, leave fight by breaking loop
        break;
      }
      // generate random damage value based on player's attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );
      
      //check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
  
        //leave while () loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
       } 
  
       //generate random damage value based on enemy's attack power
       var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
       playerInfo.health = Math.max(0, playerInfo.health - damage);
       console.log(
         enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
       );
  
      //check player's health
      if (playerInfo.health <=0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
  };



//shop function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or leave the store?  Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
  
      //increase health and decrease money
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
    }
  };


// function to set name
var getPlayerName = function() {
  var name = "";
  while (name=== "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("'Your robots name is'" + name);
  return name;
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

// function to check if player wants to fight or skip
var fightOrSkip = function() {
  // ask player if they'd like to fight or skip using fightOrSkip fuction
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose');

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  // change value of promptFight to lowercase
  promptFight = promptFight.toLowerCase();
  // if player picks "skip confirm and then stop the loop
  if (promptFight === "skip") {
    //CONFIRM PLAYER WANTS TO SKIP
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
      // return true if player wants to leave
      return true;
    }
  }
  return false;
};

// GAME INFORMATION / VARIABLE /  
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack - 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];
// start the game when the page loads
startGame();
// debugger;

// wrap the game logic in a startGame() function
// When the player is defeated or there are no more enemies, call and endGame() function that:
//  - Alerts the player's total stats
//  - Asks the player if they want to play again
//  - If yes, call startGame() to restart the game

// After the player skips or defeats an enemy (and there are still more robots to fight):
//  - Ask the player if they want to "shop"
//  - if no, continue as normal
//  - if yes, call the shop() function
//  - in the shop() function, ask player if they want to "refill" health, "upgrade" attack, or "leave" the shop
//  - if refill, subtract money points from player and increase health
//  - if upgrade, subtract money points from player and increase attack power
//  -if leave, alert goodbye and exit the function
//  - if any other invalid option, call shop() again

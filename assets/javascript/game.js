$ (document).ready(function() {
    var characters = {
        "Obi-Wan Kanobi":  {
            name: "Obi-Wan Kanobi", 
            icon: "assets/images/obi.jpg",
            health: 120,
            damage: 13,
            counterAtk: 10
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            icon: "assets/images/luke.jpg",
            health: 100,
            damage: 40,
            counterAtk: 25
        },
        "Darth Vader": {
            name: "Darth Vader",
            icon: "assets/images/vader.jpeg",
            health: 300,
            damage: 25,
            counterAtk: 15
        },
        "Darth Maul": {
            name: "Darth Maul",
            icon: "assets/images/maul.jpg",
            health: 180,
            damage: 10,
            counterAtk: 10
        }
    }
var attacker;

var bench = [];

var defender;

var turn = 1;

var kills = 0;


function showCharacters(character, renderarea) {
    var characterDiv = $("<div class='character' data-name='" + character.name + "'>")
    var charName = $("<div class='character-name'>").text(character.name)
    var icon = $("<img alt='pic of char' class='character-img'>").attr("src", character.icon)
    var health = $("<div class='character-health'>").text(character.health)
    characterDiv.append(charName).append(icon).append(health)
    $(renderarea).append(characterDiv)
}

function startGame() {
    for (var key in characters) {
        showCharacters(characters[key], "#characterSelect")
    }
}

startGame()

function updateChar(character, arearender) {
    $(arearender).empty()
    showCharacters(character, arearender)
}

function showEnemy(defenders) {
    for (var key = 0; key < defenders.length; key++) {
        showCharacters(defenders[key], "#showEnemies")
    }
}

function message(message) {
    var messageArea = $("#fightInfo")
    var newMessage = $("<div>").text(message)
    messageArea.append(newMessage)
}

function restart(resultMessage) {
    var restartBtn = $("<button id='restartbtn'>RESTART</button>").click(function(){
        location.reload()
    })
    $("<div id='message'>").text(resultMessage)
    $("body").append(restartBtn)
    $("body").append(resultMessage)
}

function clearMessage() {
    var messageArea = $("#fightInfo")
    messageArea.empty()
}

// ########################################################################################

$ ("#characterSelect").on("click", ".character", function() {
    var storeName = $(this).attr("data-name")
    console.log(storeName)
    if (!attacker) {
        attacker = characters[storeName]
        for (var key in characters) {
            if (key !== storeName) {
                bench.push(characters[key])
            }
        }
        $("#characterSelect").hide()
        updateChar(attacker, "#characterPick")
        showEnemy(bench)
        $("#charSelect").empty()
    }
}) 

$ ("#showEnemies").on("click", ".character", function() {
    var nameStore = $(this).attr("data-name")
    if ($("#defender").children().length === 0) {
        defender = characters[nameStore]
        updateChar(defender, "#defender")
        $(this).remove()
        clearMessage()
    } 
})

$ ("#btn").on("click", function() {
    if ($("#defender").children().length !== 0) {
        var atckmsg = "You attacked " + defender.name + " for " + attacker.damage * turn + " damage."
        var countermsg = defender.name + " attacked you back for " + defender.counterAtk + " damage."
        clearMessage()
        defender.health -= attacker.damage * turn
        if (defender.health > 0) {
            updateChar(defender, "#defender")
            message(atckmsg)
            message(countermsg)
            attacker.health -= defender.counterAtk
            updateChar(attacker, "#characterPick")
            if (attacker.health <= 0) {
                clearMessage()
                restart("You suck! You lost!")
                $("#btn").off("click")
            }
        }
        else {
            $("#defender").empty()
            var defeatmsg = "You have defeated " + defender.name + ". You can choose to defeat another enemy."
            message(defeatmsg)
            kills++
            if (kills >= bench.length) {
                clearMessage()
                $("#btn").off("click")
                restart("You won!!! The force is with you!!!")
            }
        }
        turn++
    }
    else {
        clearMessage()
        message("Nobody is here to attack! Pick a defender.")
    }
})
})


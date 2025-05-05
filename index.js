/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    var count = 0
    // loop over each item in the data
    for(let item of games){
         // create a new div element, which will become the game card
        const game = `<div class="game-card">
                <img class="game-img" src = ${item.img} alt= ${item.name}></img>
                <p><b>${item.name}</b></p>
                <p>${item.description}</p>
                <p>Backers: <b>${item.backers}</b></p>
            </div>`;

        gamesContainer.innerHTML += game;

    }

    


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
function calculateTotalContributions(games){
    const totalContribution= games.reduce((t,game) => {
        return t+game.backers;
    },0);

    console.log(`calculated contribution ${totalContribution}`);
    const total =`<p><b>${totalContribution}</b></p>`;
    contributionsCard.innerHTML = total;
    };
calculateTotalContributions(GAMES_JSON);   


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
function calculateTotalRaised(games){
    const totaRaised= games.reduce((t,game) => {
        return t+game.pledged;
    },0);

    console.log(`calculated raised ${totaRaised}`);
    const total =`<p>$<b>${totaRaised}</b></p>`;
    raisedCard.innerHTML = total;
    return totaRaised;
    }

const totalRaised = calculateTotalRaised(GAMES_JSON);
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

function calculateTotalgames(games){
    var count = 0;
    for(let {} of games){
        count+=1;
    }
    const total = `<p><b>${count}</b></p>`;
    gamesCard.innerHTML = total;
}

var totalGames = calculateTotalgames(GAMES_JSON);
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    console.log("unfunded");
    deleteChildElements(gamesContainer);
    const games = GAMES_JSON.filter((game)=> game.pledged < game.goal);
    // use filter() to get a list of games that have not yet met their goal
    // loop over each item in the data
    addGamesToPage(games);
    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    console.log("funded");
    deleteChildElements(gamesContainer);

    const games = GAMES_JSON.filter((game)=> game.pledged >= game.goal);
    // use filter() to get a list of games that have not yet met their goal
    // loop over each item in the data
    addGamesToPage(games);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    console.log("all");
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
fundedBtn.addEventListener("click", filterFundedOnly);
unfundedBtn.addEventListener("click", filterUnfundedOnly);
allBtn.addEventListener("click",showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log(`Unfunded games: ${numUnfundedGames}`);

// create a string that explains the number of unfunded games using the ternary operator
const formattedRaised = totalRaised.toLocaleString();

const displaystr = `A total of $${formattedRaised} has been raised for ${totalGames- numUnfundedGames} ${totalGames === 1 ? 'game' : 'games'} currently, ${numUnfundedGames} ${numUnfundedGames === 1 ? 'game remains' : 'games remain'}
remain unfunded. we need your help to fund these amazing games!`


const descriptionElement = document.createElement("p");

descriptionElement.innerText = displaystr;

descriptionContainer.appendChild(descriptionElement);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame,secondGame,...others] = sortedGames;
const { name: fname } = firstGame;

const { name: sname} = secondGame;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstplaceGame = ` <p>${fname}</p>`;

firstGameContainer.innerHTML += firstplaceGame;

// do the same for the runner up item


const secondplaceGame = ` <p>${sname}</p>`;

secondGameContainer.innerHTML += secondplaceGame;

//custome
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function () {
    deleteChildElements(gamesContainer);
    const searchTerm = searchBar.value.toLowerCase();

    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(searchTerm)
    );

    addGamesToPage(filteredGames);
});
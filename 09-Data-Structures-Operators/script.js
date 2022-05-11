'use strict';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIdx, mainIdx) {
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`This is a pasta with ${ing1}, ${ing2} and ${ing3}. Enjoy!`);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

//////////////////////////
// CODING CHALLENGE #4
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

// 입력된 text 데이터 변수 저장 & camelCase 변환 함수 호출
document.querySelector('button').addEventListener('click', function () {
  let text = document.querySelector('textarea').value;
  // camelCase(text);
});

const camelCase = function (text) {
  // 입력 데이터 공백제거 & 엔터 기준으로 잘라서 배열화
  [...text] = text.trim().replaceAll(' ', '').split(/\n/g);

  // 하나씩 반복하며 조건 일치 여부 확인
  let txt = '';
  for (let [i, x] of text.entries()) {
    // x 언더바 불포함 || 언더바 2개 이상
    if (x.indexOf('_') === -1 || x.indexOf('_') !== x.lastIndexOf('_')) {
      alert('언더바(_) 1개를 포함하여 단어를 조합하세요.');
    }
    // 언더바가 단어의 앞,뒤에 있을 경우.
    else if (x.indexOf('_') === 0 || x.lastIndexOf('_') === x.length - 1) {
      alert('언더바(_) 1개를 단어의 중간에 넣어주세요.');
    }

    // x가 중간에 언더바 1개를 포함하는 경우
    // 언더바의 첫번째 인덱스와 마지막 인덱스가 같을 경우 언더바는 1개
    else if (x.indexOf('_') === x.lastIndexOf('_')) {
      const [first, second] = x.toLowerCase().split('_');
      txt = first + second.replace(second[0], second[0].toUpperCase());
    }
    console.log(`${txt.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
};

////////////////////////////////////////////////////
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const airline = 'YES Air ROK';
const plane = 'A320';

// console.log(airline.slice(4, 7));
// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ')));
// console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B & E -> middle seats
  const s = seat.slice(-1);
  let answer = '';
  if (s === 'B' || s === 'C') answer = 'is in middle.';
  else answer = 'is not in middle.';
  console.log(`${seat} ${answer}`);
};

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

//indexOf를 활용해 문자열 특정 단어의 갯수 세기.
const str = 'kinda gooda';
let cnt = 0;
let pos = str.indexOf('a');
while (pos !== -1) {
  cnt++;
  pos = str.indexOf('a', pos + 1);
}
// console.log(cnt);

const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

// console.log(maskCreditCard(3334445599555));
// console.log(maskCreditCard('8344455995552344888000'));

const message2 = 'Bad weather... Alll Departures Delayed... ';
// console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛫'.repeat(n)}`);
};

// planesInLine(5);

//////////////////////////////////////////////
const question = new Map([
  ['question', '세상에서 가장 좋은 프로그래밍 언어는?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, '정답입니다.'],
  [false, '다시!'],
]);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/////////////////////////
// Coding challeng #3
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. Create an array 'events' of the different game events that happened (no duplicates)
const events = new Set([...gameEvents.values()]);
// console.log(events);

//2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64);
// console.log(gameEvents);

//3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)

const eventsTime = [...gameEvents.keys()].pop();
// console.log(
//   `An event happened, on average, every ${eventsTime / gameEvents.size} minutes`
// );

// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

for (let [min, event] of gameEvents) {
  let half = min <= 45 ? 'FIRST' : 'SECOND';
  // console.log( `[${half} HALF] ${min} : ${event}`);
}

/////////////////////////
// console.log(question.get('question'));
// for (let [key, val] of question) {
//   if (typeof key === 'number') console.log(`Anser ${key}: ${val}`);
// }

// const answer = Number(prompt('정답을 입력하세요'));
// console.log(question.get(answer === question.get('correct')));

// const newRestaurant = {
//   foundedIn : 2022,
//   ...restaurant,
//   founder : 'Hyejung'
// };
// // console.log(newRestaurant);

// const restaurantCopy = {
//   ...restaurant
// };
// restaurantCopy.name = 'A Brand New Restaurant';
// console.log(restaurant.name,restaurantCopy.name);

// const ingredients = [
//   prompt('ing1?'),
//   prompt('ing2?'),
//   prompt('ing3?')
// ];

// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// const [menuA, menuB] =  restaurant.order(2,0);
// console.log(menuA, menuB);

// const {fri : {open, close}} = restaurant.openingHours;

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// const newMenu = [...restaurant.mainMenu, '떡볶이'];
// // console.log(newMenu);

// const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// // console.log(allMenu);

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

///////////////////////////////////////
// 111. The for-of Loop
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for(let [idx,i] of menu.entries()) {
//   console.log(`${idx+1} : ${i}`);
// }

///////////////////////////////////////
// 112. Enhanced Object Literals.

// const YES = {
//   yes1 : ['oh,yes', 'yes, I love it'],
//   age : [1, 2]
// };

// const answer = {
//   No : {
//     no1 : ['oh,no', 'nooowww'],
//     [`age ${1+1}`] : [3, 4]
//   },
//   YES,
//   saying(num){
//     console.log(this.No.no1[num]);
//   }
// };
// // answer.saying(1);
// console.log(answer);

///////////////////////////////////////
// 113. Optional Chaining (.?)

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for(let day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`${day} : ${open}`);
// }

///////////////////////////////////////
// 114. Loopig Objects.

// Property Names
// const properties = Object.keys(openingHours);
// let openStr = `저희 가게는 주 ${properties.length}회 영업합니다. :`;
// for(let day of properties){
//   openStr += ` ${day} `;
// }
// // console.log(openStr);

// // Property Values
// const values = Object.values(openingHours);
// for(let hours of values){
//   // console.log(hours);
// }

// // Entries
// const entries = Object.entries(openingHours);

// for(let [key, {open, close}] of entries){
//   let str = `On ${key}, we open at ${open} and close at ${close}.`;
//   console.log(str);
// }

///////////////////////////////////////
// 115. Coding Challenge #2.

// 1.
const [players1, players2] = game.players;
// console.log(players1,players2);

// 2.
const [gk, ...fieldPlayers] = players1;
// console.log(gk,fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// 4. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
const plyaers1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(plyaers1Final);

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const { team1, x: draw, team2 } = game.odds;
// console.log(team1,draw,team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
};

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
// team1 < team2 && console.log('Team1 is more likely to win.');
// team1 > team2 && console.log('Team2 is more likely to win.');

//Let's continue with our football betting app!

/*


*/

// // 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// for(let i = 0; i < game.scored.length; i++){
//   console.log(`Goal ${i+1}: ${game.scored[i]}`);
// }

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const oddValues = Object.values(game.odds);
let avgOdds = 0;
for (let val of oddValues) {
  avgOdds += val;
}
avgOdds = avgOdds / oddValues.length;
// console.log(avgOdds);

// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

const oddsEntries = Object.entries(game.odds);
for (let [team, val] of oddsEntries) {
  let teamName = team === 'x' ? 'draw' : `victory ${game[team]}`;
  // console.log(`Odd of ${teamName}: ${val}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// const scorers = {};
// for(let player of game.scored){
//   scorers[player] ? scorers[player]++ : (scorers[player] = 1);
// }
// console.log(scorers);

// Sets
const staff = ['Waiter', 'Chef', 'Chef', 'Manager', 'Waiter'];
const staffSet = [...new Set(staff)];
// console.log(staffSet);
// console.log(new Set('Hyejung').size);

// Maps
const rest = new Map();
rest.set('name', '정통 분식집');
rest.set(1, '경복궁 한옥마을');
// console.log(rest.set(2, '전북 익산 익룡마을'));

rest
  .set('categories', ['떡볶이', '치킨마요덮밥', '떡꼬치', '정통순대'])
  .set('open', 11)
  .set('close', 21)
  .set(true, '오늘 영업 합니다.')
  .set(false, '오늘은 쉽니다.');

// console.log(rest.get(true));

const time = new Date().getHours();
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

'use strict';


//function declaratoin
// function makeJuice(apple,grape) {
//     // console.log(apple,grape);
//     const juice = `This Juice contains ${apple} apples, ${grape} grapes`;
//     return juice;
// }

// const juice = makeJuice(3,5);
// console.log(juice);

//Function Declaration
// function calcAge1(birthyear) {
//     return 2022 - birthyear;
// }
// const age1 = calcAge1(1997);
// console.log(age1);

// //Function Expression
// const calcAge2 = function(birthyear) {
//     return 2022- birthyear;
// }
// console.log(calcAge2(1997));

// //Arrow function
// const age = birthyear => 2022 - birthyear;
// console.log(age(1997));

// const ageUntilRetirement = (birthyear,firstName) => {
//     const age = 2022 - birthyear;
//     const retirementAge = 65 - age;
//     return `${firstName} retires in ${retirementAge} years`;
// }
// console.log(ageUntilRetirement(1997,'hyejung'));

// //funtions calling other functions
// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apple,orange) {
//     const applePieces = cutFruitPieces(apple);
//     const orangePieces = cutFruitPieces(orange);
//     return `Apple pieces : ${applePieces} and orange pieces : ${orangePieces}`;
// }

// console.log(fruitProcessor(3,4));

///////////////////////////////////////
// Coding Challenge #1

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀
*/

// const calcAverage = (s1,s2,s3) => (s1+s2+s3)/3;

// const avgD = calcAverage(85,54,41);
// const avgK = calcAverage(23,34,27);

// const checkWinner = (avgD,avgK) => {
//     if (avgD >= 2*avgK) {
//         return `Dolphins win (${avgD}:${avgK})`;
//     } else if (avgK >= 2*avgD) {
//         return `Koalas win (${avgK}:${avgD})`;
//     } else {
//         return `No team win ((${avgD}:${avgK}))`;
//     }
// }

// console.log(checkWinner(avgD,avgK));

//////Arrays -1 
// const years = [2022,1890,1966-20];

// const calcAge = function(birthYeah) {
//     return 2022-birthYeah;
// }

// years[years.length-1] = 1987;
// const age = calcAge(years[2]);

// console.log(age);

// //Array operations

// const friends = ['Jacob','Peter','Kaley'];

// const l1 = friends.push('Jason');
// console.log(l1);

// const l2 = friends.unshift('Christin');
// console.log(l2);

// const l3 = friends.pop();
// console.log(l3);

// const l4 = friends.shift();
// console.log(l4);

// const l5 = friends.indexOf('Peter');
// console.log(l5);

// const l6 = friends.includes('Jacob');
// console.log(l6);

// if (friends.includes('Jacob')) {
//     console.log('is your friend');
// } else {
//     console.log('XXX');
// }    

///////////////////////////////////////
// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100.
2. And now let's use arrays! So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀
*/

// const calcTip = function(bill) {
//     return bill >=50 && bill <= 300 ? bill* 0.15 : bill* 0.2;
// }

// const bills = [125,555,44];
// const tips = [calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
// const total = [];

// total.push(bills[0] + tips[0]);
// total.push(bills[1] + tips[1]);
// total.push(bills[2] + tips[2]);

// console.log(bills);
// console.log(tips);
// console.log(total);

// const hyejung = {
//     firstName : 'Hyejung',
//     lastName : 'Park',
//     age : 2022-1997,
//     loves : ['Cat','Web']
// }

// // console.log(hyejung);

// //Challenge 
// // "Hyejung loves 2 things, and her most favorite one is Cat."

// console.log(
//     `${hyejung.firstName} loves ${hyejung.loves.length} things, and her most favorite one is ${hyejung.loves[0]}.`
// );

// const nameKey = 'Name';
// console.log(hyejung['first'+ nameKey]);

////Challenge #2
// const hyejung = {
//     firstName : 'Hyejung',
//     lastName : 'Park',
//     birthYear : 1997,
//     loves : ['Cat','Web'],
//     hasDriversLicense : true,
//     calcAge : function() {
//         const age = 2022-this.birthYear;
//         return age;
//     },
//     getSummary : function() {
//         console.log(
//             `${this.firstName} is ${this.calcAge()}-year old who loves ${this.loves[0]}, and she has ${
//                 this.hasDriversLicense ? 'a' : 'no'} driver's license.`
//         )
//     }
// }

// hyejung.getSummary();

///////////////////////////////////////
// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method.
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"

TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

GOOD LUCK 😀
*/

// const mark = {
//     firstName : 'Mark',
//     lastName : 'Miller',
//     mass : 78,
//     height : 1.69,
//     calcBMI : function() {
//         this.BMI = Math.round(this.mass / this.height**2);
//         return this.BMI;
//     }
// }

// const john = {
//     firstName : 'John',
//     lastName : 'Smith',
//     mass : 92,
//     height : 1.95,
//     calcBMI : function() {
//         this.BMI = Math.round(this.mass / this.height**2);
//         return this.BMI;
//     }
// }

// mark.calcBMI();
// john.calcBMI();

// if (mark.BMI > john.BMI) {
//     console.log (
//         `${mark.firstName+mark.lastName}'s BMI (${mark.BMI}) is higher than ${john.firstName+john.lastName}'s BMI (${john.BMI})`
//     );
// } else {
//     console.log (
//         `${john.firstName+john.lastName}'s BMI (${john.BMI}) is higher than ${mark.firstName+mark.lastName}'s BMI (${mark.BMI})`
//     );
// }

////for loop
// for(let i = 0; i <= 10; i+=2) {
//     console.log(
//         `now, i is ${i}`
//     );
// }

// const friends = [
//     'Jacob',
//     'Peter',
//     'Kaley'
// ];

// for(let i = friends.length-1; i >=0; i--) {
//     console.log(i,friends[i]);
// }

// for (let i = 1; i <=5; i++) {
//     console.log(`-------Stage ${i}`);
//     for (let t = 1; t <= 3; t++) {
//         console.log(`iteraion ${t}times : stage ${i}`);
//     }
// }

// let dice = Math.ceil(Math.random()*6);

// while(dice !== 6) {
//     console.log(`Dice : ${dice}`);
//     dice = Math.ceil(Math.random()*6);
//     if (dice === 6) console.log("It's SIX");
// }

///////////////////////////////////////
// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉

4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:
  4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/

const bills = [22,295,176,440,37,105,10,1100,86,52];
const tips = [];
const totals = [];

const calcTip = function(bill) {
    return bill >=50 && bill <= 300 ? bill* 0.15 : bill* 0.2;
}

for(let i = 0; i < bills.length; i++) {
        const tip = calcTip(bills[i])
        tips.push(tip);
        totals.push(bills[i]+tip);
    }
    console.log(`tips:${tips}`);
    console.log(`totals:${totals}`);    

let sum = 0;

const calcAverage = function(arr) {
    for(let i=0 ; i<arr.length; i++) {
        // sum = sum + arr[i];
        sum += arr[i];
    }
    const avg = sum / arr.length;
    console.log(`sum:${sum}`);
    console.log(`avg:${avg}`);    
    return avg;

}
calcAverage(totals);


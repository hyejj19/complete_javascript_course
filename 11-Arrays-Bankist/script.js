'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// NOTE코드 작성

const displayMovments = function (movements) {
  //* 하드코딩 데이터 초기화
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawl';

    // 화면에 표시할 html 내용 -> 동적으로 변경
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--deposit">${
        i + 1
      } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    // 'afterbegin' -> 메서드가 적용될 DOM 요소 안의 가장 첫번째 child
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovments(account1.movements);

/**
 * >> El.innerHTML vs El.insertAdjacentHtml
 * 전자는 기존의 모든 내용을 초기화. 단 html 구조는 유지.
 * 후자는 기존 내용을 유지한 채 새로운 내용을 붙임.
 * El.insertAdjacentHtml(position, 내용) -> position 속성으로 기준 El의 beforebegin, afterbegin, beforeend, afterend 으로 위치를 설정할 수 있다.
 */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//* SIMPLE ARRAY METHODS

// let arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['f', 'g', 'h'];

//* CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]); //* concat과 같은 결과.

//* JOIN
// console.log(letters.join(',')); //* a,b,c,d,e,f,g,h

/////////////////////////////////////////////////
//* THE NEW AT METHOD

// const arr = [23, 11, 44];
// console.log(arr[arr.length - 1]);
// console.log(arr.at(-1)); //* 마지막 요소 가져올 때 더욱 간편하다.

/////////////////////////////////////////////////
//* ForEach 반복

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const mov of movements) {
// for (const [idx, mov] of movements.entries()) {
//   mov > 0
//     ? console.log(`${idx + 1}. 예금: ${mov}`)
//     : console.log(`${idx + 1}. 출금: ${Math.abs(mov)}`);
// }

// movements.forEach(function (mov, idx, arr) {
//   mov > 0
//     ? console.log(`${idx + 1}. 예금: ${mov}, ${arr}`)
//     : console.log(`${idx + 1}. 출금: ${Math.abs(mov)}`);
// });

/**
 * forEach 메서드는 콜백함수를 필요로 하는 고차함수.
 * forEach 메서드가 적용된 배열을 반복하며, 각 반복마다 실행한다.
 * 콜백함수 실행시 배열의 현재 요소, 인덱스, 메서드가 실행중인 배열을 '순서대로' 인자값으로 전달한다.
 * forEach 에서는 break문을 쓸 수 없다.
 */

/////////////////////////////////////////////////
//* ForEach w. Maps & Sets

//* Maps (value, key, map을 인자값으로 전달한다.)
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((val, key, map) => {
//   console.log(`${key}: ${val}`);
// });

//* Sets (set에는 key 값이 없지만 3가지 인자값으로 value, value, 순회중인 set 객체를 전달한다. => array.forEach()와 동일한 형태 유지)
// const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'EUR', 'KRW', 'KRW']);
// currenciesUnique.forEach((val, _, set) => {
//   console.log(`${_}: ${val}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)

2. Create an array with both Julia's (corrected) and Kate's data

3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice(1, -2);
  const bothDogs = [...dogsJuliaCorrect, ...dogsKate];
  bothDogs.forEach((dog, i) => {
    dog >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///////////////////////////////////////
// MAP, FILTER, REDUCE

/** MAP
 * 기존 배열을 하나씩 순회하며, 각 요소를 이용해 콜백함수를 호출
 * 콜백함수의 결과를 모아 새로운 배열을 만든다.
 ** FILTER
 * 조건에 맞는 결과만 모아 새로운 배열을 만든다.
 ** REDUCE
 * 기존 배열을 가지고 새로운 하나의 값을 만든다.
 */

///////////////////////////////////////
// MAP METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//* modern way (함수형 프로그래밍)
const eurToUSD = 1.1;
const movmentsUSD = movements.map(mov => parseInt(mov * eurToUSD));
console.log(movmentsUSD);

const movmentsUSDfor = [];
for (const mov of movements) {
  movmentsUSDfor.push(parseInt(mov * eurToUSD));
}
console.log(movmentsUSDfor);

/*
 *
 */

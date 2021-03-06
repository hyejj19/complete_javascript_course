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

//* user이니셜 속성 추가
/**
 * 함수 밖 전역스코프에서 데이터를 조작하기 보다는, 함수를 통해 넘겨주고 그 안에서 조작하는 것이 더 좋다. (관리측면, 데이터 보호 측면)
 * forEach 메서드 사용 : 새로운 배열보다 원본 데이터의 변형, 조작이 필요할 때.(위 예제의 경우 새로운 속성 추가) -> side effects
 */
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//* UI를 업데이트 하는 함수들을 실행하기 위한 함수
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

//* 계좌 내역 화면 표시
/**
 * >> El.innerHTML vs El.insertAdjacentHtml
 * 전자는 기존의 모든 내용을 초기화. 단 html 구조는 유지.
 * 후자는 기존 내용을 유지한 채 새로운 내용을 붙임.
 * El.insertAdjacentHtml(position, 내용) -> position 속성으로 기준 El의 beforebegin, afterbegin, beforeend, afterend 으로 위치를 설정할 수 있다.
 */
const displayMovements = function (movements, sort = false) {
  // 하드코딩 데이터 초기화
  containerMovements.innerHTML = '';

  // sort
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // 화면에 표시할 html 내용 -> 동적으로 변경
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    // 'afterbegin' -> 메서드가 적용될 DOM 요소 안의 가장 첫번째 child
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//* 각 계좌 총액 속성 추가
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//* 입출금, 이자 총액 화면표시
const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//* 이벤트 핸들러
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // form 내의 btn이 submit 하여 새로고침 되는 것을 방지.
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI & message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Clear Input fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

//* 송금 기능
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    // 송금 실행
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // UI 업데이트
    updateUI(currentAccount);
  }

  // input 창 비우기
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();
});

//* 대출
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // 계좌에 추가
    currentAccount.movements.push(amount);

    // UI 업데이트
    updateUI(currentAccount);
  }
  // input 창 비우기
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//* 계좌 삭제
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //input 창 비우기
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();

    //계좌 삭제
    accounts.splice(index, 1);

    // UI 숨기기
    containerApp.style.opacity = 0;
  }
});
/**
 * findIndex vs indexOf
 * findInex(callback) 콜백함수를 이용해 자세한 컨디션을 조절할 수 있다.
 * indexOf(value) 특정 value의 포함 여부를 확인하므로 자세한 조건을 걸 수 없다.
 * find와 findIndex 메서드 모두 현재 요소, 인덱스, 배열을 인자값으로 쓸 수 있다. (실제 사용 여부는 글쎄), ES6에서 업데이트 된 내용.
 */

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrect = dogsJulia.slice(1, -2);
//   const bothDogs = [...dogsJuliaCorrect, ...dogsKate];
//   bothDogs.forEach((dog, i) => {
//     dog >= 3
//       ? console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`)
//       : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

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

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//* modern way (함수형 프로그래밍)
// const eurToUSD = 1.1;
// const movmentsUSD = movements.map(mov => parseInt(mov * eurToUSD));
// console.log(movmentsUSD);

// const movmentsUSDfor = [];
// for (const mov of movements) {
//   movmentsUSDfor.push(parseInt(mov * eurToUSD));
// }
// console.log(movmentsUSDfor);

//* forEach와 마찬가지로 요소,인덱스,배열을 인자값으로 넘김.
// const movementsStr = movements.map(
//   (mov, idx, arr) =>
//     `${idx + 1}. ${mov > 0 ? '입금' : '출금'}: ${Math.abs(mov)}`

// //if(mov > 0) return `${idx + 1}. 입금: ${Math.abs(mov)}`;
// //else return `${idx + 1}. 출금: ${Math.abs(mov)}`;
// );
// console.log(movementsStr);

/*
 * Map 메서드는 forEach 메서드와 같이 요소, 인덱스, 배열을 순서대로 인자값으로 하여 콜백함수를 실행한다.
 * forEach 메서드는 배열 요소를 이용한 부수효과(side effect)를 목적으로 사용한다.
 * 반면 map 메서드는 원본 배열의 크기를 유지하면서, 요소를 변환하는 목적으로 사용한다.
 * for of 문에서 기존 배열에 push를 하는 방식보다, 콜백함수를 활용한 함수형 프로그래밍 방식이 훨씬 더 modern한 방식이라고 할 수 있다. (QQ함수형 프로그래밍)
 */

///////////////////////////////////////
// FILTER METHOD

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//* fiter 사용
// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);

//* for..of 사용 : 메서드 체이닝(메서드를 연결하여 사용하는 것)을 할 수 없다는 단점.
// const withdrawlsfor = [];
// for (let mov of movements) if (mov < 0) withdrawlsfor.push(mov);
// console.log(withdrawlsfor);

// const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

///////////////////////////////////////
// REDUCE METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let balanceFor = 0;
// for (const mov of movements) balanceFor += mov;
// console.log(balanceFor);

//* 최댓값찾기
// const max = movements.reduce((acc, cur) => {
//   if (acc > cur) return acc;
//   else return cur;
// }, movements[0]);
// console.log(max);

/** reduce 콜백함수의 인자값
 * accumulator : 콜백의 리턴값을 누적 (굴릴수록 커지는 눈사람같은 것..)
 * currentValue : 처리할 현재 요소
 * currentIndex : 현재 요소의 인덱스
 * array : reduce를 호출한 배열
 * + initailValue : 초기값, 콜백 최초 호출에서 첫 번째 인수(acc)에 제공하는 값. 초기값이 없을 경우 배열의 첫 번째 요소를 사용한다.
 * reduce를 사용할 때는 acc가 이 호출에서 어떤 역할을 할 것인지 (합계인지 최댓값인지 등등..) 분명하게 정해야 함.
 * reduce 에서 콜백함수의 리턴값은 acc.
 */

///////////////////////////////////////
// CODING CHALLENGE #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀 
*/

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4));
//   const adultDogs = humanAges.filter(dog => dog >= 18);
//   // const AvgHumanAges = parseInt(
//   //   humanAges.reduce((acc, cur) => acc + cur, 0) / humanAges.length
//   // );
//   const AvgHumanAges = parseInt(
//     humanAges.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
//   );
//   // (2+3)/2 === 2/2 + 2/3
//   return `${humanAges} / ${adultDogs} / ${AvgHumanAges}`;
// };
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

///////////////////////////////////////
// Chaining methods
/**
 * 메서드가 새 배열을 반환하는 한, 메서드를 연속해서 쓸 수 있다.
 * 이런 경우 오류가 발생했을 때 어느 부분인지 알기 어렵다.
 * arr 을 인자로 넘겨 진행상황을 파악해 볼 수 있다.
 */

// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (ages) {
//   return parseInt(
//     ages
//       .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
//       .filter(dog => dog >= 18)
//       .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
//   );
// };

// const result1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const result2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(result1);
// console.log(result2);

///////////////////////////////////////
// Find Method
/**
 * 배열에서 조건에 해당하는 요소를 찾아내는 메서드
 * filter 메서드와 동일하게, boolean 값을 리턴하는 콜백함수를 필요로 한다.
 * 조건에 부합하는 가장 첫번째 요소를 반환한다.
 * 배열이나 객체에 포함된 한 가지의 특징만 알고있으면 그 전체를 찾을 수 있다.
 */

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// let accountRe;
// for (let i = 0; i < accounts.length; i++) {
//   if (accounts[i].owner === 'Jessica Davis') accountRe = accounts[i];
// }
// console.log(accountRe);

///////////////////////////////////////
// Some & Every 메서드
/**
 * includes(v) => v의 일치 여부를 따져 true, false 반환
 * some(콜백) => 콜백함수의 조건에 부합하는 요소가 하나라도 있으면 true 반환
 */

// console.log(movements);

// // 일치 여부 확인
// console.log(movements.includes(-130));

// // SOME: 조건 적합여부 확인 (하나라도 맞으면 TRUE)
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 5000);
// console.log(anyDeposits);

// // EVERY: 조건 적합여부 확인 (모든 것이 맞으면 TRUE)
// console.log(movements.every(mov => !isNaN(mov)));

// 콜백함수 재사용하기
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

///////////////////////////////////////
// flat & flatMap 메서드
/**
 * flat 메서드 : 중첩된 배열의 요소들을 flat 하게 하여 하나의 배열로 리턴
 * flat(depth) : flat하게 만들 뎁스를 전달, 없을 시 기본값으로 1이 셋팅된다.
 * flatMap(콜백) : map으로 얻은 결과물에 flat을 실행한다. (map + flat)
 * flatMap의 경우 1레벨에서의 flat밖에 실행하지 못하기 때문에, 더 깊은 중첩 배열에 적용할 경우 flat과 map을 따로 사용하여야 한다.
 */

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8]

// // flat
// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance);

// // flatMap
// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(overalBalance2);

///////////////////////////////////////
/** Sorting
 * strings.sort() : 원본 배열을 변화시킨다.
 * 숫자일 때에도 문자열로 변환하여, 문자열을 기준으로 정렬한다.
 */

// 문자열
// const owners = ['Hyejung', 'Jack', 'Adam', 'Martha'];
// owners.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// console.log(owners);

// 숫자
// console.log(movements);

// return < 0, A, B (keep order) (a - b < 0)
// return > 0, B, A (switch order) (a - b > 0)

// 오름차순 정렬
// movements.sort((a, b) => {
//   if (a < b) return -1; // keep
//   if (a > b) return 1; // switch
//   // return a - b;
// });
// console.log(movements);

// 내림차순 정렬
// movements.sort((a, b) => {
//   if (a > b) return -1; // keep
//   if (a < b) return 1; // switch
//   // return b - a;
// });
// console.log(movements);

///////////////////////////////////////
/** 배열 생성 & 배열 채우기의 다양한 방법들
 * new Array(length) length만큼의 empty 배열을 생성
 * arr.fill(v, strIdx, endIdx) strIdx ~ endIdx 만큼의 범위에 v가 포함되도록 arr을 변경. new Array 생성자와 체이닝해서 원하는 배열을 만들 수 있다.
 * Array.from({length : n}, (cur, i) => 조건)
 * 원하는 길이, 원하는 조건을 가진 새로운 배열을 만들 수 있다.
 * 이 때 콜백함수는 (현재 값, 인덱스)의 순서로 인자값을 받는데, 현재 값이 필요 없다면 '_' 로 표기할 수 있다.
 * Array.from 은 유사배열/이터러블을 배열로 변환시킨다. 배열이 되면 배열 메서드를 사용할 수 있다.
 * */

/* const arr = [1, 2, 3, 4, 5, 6, 7];

// 빈 배열 + fill 메서드
const x = new Array(7).fill(0);
// console.log(x);

// 빈 배열 + fill(채울 값, 범위)
const y = new Array(7);
y.fill(1, 3, 5); //fill(채울 값, startIdx, endIdx);
// console.log(y);

// 기존 배열 + fill(채울 값, 범위)
arr.fill(44, 1, 5);
// console.log(arr);

// Array.from (이터러블(유사 배열) -> 배열)
const arr2 = Array.from({ length: 7 }, () => 1);
// console.log(arr2);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

const randomDice = Array.from(
  { length: 100 },
  cur => (cur = Math.ceil(Math.random() * 6))
);
// console.log(randomDice); */

// querySelectorAll()에서 얻어온 UI 상의 데이터 노드리스트(유사배열 객체)를 배열화
labelBalance.addEventListener('click', function () {
  // 노드리스트 -> 배열 1
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  // 노드리스트 -> 배열 2
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI2);
});

///////////////////////////////////////
// Array Method Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
// console.log(bankDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000);
// console.log(bankDepositCnt.length);

// REDUCE 로 카운트 세기
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((cnt, cur) => (cur >= 1000 ? ++cnt : cnt), 0);

// console.log(numDeposits1000);

// 전위연산자, 후위연산자의 차이 : 후위는 할당 후 연산이기 때문에, 결과값이 바로 필요할 경우 전위연산자를 사용한다.
// let t = 10;
// console.log(t++); //10
// console.log(t); //11

// 3. REDUCE 사용해서 객체 만들기 TODO
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
// console.log(deposits, withdrawals);
// init 값은 콜백의 0회차 실행에서의 sums의 값이 되기 때문에, sums로 접근할 수 있는 것.

// 4.
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const excections = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const newTitle = title
    .toLowerCase()
    .split(' ')
    .map(word => (excections.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(newTitle);
};
// console.log(convertTitleCase('and is a NICE title'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recommendedFood = parseInt(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// 2.
// const dogSarah = function (dogs) {
//   const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

//   if (
//     sarahDog.curFood > sarahDog.recommendedFood * 0.9 &&
//     sarahDog.curFood < sarahDog.recommendedFood * 1.1
//   )
//     return '적정량 섭취중';
//   else if (sarahDog.curFood > sarahDog.recommendedFood)
//     return '너무 많이 먹어요';
//   else if (sarahDog.curFood < sarahDog.recommendedFood)
//     return '너무 적게 먹어요';
// };
// console.log(dogSarah(dogs));

// const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'
//   }.`
// );

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => (dog.curFood > dog.recommendedFood ? dog : ''))
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => (dog.curFood < dog.recommendedFood ? dog : ''))
  .flatMap(dog => dog.owners);

// console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4.
// const ownersStr = function (owners) {
//   const sentence = function (str) {
//     if (owners === ownersEatTooMuch) return (str += "'s dogs eat too much!");
//     else if (owners === ownersEatTooLittle)
//       return (str += "'s dogs eat too little!");
//   };

//   const str = owners
//     .reduce((str, cur) => {
//       str += `${cur} and `;
//       return str;
//     }, '')
//     .split(' ')
//     .slice(0, -2)
//     .join(' ');
//   return sentence(str);
// };
// console.log(ownersStr(ownersEatTooLittle));

// "Matilda and Alice and Bob's dogs eat too much!"
// "Sarah and John and Michael's dogs eat too little!"
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

const okayDog = dogs.filter(
  dog =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
// console.log(okayDog);

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

const dogsCopy = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(dogsCopy);

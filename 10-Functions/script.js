'use strict';

////////////////////////////////////////
// 매개변수 기본 값 셋팅하기

const bookings = [];
const createBooking = function (
  // 매개변수의 기본 값을 매개변수 정의시 바로 설정할 수 있다.
  // 이미 정의된 매개변수의 값을 이용한 표현식을 기본 값으로 설정할 수 있다.
  flightNum,
  numPassengers = 5,
  price = 199 * numPassengers
) {
  // ES5 에서 매개변수 기본값 셋팅 (Using 단축평가)
  // flightNum = flightNum || 'FF301';
  // numPassengers = numPassengers || 5;
  // price = price || 10;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

// 호출 시 건너뛰고 싶은 매개변수가 있다면 인수를 falsy 값으로 전달하여 디폴트 값이 할당되도록 할 수 있다.
// createBooking('LJ123', undefined, 2);

////////////////////////////////////////
// 함수 인수 전달의 동작 원리 (원시값 vs 참조값)

// JavaScript 에서는 오로지 '값에 의한 전달' 만 존재한다. 마치 '참조에 의한 전달'이 일어나는 것처럼 보여도.
// 객체를 전달할 때, 실제로 전달되는 것은 실행컨텍스트 내의 식별자가 가리키는 메모리 주소라는 '값'이다.

const flight = 'LH123';
const hyejung = {
  name: 'Hyejung Park',
  passport: 1234888,
};

// 인수로 전달된 원시타입 : 복사된 원본의 값
// 인수로 전달된 참조타입 : 복사된 원본의 참조 값(메모리 주소)
const checkIn = function (flightNum, passenger) {
  flightNum = 'SS333';
  passenger.name = `Ms.${passenger.name}`;

  if (passenger.passport === 1234888) {
    alert('체크인');
  } else {
    alert('잘못된 여권번호.');
  }
};

// checkIn(flight, hyejung);

// console.log(flight); // LH123 : flight 변수 자체를 재할당 한 것이 아니기 때문에 변경되지 않는다.
// console.log(hyejung); //Ms.Hyejung Park : 원본 값과 파라미터가 같은 메모리 주소를 참조하기 때문에, 함수 내에서 파라미터를 통해 접근한 변경이 원본에도 영향을 준다.

// 위 변경은 아래와 같다.
// const flightNum = flight;
// const passenger = hyejung;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

// newPassport(hyejung);
// checkIn(flight, hyejung);
// console.log(hyejung.passport);

////////////////////////////////////////
// 함수 : 일급객체 & 고차함수

// 1급 객체의 조건
// - 변수나 데이터 구조 안에 담을 수 있다.
// - 파라미터로 전달할 수 있다.
// - 리턴 값으로 사용할 수 있다.
// => 위 모든 조건을 충족하기 때문에, JS 에서 함수는 '1급 객체' 인 것.
// 따라서 함수를 전달하고, 전달받는 고차 함수 생성이 가능하다.

////////////////////////////////////////
// 함수를 인자로 받는 고차함수 만들기

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// 고차함수
const transformer = function (str, fn) {
  console.log(`Original string : ${str}`);
  // 전달받은 함수를 함수 내에서 호출하여 결과를 리턴받는다.
  console.log(`Transformed string : ${fn(str)}`);

  // 함수도 프로퍼티를 가진다.
  console.log(`Transformed by : ${fn.name}`);
};

// 인수와 함수 자체(콜백함수)를 전달하여 함수를 호출한다.
// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('🖐');
};
// addEvnetListner() : 고차함수
// high5 : 콜백함수
// document.body.addEventListener('click', high5);

// JS 빌트인 함수에도 콜백함수가 사용된다.
// ['혜정', '재현', '산들'].forEach(high5);

// 고차함수 장점
// 1. 함수의 재사용성을 높인다.
// 2. 높은 수준의 추상화를 가능하게 한다. 콜백함수의 디테일을 보여주지 않기 때문에 코드를 더 간략하게 볼 수 있다.

const makeName = function (str) {
  const name = str.split('').reverse().join('');
  return name;
};

const makeStar = function (name, fn) {
  console.log(`최고의 스타 ${fn(name)} 님.`);
};
// makeStar('박혜정', makeName);

////////////////////////////////////////
// 함수를 리턴하는 고차함수 만들기
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

// greet()의 리턴값이 함수이기 때문에 greeterHello는 함수
// const greeterHello = greet('Hello');
// greeterHello('Hyejung');

// greet('Hello') == greeterHello 와 같으므로 아래와 같이 표현할 수 있다.
// greet('Hello')('Hyejung');

const greetA = greeting => name => console.log(`${greeting}, ${name}!`);
// greetA('Hi')('J');

////////////////////////////////////////
// CALL, APPLY 메서드 : 외부에서 this 명시적 바인딩

// 객체 내에서 this는 동작한다.
const koreanAir = {
  airline: 'korean air',
  iataCode: 'KA',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode} ${flightNum}`,
      name,
    });
  },
};
// koreanAir.book(431, 'Hyejung Park');

const eurowings = {
  airline: 'eurowings',
  iataCode: 'EW',
  bookings: [],
};

// 객체 메서드의 내용을 변수에 정의하여 함수 표현식 생성.
const book = koreanAir.book;

// 일반적인 함수 실행 방식 : book은 메서드가 아니므로 this가 동작하지 않는다.
// book(23, 'Hyejung');

// Call 메서드
// book.call(eurowings, 233, 'Hyejung Park');
// book.call(koreanAir, 233, 'Hyejung Park');

// Apply 메서드
const flightData = [583, '산들'];
// book.apply(eurowings, flightData);
// book.call(koreanAir, ...flightData); //modern JS way.

//////////////////////////////////////////////////////////
// Bind 메서드
// 새로운 객체를 가리키는 this를 바인딩한 함수를 리턴
// 이를 변수에 저장한 후 호출하여 사용할 수 있다.
// const bookEW = book.bind(eurowings);
// const bookKA = book.bind(koreanAir);

// bookEW(23, 'Steven');
// bookKA(14, 'Yuri');

// 특정 인수를 기본 값으로 세팅할 수 있다.
const bookEW44 = book.bind(eurowings, 44);
// bookEW44('박혜정');

// bind 메서드 : 이벤트 리스너에 적용
koreanAir.planes = 300;
koreanAir.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// 이벤트리스너를 호출할 때, this는 이벤트가 동작하고 있는 DOM요소를 가리킨다.
// document.querySelector('.buy').addEventListener('click', koreanAir.buyPlane);

// 따라서 콜백함수의 this가 호출하고자 하는 객체를 정확히 가리킬 수 있도록 bind 메서드를 사용할 수 있다.
document
  .querySelector('.buy')
  .addEventListener('click', koreanAir.buyPlane.bind(koreanAir));

// Partial application : 파라미터를 미리 지정, 고정한 함수 / 파라미터 순서에 유의할 것.
// 어떤 함수를 기반으로 한 새로운 함수를 만드는 것으로, 함수 파라미터에 기본값을 셋팅하는 것과는 차이가 있음.
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
// console.log(addVAT(100));

// CHALLENGE

// 내 코드
const addTax =
  value =>
  (rate = 0.2) =>
    console.log(value + value * rate);
// addTax(200)();

// answer
const addTaxRate = rate => value => console.log(value + value * rate);
const addVAT2 = addTaxRate(0.2);
// addVAT2(200);
// addVAT2 에서 고정된 rate 값을 지정.
// 이를 호출할 때 고정된 파라미터 값이 있는 addTaxRate가 실행되므로, 고정값이 없는 파라미터만 넘겨서 호출할 수 있다.

//////////////////////////////////////////////////////////
// CODING CHALLENGE #1.
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
};

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)
//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)

poll.registerNewAnswer = function () {
  const answer = parseInt(
    prompt(
      `${this.question}\n ${this.options.join(
        '\n'
      )}\nWhat is your favourite programming language?`
    )
  );
  // 모든 조건이 true일 경우에만 마지막 코드 실행.
  typeof answer === 'number' &&
    answer < this.answers.length &&
    this.answers[answer]++;
  this.displayResults();
};

// 2. Call this method whenever the user clicks the "Answer poll" button.
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".

poll.displayResults = function (type = 'array') {
  if (type === 'array') console.log(this.answers);
  else if (type === 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}.`);
  }
};

// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

// * call 메서드를 활용해 this 변경 -> 새로운 객체
// * this.answers == { answers: [5, 2, 3] }.answers
// poll.displayResults.call({ answers: [5, 2, 3] });
// poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');

//////////////////////////////////////////////////////////
// IIFE : 즉시실행함수 (정의와 동시에 즉시 실행)

// * 일반 함수 표현식
const runOnce = function () {
  console.log('한 번만 실행됩니다.');
};
// runOnce();

// * 즉시 실행 함수
// (function () {
//   console.log('한 번만 실행됩니다.');
// })();

// (() => console.log('이것도 한 번만 실행됩니다.'))();

// 1. 함수 선언문을 함수 표현식으로 바꾸고 ();를 붙여 실행 => 선언과 동시에 실행.
// 2. JS에서는 function 키워드를 함수의 시작으로 인식, 함수 선언 다음에는 괄호를 쓸 수 없지만 표현식 다음에는 괄호를 허용한다.
// 3. 사용하는 이유 : 변수를 함수 스코프 내에서 선언함으로써 전역스코프 오염 방지 및 변수 접근 방지의 목적.

// ES6 블록스코프 : let, const 선언에만 적용. (var제외)
// 블록스코프로 캡슐화가 가능하므로 IIFE의 기능을 대신할 수 있다.
{
  const isPrivate = 23;
}
// console.log(isPrivate); -> 액세스 할 수 없음.

//////////////////////////////////////////////////////////
// CLOSURES (클로저)

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} 명`);
  };
};
const booker = secureBooking();

/**
 *  함수 실행 전 : 글로벌 실행 컨텍스트는 현재 secureBooking = <f> 의 정보를   가지고 있음. 따라서 글로벌 스코프에서 이 함수에 접근할 수 있음.
 *  함수 실행 후 : 콜스택에 함수 실행 컨텍스트가 쌓임. 이 컨텍스트 내에는 passengerCount 변수가 저장 되어있고, 함수 스코프 내에서는 passengerCount와 전역스코프의 변수까지 접근할 수 있음.
 *  함수 리턴 후 : 리턴값은 전역스코프의 booker 변수 내에 저장되고, 전역스코프 내에서 선언되었으므로 접근 가능하다. 또한 secureBooking 함수 스코프 내에서도 접근 가능하다. (부모<- 자식/ 렉시컬 스코핑) 리턴된 함수 실행컨텍스트는 콜스택에서 빠진다.
 */

// let passengerCount = 10; // 클로저 >> 스코프체인
// booker(); //1
// booker(); //2
// booker(); //3
/**
 *  secureBooking을 실행한 함수 실행컨텍스트는 이미 콜스택에서 빠졌는데, 어떻게 이전 변수를 기억하고 이를 사용할 수 있을까?
 * 클로저 : 함수 자신이 생성된 시점의 변수 정보(VE)로, 함수는 이전의 실행컨텍스트가 종료되어도 여전히 생성 시점의 변수에 접근할 수 있다. 함수가 들고다니는 배낭과 같은 것으로, 참조할 변수를 찾아 이 클로저를 뒤져서 찾아내는 것.
 *  따라서 booker함수를 실행할 때 클로저에서 기억하고 있는 passengerCount 변수를 찾아 접근하게 되는데, 이는 스코프 체인보다 우선순위에 있다. 즉, 접근 가능한 범위에서 새롭게 같은 변수를 정의해도, booker 함수는 여전히 secureBooking 내에 선언된 그 변수를 참조한다는 의미이다.
 */

// console.dir(booker); // booker 함수 내의 closure를 확인할 수 있다.

//* 예제 1번
let f;

const g = function () {
  const a = 44;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 55;
  f = function () {
    console.log(b * 2);
  };
};

g();
// f();
// console.dir(f); // Closure (g) {a: 44}

//* f 재할당
h();
// f();
// console.dir(f); // Closure (h) {b: 55}

/**
 * g 예제에서 f는 g 함수 밖에서 선언되고, g 함수 안에서 재할당되었지만, f 함수는 여전히 a 변수를 기억하고 g 함수의 EC가 끝났음에도 이를 활용해 결과를 계산했다.
 * h 예제에서 f 함수가 재할당 되면서, 그 시점에서 f가 가진 변수 정보(클로저)도 변경됨.
 * >> 클로저는 선언되는 시점의 변수 정보 뿐 아니라, 재할당 되는 시점의 정보 또한 기억한다.
 * >> 재할당이 되면 이전의 정보대신 새로운 정보를 기억한다. (재할당이 될 때마다 새롭게 태어나는 것...)
 */

//* 예제 2번
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`현재 총 ${n}명이 탑승수속을 진행합니다.`);
    console.log(`현재 3 그룹 (각 ${perGroup}명)이 있습니다.`);
  }, wait * 1000);

  console.log(`탑승을 ${wait}초안에 시작합니다.`);
};

// boardPassengers(180, 3);

/**
 * boardPassengers 함수와 setTimeout의 콜백함수는 서로 독립된 실행 컨텍스트 내에서 실행된다.
 * boardPassengers의 EC가 종료되었지만, setTimeout 콜백함수는 여전히 종료된 함수 내에서 정의된 변수정보를 이용할 수 있다.(클로저)
 */

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  return header.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

/**
 * 1. IIFE가 실행되면서 header 변수를 정의하고, header 색상을 red로 변경
 * 2. header에 이벤트 리스너를 등록하여 click이 실행되는 시점까지 정보를 기억하고 있다가, click이 발생하면 콜백함수를 실행.
 * 3. 클로저로 인해 콜백 함수가 자신이 생성된 시점의 VE를 기억하기 때문에, 즉시실행함수의 EC가 끝나도 콜백함수는 여전히 header 변수를 사용할 수 있다.
 */

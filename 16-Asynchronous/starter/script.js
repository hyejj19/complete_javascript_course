'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// 콜백 함수 : Ajax콜 완료시 수행할 렌더링 함수
// ... 해당 데이터로 html 컴포넌트 생성한 뒤 컨테이너에 추가.
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
            </div>
          </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/*
// Ajax call country 1
const getCountryAndNeighbour = function (code) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/alpha/${code}`);
  request.send();

  //
  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);

    // 나라 컴포넌트 렌더링
    renderCountry(data);

    // Get neighbour contry 2
    // 옵셔널 체이닝을 사용해 data에 borders 프로퍼티가 있을 때만 [0]번째 인덱스 값을 가져온다.
    // 옵셔널 체이닝을 사용해서 ? 이전 프로퍼티가 없을 때는 undefined를 반환하여 에러를 방지할 수 있다.
    const neighbour = data.borders?.[0];

    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    // 콜백 함수 안의 콜백 함수 : 첫번째 리퀘스트가 완료되면 실행되는 두번째 함수
    // 또 이 안에서 다음 동작이 이어지도록 하려면, 콜백함수 안에 또 콜백함수를 전달하고, 또 콜백함수를 전달하는
    // 이른바 콜백 지옥이 형성된다.
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('kr');
getCountryAndNeighbour('usa');
*/

///////////////////////////////////////
// Fetch API

/*const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/alpha/${code}`);
  request.send();
*/

// 가장 간단한 GET 방식 AJAX 요청
// fetch 로 요청한 데이터는 promise 객체를 반환한다.
const request = fetch('https://restcountries.com/v2/alpha/kr');
// console.log(request);

// fetch를 통해 response 된 resolved 데이터에는 .json()메서드를 사용할 수 있다. (리더블 데이터를 진짜 읽을 수 있게 변환!)
// .json()도 비동기로 동작하기 때문에, promise를 반환한다.

// 앞의 프로미스에서 리턴된 또 다른 프로미스 (.json으로 부터 나온)에 then 메서드로 성공할 때 동작을 추가.
// then 안의 함수는 자바스크립트에 의해서 앞에서 리턴된 프로미스를 받아올 수 있다.(json으로 부터 리턴된 프로미스 === data)

// promise 에서 콜백을 사용하지 않는 것은 아니다. 다만 promise를 사용하면서 코드를 더 이해하기 쉬워지는 것이다.
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/alpha/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data);
      const neighbour = data.borders?.[0];

      if (!neighbour) return;

      // country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => {
      renderCountry(data, 'neighbour');
    });
};

getCountryData('kr');

// 내부에 있는 코드가 실행되면서 비동기적으로 실행될 async 함수 whereAmI
// async 키워드가 붙은 함수 내에서는 await 키워드를 붙여 프로미스를 await 할 수 있다.
// then 메서드로 프로미스를 사용할 때 보다 간단하지만, 문법 뒤에 실제 동작은 프로미스 사용과 다르지 않다.
const whereAmI = async function (country) {
  // fetch를 통해 생성된 프로미스를 await 대기 하는 상태가 된다.
  // 프로미스가 fulfilled 될 때 까지 코드의 실행을 멈춘다.
  // 코드의 실행을 멈추는 거라면, 동기적으로 작동하기 때문에 다음 코드의 실행을 블록킹하는 것 아닌가효?!
  // 그렇지 않습니다. async 가 붙은 함수 안에서는, 이 코드들이 비동기적으로 (백그라운드) 에서 동작하기 때문에
  // 메인 쓰레드의 실행(콜스택)을 블록킹 하지 않습니다.

  // await이 붙은 비동기 함수의 실행 결과는 resolved 데이터이기 때문에, 이 결과값을 변수에 저장할 수도 있다.
  const res = await fetch(`https://restcountries.com/v2/alpha/${country}`);
  // console.log(res);

  // 위 코드는 아래 코드와 같지만 문법만 다른 것이다.
  /* fetch(`https://restcountries.com/v2/alpha/${country}`)
    .then(res => console.log(res)) */
};

// 이 비동기 함수를 먼저 실행해도, async 비동기이기 때문에 아래 콘솔보다 나중에 실행된다.
// 왜냐? 결과가 fulfilled가 될 때까지 await 하니까.
whereAmI('kr');
// console.log('FIRST');

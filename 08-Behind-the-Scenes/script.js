'use strict';

//Scope & Scope chain Practice
/*const calcAge = function(birthYear) {
    const age = 2040 - birthYear;

    const printAge = function() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}.`;
        console.log(output);

        if(birthYear <= 2012 && birthYear >= 1997) {
            var genZ = true;
            // 상위 스코프와 동일한 이름으로 새 변수 선언.
            const firstName = 'Yujin';

            // 상위 스코프의 변수 재할당.
            output = 'NEW';

            const str = `and you're a Gen Z, ${firstName}.`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }
        }

    }
    console.log(genZ);
    console.log(ouput);

    printAge();

    return age;
}

const firstName = 'Hyejung';
calcAge(1997); */

//****************************//

// Variables
// console.log(me);
// console.log(job);
// //console.log(year);

// var me = 'Hyejung'; 
// let job = 'Student';
// const year = 1991;

// // Function
// console.log(addDec(2 ,3));
// // console.log(addExp(2 + 3));
// // console.log(addArrow(2 + 3));

// function addDec(a, b) {
//     return a + b;
// }

// const addExp = function(a, b){
//     return a + b;
// }

// const addArrow = (a, b) => a + b;


// if(!number) deleteCart();

// var number = 10;

// function deleteCart() {
// 	console.log('카트가 비었습니다.');
// }

///////// PRACTICE : THIS KEYWORD ////////////

// const hyejung = {
//     year : 1997,
//     calcAge : function() {
//         console.log(2022-this.year);
//         const isGenZ = () => {
//             console.log(this.year >= 1997 && this.year <= 2012);
//         }
//         isGenZ();
//     }
// }
// hyejung.calcAge();

// const mountains = {
//     year : 2019
// }
// mountains.calcAge = hyejung.calcAge;
// mountains.calcAge();

// const f = hyejung.calcAge;
// f();

////////// PRACTICE : PRIMITIVES VS OBJECTS

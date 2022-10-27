'use strict';

const BANKAPI = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
const input = document.querySelector(".input");
const currencies = document.querySelector(".currency");
const result = document.querySelector(".result");
const time = document.querySelector(".main__time");
let val = 0;

function sendReq() {
    fetch(BANKAPI)
        .then(response => response.json())
        .then(json => {
            json.forEach(elem => {
                if (currencies.value === elem.cc) {
                    val = elem.rate;
                }
            });
        })
        .then(data => result.textContent = `${(+val * +input.value).toFixed(2)} \u20B4`)
        .catch(error => console.log(error));
}

function setTime () {
    setTimeout(setTime, 1000);
    time.textContent = `${new Date().getDate()}.${new Date().getMonth()+1}.${new Date().getFullYear()}\n${new Date()
        .getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}

setTime();

currencies.addEventListener('change', sendReq);
input.addEventListener('input', () => {
    if (isNaN((input.value))) {
        result.textContent = 'Enter correct value';
    } else {
        sendReq();
    } 
});

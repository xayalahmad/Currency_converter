const inp = document.querySelector(".mynumber");
const inp2 = document.querySelector(".input2");
let base;
let symbols;
let val;
let baseValue;
let symbolsValue;
let num
async function getInfInput1(b = "USD", s = "RUB", val) {
  base = b;
  symbols = s;
  val = inp.value;
  let url = `https://api.exchangerate.host/latest/?base=${b}&symbols=${s}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  num = data.rates[symbols];

  printVal(data.rates[symbols]);
  printText(b, s, 1);
}
async function getInfInput2(b = "USD", s = "RUB", val) {
  base = s;
  symbols = b;
  val = inp2.value;
  let url = `https://api.exchangerate.host/latest/?base=${s}&symbols=${b}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  num = data.rates[symbols];
  printVal2(data.rates[symbols]);
  printText(b, s, 1);
}
inp.addEventListener("input", function (e) {
  val = parseFloat(e.target.value.replace(/,/g, ""));
  // const formatter = new Intl.NumberFormat(undefined, {
  //   maximumFractionDigits: 4,
  // });
  // if (val) e.target.value = formatter.format(val);
  // else e.target.value = 0;
  getInfInput1(baseValue, symbolsValue, val);
});
inp2.addEventListener("input", function (e) {
  val = parseFloat(e.target.value.replace(/,/g, ""));
  // const formatter = new Intl.NumberFormat(undefined, {
  //   maximumFractionDigits: 4,
  // });
  // if (val) e.target.value = formatter.format(val);
  // else e.target.value = 0;
  getInfInput2(baseValue, symbolsValue, val);
});
function printVal(p) {
  console.log(val);
  if(val == ""){
    console.log(p);
    p = ""
    console.log(p);
  }
  document.querySelector(".baseText").value = val;
  document.querySelector(".result").value = p;
}
function printVal2(p) {
  console.log(p);
  console.log(val);
  if(val == "NaN"){
    console.log("ddd");
    val = " "
    p = ""
  }
  document.querySelector(".mynumber").value = p;
  document.querySelector(".result").value = val;
}
async function printText(b = "USD", s = "RUB", val) {
  let url = `https://api.exchangerate.host/latest/?base=${b}&symbols=${s}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.rates[symbols]);
  document.querySelector(".baseText").innerHTML = `1 ${base} = ${
    Math.round(num * 10000) / 10000} ${symbols}`;
  document.querySelector(".symbolsText").innerHTML = `1 ${symbols} = ${
    Math.round((1 / num) * 10000) / 10000} ${base}`;
}
const baseRadioButtons = document.querySelectorAll('input[name="baseoptions"]');
for (const baseRadioButton of baseRadioButtons) {
  baseRadioButton.addEventListener("change", function () {
    baseValue = this.value;
    getInfInput1(baseValue, symbols, val);
  });
}
const SymbolsradioButtons = document.querySelectorAll(
  'input[name="symbolsoptions"]'
);
for (const symbolsRadioButton of SymbolsradioButtons) {
  symbolsRadioButton.addEventListener("change", function () {
    console.log(this.value);
    symbolsValue = this.value;
    getInfInput1(base, symbolsValue, val);
  });
}
// window.open(getInfInput2("USD", "RUB", val));
window.open(getInfInput1("USD", "RUB", "1"));
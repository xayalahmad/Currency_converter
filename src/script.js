const inp = document.querySelector(".mynumber");
let base;
let symbols;
let val;
let baseValue;
let symbolsValue;
async function getInf(b = "USD", s = "RUB", val) {
  base = b;
  symbols = s;
  val = inp.value;
  let url = `https://api.exchangerate.host/latest/?base=${b}&symbols=${s}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  printVal(data.rates[symbols]);
  printText(b, s, 1);
}
inp.addEventListener("change", function (e) {
  val = parseFloat(e.target.value.replace(/,/g, ""));
  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 4,
  });
  if (val) e.target.value = formatter.format(val);
  else e.target.value = 0;
  getInf(baseValue, symbolsValue, val);
});
function printVal(p) {
  document.querySelector(".baseText").value = val;
  document.querySelector(".result").value = p;
}
async function printText(b = "USD", s = "RUB", val) {
  let url = `https://api.exchangerate.host/latest/?base=${b}&symbols=${s}&places=2&amount=${val}`;
  let res = await fetch(url);
  let data = await res.json();
  document.querySelector(".baseText").innerHTML = `1 ${base} = ${
    Math.round(data.rates[symbols] * 10000) / 10000} ${symbols}`;
  document.querySelector(".symbolsText").innerHTML = `1 ${symbols} = ${
    Math.round((1 / data.rates[symbols]) * 10000) / 10000} ${base}`;
}
const baseRadioButtons = document.querySelectorAll('input[name="baseoptions"]');
for (const baseRadioButton of baseRadioButtons) {
  baseRadioButton.addEventListener("change", function () {
    baseValue = this.value;
    getInf(baseValue, symbols, val);
  });
}
const SymbolsradioButtons = document.querySelectorAll(
  'input[name="symbolsoptions"]'
);
for (const symbolsRadioButton of SymbolsradioButtons) {
  symbolsRadioButton.addEventListener("change", function () {
    console.log(this.value);
    symbolsValue = this.value;
    getInf(base, symbolsValue, val);
  });
}
window.open(getInf("USD", "RUB", "1"));
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
  printText(data.rates[symbols]);
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
  document.querySelector(".result").value = p;
}
function printText(z) {
  document.querySelector(".baseText").innerHTML = `1 ${base} = ${
    Math.round((val / z) * 10000) / 10000
  } ${symbols}`;
  document.querySelector(".symbolsText").innerHTML = `1 ${symbols} = ${
    Math.round((z / val) * 10000) / 10000
  } ${base}`;
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

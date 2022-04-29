let value = document.getElementsByClassName('val')[0];
let valInInput = '';
async function onInputChange(inputVal) {
  valInInput = inputVal;
  let suggest = document.querySelector('.suggestion');

  suggest.innerHTML = '';
  if (!inputVal) {
    suggest.style.display = 'none';
    return;
  }
  suggest.style.display = 'none';
  let arr = [];
  let data = await fetch('https://api.publicapis.org/entries');
  data = await data.json();
  if (valInInput !== inputVal) {
    arr = [];
    return;
  }
  for (let obj of data.entries) {
    if (obj.API.toLowerCase().startsWith(inputVal.toLowerCase())) {
      arr.push(obj.API.toLowerCase());
    }
  }
  if (!arr.length) {
    suggest.style.display = 'block';
    suggest.innerHTML = '';
    suggest.innerHTML = 'No Records Found';
    return;
  }

  arr.forEach((e) => {
    let child = document.createElement('div');
    child.innerHTML = `<span style='color: #aca6a6'>${e.slice(
      0,
      inputVal.length
    )}</span>${e.slice(inputVal.length)}`;
    child.className = 'child';
    suggest.append(child);
  });
  suggest.style.display = 'block';
}

function debounce(fn, delay) {
  let timer;
  return function (args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  };
}

let checkInputChange = debounce(onInputChange, 300);

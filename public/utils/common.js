// fetch nav-bar and add it to 'nav-bar' containers

fetch('/nav-bar')
  .then(res => res.text())
  .then(data => {
    console.log(data);
    document.getElementById('nav-bar-container').innerHTML = data;
  });
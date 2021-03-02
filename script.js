const loader = document.getElementById('loader');

let body = document.body;
let url = window.location.toString();
let name = 'GalinaZhigalova';
let user = `https://api.github.com/users/${name}`;
let date = new Date();

setTimeout(function(){
	loader.classList.add('none');
}, 2000);

let getDate = new Promise((resolve, reject) => {
	setTimeout(() => date ? resolve(document.body.append(`Текущая дата: ${Date()}`)) : reject('Ошибка.'), 2000)
});

let getUser = new Promise((resolve, reject) => {
	setTimeout(() => user ? resolve(user) : reject('Имя не найдено.'), 3000)
});

Promise.all([getUser, getDate])
	.then(() => fetch(`${user} `))
  .then(res => res.json())
  .then(json => {
  				let bio = document.createElement('p');
          if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Пользователь не найден.';
        }
    document.body.append(bio);
   })
   .catch(err => document.body.append('Пользователь не найден'));

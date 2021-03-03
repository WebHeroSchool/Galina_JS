let loader = document.getElementById('loader')
let body = document.body;
let params = new URLSearchParams(window.location.toString());
let name = params.get('name') || 'GalinaZhigalova';
let user = `https://api.github.com/users/${name}`;
let date = new Date();
console.log(user)
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
	.then(() => fetch(`https://api.github.com/users/${name}`))
  .then(res => res.json())
  .then(json => {
      console.log(json.avatar_url);
	    console.log(json.name);
     	console.log(json.bio);
    	console.log(json.html_url);

  				let photo = new Image();
    	photo.src = json.avatar_url;
    	body.append(photo);

    	let user = document.createElement('name');
    	if (json.name != null) {
    	user.innerHTML = json.name;
    	} else {
	    user.innerHTML = 'Пользователь не найден';
	    }
	    body.append(user);
    	user.addEventListener("click", () => window.location = 'https://webheroschool.github.io/GalinaZhigalova');

     	let bio = document.createElement('p');
    	if (json.bio != null) {
    	bio.innerHTML = json.bio;
     	} else {
    	bio.innerHTML = 'Информация недоступна';
    	}
    	body.append(bio);
	})
   .catch(err => document.body.append('Пользователь не найден'));

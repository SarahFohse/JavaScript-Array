// for (let i = 0, i < variable.length, i++) {
  
// }

//// generating a random image on click of the get image button
let getImage = document.getElementById('getimg');
let url = `https://picsum.photos/200/300?random`;

let image = document.getElementById('img');

image.src = url;


getImage.addEventListener('click', () => {
  image.src = url + `=${Math.random()}`;
  return getImage;
})

////email creates div for user

let addEmail = document.getElementById('addmail');
const emailInput = document.getElementById('email');
let contain = document.getElementById('contain'); 
let addImage= document.getElementById('addimg');



addEmail.addEventListener('click', (event) => {
  event.preventDefault();
  let user = document.createElement('div');
  user.id = `user` + `=${Math.random().toString().split('.')[1]}`
  contain.appendChild(user);
  return addEmail;
  // user.document.createElement('p');

  // if (user.id = true) {
  //   let userName = document.createElement('p');
  //   user.appendChild(`${emailInput}`)
  // }
})


//add image creates img in html for user div

addImage.addEventListener('click', () => {
  let newImage = document.createElement('img');
  newImage.src = image.src;
  document.getElementById('user').appendChild(newImage);
})

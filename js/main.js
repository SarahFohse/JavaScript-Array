// for (let i = 0, i < variable.length, i++) {
  
// }

//// generating a random image on click of the get image button
let getImage = document.getElementById('getimg');
let url = `https://picsum.photos/200/300?random`;
let currentEmail;
let userList = [];
let userNumber;

let image = document.getElementById('img');

image.src = url;


getImage.addEventListener('click', () => {
  image.src = url + `=${Math.random()}`;
  return getImage;
})

////email creates div for user and checks if an email has been entered

let addEmail = document.getElementById('addmail');
const emailInput = document.getElementById('email');
let contain = document.getElementById('contain'); 
let addImage= document.getElementById('addimg');
const displayEmail = document.getElementById('error-email');
let clearUser;
const clearAll = document.getElementById('clear-all');
let currentUser;
let galleryNav = document.querySelectorAll('.navigation .button');
let currentGallery = 0;
let galleries;

addEmail.addEventListener('click', event => {
  event.preventDefault();

  //
  validateInputs();
  //
  currentEmail = emailInput.value;
  if (validationCheck) {
    displayEmail.innerText = `Current email: ${currentEmail == '' ? 'No email entered.' : currentEmail}`;
    displayEmail.style.display = 'block';
  } else {
    displayEmail.style.display = 'none';
  }
  let emailExists = false;
  userList.forEach((item) => {
    if (item.email == currentEmail) {
      emailExists = true;
    }
  });



  if (emailInput.value != '' && !emailExists && validationCheck === true) {
    userNumber = userList.length;
    userList.push({email: currentEmail, id: `user${Math.random().toString().split('.')[1]}`});

    let user = document.createElement('div');
    user.id = userList[userNumber].id;
    user.classList.add('user-container');
    contain.appendChild(user);
    
    selectDiv(user);

    //heading
    let h3 = document.createElement('h3');
    let textNode = document.createTextNode(emailInput.value);
    h3.appendChild(textNode);
    user.appendChild(h3);
    errorMessage.style.display = 'none';

    //clear email button
    clearUser = document.createElement('button');
    clearUser.textContent = 'Clear User';
    clearUser.classList.add('clear-btn')
    user.appendChild(clearUser);

    // navigate gallery buttons
    let arrows = document.createElement('div');
    arrows.classList.add('navigation');
    let arrRight = document.createElement('button');
    arrRight.append('>');
    arrRight.classList.add('right', 'button');
    let arrLeft =  document.createElement('button');
    arrLeft.append('<');
    arrLeft.classList.add('left', 'button');
    arrows.appendChild(arrLeft);
    arrows.appendChild(arrRight);
    arrows.classList.add('js-hidden');
    user.appendChild(arrows);
    galleryNav = document.querySelectorAll('.navigation .button');

    arrowNav(arrLeft);
    arrowNav(arrRight);


    let gallery = document.createElement('div');
    gallery.classList.add('gallery');
    user.appendChild(gallery);    

    if (clearAll.style.display == 'none') {
      clearAll.style.display = 'block';
    }
  }
  if (userList[userNumber].id != undefined) {
    currentUser = userList[userNumber].id;
  }
  
});

function arrowNav(navBtn) {
  navBtn.addEventListener('click', function() {
    galleries = this.parentElement.parentElement.querySelectorAll('.gallery');
    // go left
    if (this.classList.contains('left')) {
      if (currentGallery == 0) {
        galleries[currentGallery].classList.add('js-hidden');
        galleries[galleries.length - 1].classList.remove('js-hidden');
        currentGallery = galleries.length - 1;
      } else {
        galleries[currentGallery].classList.add('js-hidden');
        galleries[currentGallery - 1].classList.remove('js-hidden');
        currentGallery = currentGallery - 1;
      }
    } else {
      // go right
      if (currentGallery == galleries.length - 1) {
        galleries[currentGallery].classList.add('js-hidden');
        galleries[0].classList.remove('js-hidden');
        currentGallery = 0;
      } else {
        galleries[currentGallery].classList.add('js-hidden');
        galleries[currentGallery + 1].classList.remove('js-hidden');
        currentGallery = currentGallery + 1;
      }
    }
  });
}

function selectDiv(div) {
  div.addEventListener('click', function() {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id == this.id) {
        currentUser = userList[i].id;
        currentEmail = userList[i].email;
        emailInput.value = userList[i].email;
        displayEmail.innerText = 'Current email: ' + userList[i].email;
      }
    }
    
  });
}

//valid email
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = emailInput => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailInput).toLowerCase());
}
let validationCheck = false;
const validateInputs = () => {
  const emailValue = emailInput.value.trim();
  validationCheck = false;

 if(emailValue === '') {
        // setError(emailInput, 'Email is required');
        errorMessage.innerText = 'Email is required!';
        errorMessage.style.display = 'block';
    } else if (!isValidEmail(emailValue)) {
        // setError(emailInput, 'Provide a valid email address');
        errorMessage.innerText = 'Provide a valid email address!';
        errorMessage.style.display = 'block';
    } else {
        // setSuccess(emailInput);
        errorMessage.style.display = 'none';
        validationCheck = true;
    }
};


//add image creates img in html for user div and checks if the image has already been linked to the user as it shouldn't display twice
const errorMessage = document.getElementById('error-message');
let maxImages = 8;
let newestGallery;
let popUp = document.querySelector('#popup');
let closing = document.querySelector('.close');

addImage.addEventListener('click', () => {
  let imageExist = false;
  let userID;
  let userImageContainer;

  userList.forEach((item, i) => {
    if (item.email == currentEmail) {
      userNumber = i;
    }
  });

  if (userList[userNumber] != undefined) {
    userImageContainer = document.getElementById(userList[userNumber].id);
    userID = document.querySelectorAll(`#${userList[userNumber].id} img`);

    userID.forEach(img => {
      if (img.src == image.src) {
        imageExist = true;
      }
    })
  }
  
  if (imageExist === true) {
    errorMessage.innerText = 'Image already added!';
    errorMessage.style.display = 'block';

  } else if (imageExist === false && currentEmail !== undefined && userList.length > 0 && validationCheck === true && userImageContainer !== undefined) {
    let userDiv = document.querySelector('#' + currentUser);
    if (userImageContainer.querySelectorAll('img').length % maxImages == 0 && userImageContainer.querySelectorAll('img').length !== 0) {
      let gallery = document.createElement('div');
      gallery.classList.add('gallery');
      userDiv.appendChild(gallery);
    }

    galleries = userImageContainer.querySelectorAll('.gallery');
    newestGallery = Math.floor(userImageContainer.querySelectorAll('img').length / maxImages);

    if (galleries.length > 1) {
      userDiv.querySelector('.navigation').classList.remove('js-hidden');
    }
    for (let i = 0; i < userDiv.querySelectorAll('.gallery').length; i++) {
      userDiv.querySelectorAll('.gallery')[i].classList.add('js-hidden');
    }
    galleries[newestGallery].classList.remove('js-hidden');

    currentGallery = userDiv.querySelectorAll('.gallery').length - 1;
    let span = document.createElement('span');
    span.style.setProperty('--i', galleries[newestGallery].children.length+1);
    let newImage = document.createElement('img');
    newImage.src = image.src;
    newImage.classList.add('image');
    span.appendChild(newImage);
    galleries[newestGallery].appendChild(span);
    errorMessage.style.display = 'none';

    //pop up image  
    newImage.addEventListener('click', () => {
      // console.log(newImage.src);
      popUp.children[0].src = newImage.src;
      popUp.classList.remove('js-hidden');
    });

    
  } else {
    errorMessage.innerText = 'Click on - add your email address!';
    errorMessage.style.display = 'block';
  }

  

})


closing.addEventListener('click', () => {
  popUp.classList.add('js-hidden');
}) 



// Add click event listener to document, pass event so we can check clicked item
document.addEventListener("click", function(e){
  const clearUserBtn = e.target.closest(".clear-btn");

  if(clearUserBtn){
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id == clearUserBtn.parentElement.id) {
        userList.splice(i, 1);
      }
    }

    if (clearUserBtn.previousElementSibling.innerText == currentEmail) {
      currentEmail = '';
      emailInput.value = '';
      displayEmail.innerText = 'Current email: No email entered.';
    }

    clearUserBtn.parentElement.remove();

    if (userList.length == 0) {
      clearAll.style.display = 'none';
    }
  }
});

clearAll.addEventListener('click', () => {
  let removeAll = document.querySelectorAll('.user-container');

  removeAll.forEach(user => {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id == user.id) {
        userList.splice(i, 1);
      }
    }

    user.remove();
  });

  currentEmail = '';
  emailInput.value = '';
  displayEmail.innerText = 'Current email: No email entered.';
  clearAll.style.display = 'none';
});
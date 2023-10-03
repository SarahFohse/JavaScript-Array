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
    let gallery = document.createElement('div');
    gallery.classList.add('gallery');
    user.appendChild(gallery);


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

    if (clearAll.style.display == 'none') {
      clearAll.style.display = 'block';
    }
  }
});

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
        setError(emailInput, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(emailInput, 'Provide a valid email address');
    } else {
        setSuccess(emailInput);
        validationCheck = true;
    }
};


//add image creates img in html for user div and checks if the image has already been linked to the user as it shouldn't display twice
const errorMessage = document.getElementById('error-message');
let maxImages = 8;

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

  } else if (imageExist === false && currentEmail !== undefined && userList.length > 0 && validationCheck === true && userImageContainer !== undefined && userImageContainer.querySelectorAll('img').length < maxImages) {
    let span = document.createElement('span');
    span.style.setProperty('--i', userID.length+1);
    let newImage = document.createElement('img');
    newImage.src = image.src;
    span.appendChild(newImage);
    userImageContainer.querySelector('.gallery').appendChild(span);
    errorMessage.style.display = 'none';
  } else if (userImageContainer !== undefined && userImageContainer.querySelectorAll('img').length == maxImages) {
    //was alert, now error message. Might change
    errorMessage.innerText = `You reached the limit of ${maxImages} images.`;
    errorMessage.style.display = 'block';
  } else {
    errorMessage.innerText = 'Click on - add your email address!';
    errorMessage.style.display = 'block';
  }
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
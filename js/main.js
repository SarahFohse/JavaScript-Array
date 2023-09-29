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
let clearUser 


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

addImage.addEventListener('click', () => {
  let imageExist = false;
  let userID;

  userList.forEach((item, i) => {
    if (item.email == currentEmail) {
      userNumber = i;
    }
  });

  if (userList.length > 0) {
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

  } else if (imageExist === false && currentEmail !== undefined && userList.length > 0 && validationCheck === true) {
    let newImage = document.createElement('img');
    newImage.src = image.src;
    document.getElementById(userList[userNumber].id).appendChild(newImage);
    errorMessage.style.display = 'none';
  } else {
    errorMessage.innerText = 'Click on - add your email address!';
    errorMessage.style.display = 'block';
  }
})

clearUser.addEventListener('click', () => {
  const removeAll = document.getElementsByClassName('user-container');
  removeAll[0].remove()
})
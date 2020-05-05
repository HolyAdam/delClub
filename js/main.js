const authBtn = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logForm = document.getElementById('logInForm');
const loginInp = document.getElementById('login');
const userName = document.querySelector('.user-name')
const btnOut = document.querySelector('.button-out')


let login = localStorage.getItem('username');

function toggleModAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {

  function logOut() {
    login = null;
    authBtn.style.display = '';
    userName.style.display = ''
    btnOut.style.display = ''
    btnOut.removeEventListener('click', logOut);
    localStorage.removeItem('username');
    checkAuth();
  }
  
  console.log('Авторизован')

  userName.textContent = login;

  authBtn.style.display = 'none';
  userName.style.display = 'inline'
  btnOut.style.display = 'block'

  btnOut.addEventListener('click', logOut);

}

function notAuthorized() {
  
  console.log('Не авторизован')

  function loginAuth(e) {
    e.preventDefault();
    login = loginInp.value;

    if (login === '') {
      alert('Не введен логин!');
      return;
    }

    localStorage.setItem('username', login);

    toggleModAuth();

    authBtn.removeEventListener('click',  toggleModAuth);
    closeAuth.removeEventListener('click',  toggleModAuth);
    logForm.removeEventListener('submit', loginAuth);
    logForm.reset();
    checkAuth();
  }

  authBtn.addEventListener('click',  toggleModAuth);
  closeAuth.addEventListener('click',  toggleModAuth);
  logForm.addEventListener('submit', loginAuth);
}

function checkAuth() {
  if (login) {
    authorized() 
  } else {
    notAuthorized();
  }
}

checkAuth();




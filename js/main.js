const authBtn = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logForm = document.getElementById('logInForm');
const loginInp = document.getElementById('login');
const userName = document.querySelector('.user-name');
const btnOut = document.querySelector('.button-out');
const cards = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const allRast = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


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


function createCard() {

  const card = `
  <a class="card card-restaurant">
    <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Пицца</h3>
        <span class="card-tag tag">50 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 900 ₽</div>
        <div class="category">Пицца</div>
      </div>
    </div>
  </a>
  `;


  cards.insertAdjacentHTML('afterbegin', card);

}


createCard();

function createGoods() {
  const el = document.createElement('article');
  el.className = 'card';

  el.insertAdjacentHTML('beforeend', `
  <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Везувий</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
        «Халапенье», соус «Тобаско», томаты.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">545 ₽</strong>
    </div>
  </div>
  `)


  cardsMenu.insertAdjacentElement('beforeend', el);


  
}


function openFood(e) {
  const item = e.target;
  const restaurant = item.closest('a');

  if (restaurant) {
    containerPromo.classList.add('hide')
    allRast.classList.add('hide')
    menu.classList.remove('hide')

    cardsMenu.textContent = '';

    createGoods();
    createGoods();
  
    createGoods();


  }


}

logo.addEventListener('click', function() {
  containerPromo.classList.remove('hide')
  allRast.classList.remove('hide')
  menu.classList.add('hide')
})


cards.addEventListener('click', openFood);



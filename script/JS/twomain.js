const ButtonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const ButtonAuthCancel = document.querySelector(".button-auth-cancel");
const LoginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#username");
const userhead = document.querySelector(".usernamehead");
const ButtonOut = document.querySelector(".button-Out");
const UnderModal = document.querySelector(".modal-under");
const cardsRestaurants = document.querySelector(".cards");
const containerPromo = document.querySelector(".container-pormo");
const mainGol = document.querySelector(".main-gol");
const conRest = document.querySelector(".con-rest");
const logo = document.querySelector(".logo");
const cardRest = document.querySelector(".card-rest");

const getData = async function(url){

    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Ошибка по адресу ${url}, статус ошибка ${response.status}!`)
    }

    return await response.json();

};

getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
});

let login = localStorage.getItem('gloDel');
function authorized() {

    function logOut(){
        login = '';
        localStorage.removeItem('gloDel');
        
        ButtonAuth.style.display = '';
        userhead.style.display = '';
        ButtonOut.style.display = '';
        ButtonOut.removeEventListener("click", logOut);
        checkAuth();
    }
    console.log("avto");

    userhead.textContent = login;

    ButtonAuth.style.display = 'none';
    userhead.style.display = 'inline';
    ButtonOut.style.display = 'flex';

    ButtonOut.addEventListener("click", logOut);
}

function notAuthorized() {
    console.log("notavto");
    function logIn(event){
        event.preventDefault();
        if(loginInput.value.trim()) {
            login = loginInput.value;
            localStorage.setItem('gloDel', login);
            ToogleModal();
            ButtonAuth.removeEventListener("click", ToogleModal);
            ButtonAuthCancel.removeEventListener("click", ToogleModal);
            LoginForm.removeEventListener("submit", logIn);
            LoginForm.reset();
            checkAuth();
        } else {
            
            loginInput.style.border = '444px solid #ff0000';
            loginInput.value = '';
        }
        
    }

    function ToogleModal(){
        modalAuth.classList.toggle("is-open");
        UnderModal.classList.toggle("is-open");
        loginInput.style.borderColor = '';
        if (modalAuth.classList.contains("is-open")){
            disableScroll();
        } else {
            enableScroll();
        }
    }
    ButtonAuth.addEventListener("click", ToogleModal 
        // modalAuth.classList.add("is-open");
        // ToogleModal();
    )
    
    ButtonAuthCancel.addEventListener("click", ToogleModal 
        // modalAuth.classList.remove("is-open");
        // ToogleModal();
    )

    LoginForm.addEventListener("submit", logIn);
    UnderModal.addEventListener('click', function (event) {
        if (event.target.classList.contains('is-open')) {
            ToogleModal()
        }
    })
    

}

function checkAuth(){
    if(login){
        authorized();
        
       
    } else {
        notAuthorized();
    }
    
}


checkAuth();

function createCardRestaurant(restaraunt) {

    const {
        image,
        kitchen,
        name,
        price,
        stars,
        products,
        time_of_delivery: timeOfDelivery


    } = restaraunt;

    console.log(image)

    const card = `
    <a href="restaraunt.html" data-products="${products}">
                <div class="card card1">
                    <img class="cardimg" src="${image}">
                    <div class="name-time">
                        <h3>${name}</h3>
                        <p>${timeOfDelivery} хв</p>
                    </div>
                    <div class="star-price-name">
                        <div class="star">
                            <img class="stark" src="assets/img/Vector.svg">
                            <p class="star-p">${stars}</p>
                        </div>
                        <div class="star">
                            <p class="star-p2">От ${price} грн</p>
                        </div>
                        <div class="star">
                            <img class="eclp" src="assets/img/Ellipse1.svg">
                            <p class="star-p3">${kitchen}</p>
                        </div>
                    </div>

                </div>
            </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card)
}




document.addEventListener('click', function(event) {
    const restaurantCard = event.target.closest('.card');

    if (restaurantCard) {
        const link = event.target.closest('a');
        if (link) {
            event.preventDefault(); // Предотвращение стандартного действия ссылки
            containerPromo.classList.add('hide');
            mainGol.classList.add('hide');
            conRest.classList.remove('hide');
            getData(`./db/${link.dataset.products}`).then(function(data){
                data.forEach(createCardGood);
            });
        }
    }
});

    createCardRestaurant();
        

function createCardGood( {description,
    
    image,
    name,
    price} ) {
    const card = document.createElement('div');
    card.className = 'card cardtow wow animate__animated animate__fadeInUp';

    

    card.insertAdjacentHTML('beforeend',`
       
            <img class="card-image" src="${image}">
            <p class="p1">${name}</p>
            <p class="p2">${description}</p>
            <div class="cup-price">
                <button class="btn2-rest">В корзину<img src="assets/img/icon-container.svg"></button>
                <p class="price-p">${price} UAH</p>
            </div>
        
    `);

    cardRest.insertAdjacentElement('beforeend',card);
}

createCardGood();

cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function(){
    containerPromo.classList.remove('hide');
    mainGol.classList.remove('hide');
    conRest.classList.add('hide');
    conRest.textContent = '';
});


new Swiper('.swiper-container',{
    sliderPerView: 1,
})



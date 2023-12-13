const ButtonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const ButtonAuthCancel = document.querySelector(".button-auth-cancel");
const LoginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#username");
const userhead = document.querySelector(".usernamehead");
const ButtonOut = document.querySelector(".button-Out");
const UnderModal = document.querySelector(".modal-under");


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
            // Вот не работает у меня красная обводка
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



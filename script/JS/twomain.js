const ButtonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const ButtonAuthCancel = document.querySelector(".button-auth-cancel");
const LoginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#username");
const userhead = document.querySelector(".usernamehead");
const ButtonOut = document.querySelector(".button-Out");


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
        login = loginInput.value;
        
        localStorage.setItem('gloDel', login);

        ToogleModal();
        ButtonAuth.removeEventListener("click", ToogleModal 
            // modalAuth.classList.add("is-open");
            // ToogleModal();
        );
        
        ButtonAuthCancel.removeEventListener("click", ToogleModal 
            // modalAuth.classList.remove("is-open");
            // ToogleModal();
        );
    
        LoginForm.removeEventListener("submit", logIn);
        // logIn.reset();
        checkAuth();
    }

    function ToogleModal(){
        modalAuth.classList.toggle("is-open");
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
}

function checkAuth(){
    if(login){
        authorized();
        
       
    } else {
        notAuthorized();
    }
    
}

checkAuth();



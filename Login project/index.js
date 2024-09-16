const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () =>{
    container.classList.add("active");
});

loginBtn.addEventListener('click',  () => {
    container.classList.remove("active");
});



let Menu = document.getElementById('Menu');

function toggleMenu(){
    Menu.classList.toggle("open-menu");
}
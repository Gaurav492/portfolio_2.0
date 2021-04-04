let nav = document.querySelector('nav ul');
let menu = document.getElementById('menu_checkbox')


menu.addEventListener('click', () =>{
    nav.classList.toggle('active-nav')
})
var navs  = document.querySelector('.navs');
var spin = document.querySelector('.spin');

spin.addEventListener('click', function(){

    navs.className = 'show';
    spin.className = 'block';
});
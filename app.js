//NAV
const nav = document.querySelector('.nav');
const header = document.querySelector('.header')
const navBgc = function(){
      if (window.pageYOffset >  header.offsetHeight) {
            nav.classList.add("nav--bgc");
          } else {
            nav.classList.remove("nav--bgc");
          }
}
window.addEventListener('scroll', navBgc)

//MENU
const menuBtn = document.querySelector(".nav__btn--small");
const menu = document.querySelector(".nav__menu--small");
menuBtn.addEventListener("click", ()=>menu.classList.toggle("show"));


//SLIDER
const slides = document.querySelectorAll(".slider__element");
let index = 0;
const arrowLeft = document.querySelector('.slider__leftArrow');
const arrowRight = document.querySelector('.slider__rightArrow');
const dots = document.querySelectorAll('.slider__singleDot');
dots.forEach(slide => slide.classList.add('whiteDot'));
dots[index].classList.remove('whiteDot');


const slider = function(){
      time = setInterval(nextSlide, 3000)
}
const showSlide = function(){
      slides.forEach(slide => slide.classList.add('none'));
      slides[index].classList.remove('none');
      dots.forEach(slide => slide.classList.add('whiteDot'));
      dots[index].classList.remove('whiteDot');
}

const previousSlide = function(){
      if(index == 0){
            index = 3;
      }else{
            index--;
      }
      showSlide();
}

const nextSlide = function(){
            if(index == slides.length - 1){
                  index = 0;
            }else{
                  index++;
            }
            showSlide();
}

window.addEventListener('load', slider)
arrowLeft.addEventListener('click', previousSlide);
arrowRight.addEventListener('click', nextSlide);


//POPUP
const videoBtn = document.querySelector('.main__videoBtn');
const popup = document.querySelector('.popup')
const popupBtn = document.querySelector('.popup__close')

const showVideo = function(){
      popup.classList.remove('popup--hide')
}
const closeVideo = function(){
      popup.classList.add('popup--hide')
}

videoBtn.addEventListener('click', showVideo);
popupBtn.addEventListener('click', closeVideo);

//Form
let fields = {
      firstName:{},
      name:{},
      email:{},
      message:{},
      statute:{}
};
fields['firstName'].name = document.getElementById('firstName');
fields['firstName'].error = '';
fields['name'].name = document.getElementById('name');
fields['name'].error = '';
fields['email'].name = document.getElementById('email');
fields['email'].error = '';
fields['message'].name = document.getElementById('message');
fields['message'].error = '';
fields['statute'].name = document.getElementById('statute');
fields['statute'].error = '';

const form = document.querySelector('#contact-form');
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea')
// const contactHeader = document.querySelector('.contact__header');

form.addEventListener('submit', function(e){
      
      e.preventDefault();

      let error = false;
      let postData = '';

      inputs.forEach( function( ob ){

            if( fields[ ob.name ] == undefined ){

                  return;
            }

            let content = '';

            switch( ob.name ){

                  case 'firstName':

                        content = 'Podaj swoje imię'
                        break;
                  case 'name':

                        content = 'Podaj swoje nazwisko'
                        break;
                  case 'email':

                        content = 'Podaj adres e-mail'
                        break;
                  case 'message':

                        content = 'Napisz wiadomość'
                        break;
                  case 'statute':

                        content = 'Potwierdź warunki RODO'
                        break;
            }

            if( ob.type == 'checkbox' ){

                  if( postData ){

                        postData += '&';
                  }

                  postData += ob.name+'='+( ob.checked ? 'true' : 'false' );

                  if( !ob.checked ){

                        fields[ ob.name ].error = content;
                        error = true;
                  }else{

                        fields[ ob.name ].error = '';
                  }
            }else{

                  if( postData ){

                        postData += '&';
                  }

                  postData += ob.name+'='+ob.value;

                  if( !ob.value ){

                        fields[ ob.name ].error = content;
                        error = true;
                  }else{

                        fields[ ob.name ].error = '';
                  }
            }
      } );

      for( const fieldName in Object( fields ) ) {

            if( fields[ fieldName ].error ){
                  fields[ fieldName ].name.parentNode.classList.add('form__element--error');
                  fields[ fieldName ].name.parentNode.firstElementChild.innerHTML = fields[ fieldName ].error;
                  console.log(fields[ fieldName ].name.parentNode.firstElementChild)
                  //display: block + inner HTML
            }else{
                  fields[ fieldName ].name.parentNode.classList.remove('form__element--error');
                  fields[ fieldName ].name.parentNode.firstElementChild.innerHTML = '';
                  //display: none
            }
      }

      const xhttp = new XMLHttpRequest();

      if( !error ){

            xhttp.onload = function() {
            
                  let jsonObject = JSON.parse( this.responseText );

                  for( const fieldName in Object( jsonObject ) ) {

                        if( jsonObject[ fieldName ].error ){

                              fields[ fieldName ].name.parentNode.classList.add('form__element--error');
                              fields[ fieldName ].name.parentNode.firstElementChild.innerHTML = jsonObject[ fieldName ].error;
                              //display: block + inner HTML
                        }else{

                              fields[ fieldName ].name.parentNode.classList.remove('form__element--error');
                              fields[ fieldName ].name.parentNode.firstElementChild.innerHTML = '';
                              //display: none
                        }
                  }
            }
      }

      xhttp.onerror = function() {
            alert('Błąd po stronie serwera!');
      }

      xhttp.open("POST", "http://localhost/projekt-rekrutacyjny/server.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhttp.send( postData );
      
})

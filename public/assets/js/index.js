$(document).ready(function() {
    var login = $("#login");
    var signup = $("#signup");
    var newpost = $("#newpost");


    // console.log(splitAnimation);
    login.click(function() {
        window.location.href='/login';
      });
    
    signup.click(function() {
        window.location.href='/signup'
    })

    newpost.click(function() {
        window.location.href='/posts'
    })
    // Write index page your CLIENT-SIDE logic here
    // This will run in the browser
});

const text = document.querySelector(".animation");
const strText = text.textContent;
const splitText = strText.split("")
// animation.textContent() = "";
text.textContent = "";
// console.log(splitText)

for (var i = 0; i < splitText.length; i++) {
    text.innerHTML += `<span class="letters">` + splitText[i] + "</span>"
};

let char = 0;
let timer = setInterval(onTick, 50);
function onTick () {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade','text-lime1');
    char++
    if (char === splitText.length) {
        complete();
        return;
    }
}

function complete () {
    clearInterval(timer);
    timer = null
}
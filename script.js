
    //swaps the nav to a hamburger menu when width is decreased
    let hamburger = document.getElementById('hamburger');
    let navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function(){
        if(navMenu.classList.contains('open')){
            navMenu.classList.remove('open');
        } else {
            navMenu.classList.add('open');
        }
    });

    

    /*
    //changes the profile picture on hover
    let flipContainer = document.getElementById('profile-flip');
    let profilePic = document.getElementById('profile-pic');

    flipContainer.addEventListener('mouseenter', function(){
            profilePic.style.opacity = '0';

            setTimeout(function () {
                profilePic.src = 'images/hero2.png';
                profilePic.style.opacity = '1';
            }, 300);
    });


    flipContainer.addEventListener('mouseleave' , function(){
            profilePic.style.opacity = '0';

            setTimeout(function(){
                profilePic.src = 'images/hero.jpg';
                profilePic.style.opacity = '1';
            }, 300);       
    });
    
   */

    //animates the skill load when in view/ on refresh
    let fills = document.querySelectorAll('.fill');
    let options = { threshold: 0.5 };
    let observer = new IntersectionObserver(handleIntersection, options);

    function handleIntersection(entries) {
        for (let i = 0; i < entries.length; i++) {
            let entry = entries[i];

            if (entry.isIntersecting) {
                let bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                observer.unobserve(bar);
            }
        }
    };


    //allows for easy edit of the percentages by changing the data width in html (0 to 100%) 
    //observer to check skill bar
    for (let i = 0; i < fills.length; i ++){
        observer.observe(fills[i]);
    };

    //loops through each skillbar then sets the width + the text
    let allFills = document.querySelectorAll('.fill');

    for (let i = 0; i < fills.length; i++){
        let currentBar = fills[i];
        let width = currentBar.getAttribute('data-width');
        let label = currentBar.querySelector('p');
        label.textContent = width + '%';
    };

    //checks all forms are filled up correctly before sending info.
    function validateForm() {
    let name = document.querySelector('input[type="text"]').value.trim();
    let email = document.querySelector('input[type="email"]').value.trim();
    let message = document.querySelector('textarea').value.trim();
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === '') {
        alert('Please enter your name.');
        return false;
    }
    if (email === '') {
        alert('Please enter your email.');
        return false;
    }
    if (validEmail.test(email) === false) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (message === '') {
        alert('Please enter a message.');
        return false;
    }
    return true;
    };


    //displays message below text area when something is sent.
    let sendButton = document.getElementById('submit');
    let confirmMessage = document.getElementById('confirm-msg');
    sendButton.addEventListener('click', function(e) {
            
            e.preventDefault();

            if(validateForm()  === true){

                // clear all the input fields
                document.querySelector('input[type="text"]').value = '';
                document.querySelector('input[type="email"]').value = '';
                document.querySelector('textarea').value = '';
                document.querySelector('input[type="date"]').value = '';
                // dsiplay aknowledgement message
                confirmMessage.classList.add('visible');
                // fade out after 3 seconds
                setTimeout(function() {
                confirmMessage.classList.remove('visible');
                }, 3000);
            }
                     
    });


    //toggle for dark theme
    let darkMode = false;
    document.getElementById('theme-toggle').addEventListener('click', function(){
            if (darkMode === false) {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.getElementById('theme-toggle').textContent = 'LIGHT';
                darkMode = true;
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                document.getElementById('theme-toggle').textContent = 'DARK';
                darkMode = false;
            }
    });



 function checkDate() {
    // get the input element
    let startInput = document.getElementById("date");

    let today = new Date(); // get todays date
    let year = today.getFullYear(); //extract  year
    let month = today.getMonth() + 1;  // extract Month() starts at 0 so we add 1
    let day = today.getDate(); //extract date

  
    if (month < 10) {
        month = "0" + month; //add 0 if les than 10
    }

    if (day < 10) {
        day = "0" + day; // add 0 if less than 10
    }

    let formattedDate = year + "-" + month + "-" + day;

    // set the min attribute on the input so past dates can't be selected
    startInput.min = formattedDate;
};

checkDate(); // disable prev date selection.
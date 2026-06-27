//swaps the nav to a hamburger menu when width is decreased
let hamburger = document.getElementById('hamburger');
let navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) {
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
for (let i = 0; i < fills.length; i++) {
    observer.observe(fills[i]);
};

//loops through each skillbar then sets the width + the text
for (let i = 0; i < fills.length; i++) {
    let currentBar = fills[i];
    let width = currentBar.getAttribute('data-width');
    let label = currentBar.querySelector('p');
    label.textContent = width + '%';
};


//FORM VALIDATION
function setError(fieldId, message) {
    let field = document.getElementById(fieldId);
    let errorSpan = document.getElementById(fieldId + '-error');

    if (message === '') {
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
        if (field) {
            field.classList.remove('invalid');
        }
    } else {
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
        if (field) {
            field.classList.add('invalid');
        }
    }
};

// checks all fields are filled correctly. returns true only if everything is ok.
function validateForm() {
    let valid = true;
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let confirmEmail = document.getElementById('confirm-email').value.trim();
    let message = document.getElementById('message').value.trim();
    let dateValue = document.getElementById('date').value;

    // clear all previous errors first
    setError('name', '');
    setError('email', '');
    setError('confirm-email', '');
    setError('message', '');
    setError('date', '');

    // name
    if (name === '') {
        setError('name', 'Please enter your name.');
        valid = false;
    }

    // email
    if (email === '') {
        setError('email', 'Please enter your email.');
        valid = false;
    } else if (validEmail.test(email) === false) {
        setError('email', 'Please enter a valid email address.');
        valid = false;
    }

    // confirm email
    if (confirmEmail === '') {
        setError('confirm-email', 'Please confirm your email.');
        valid = false;
    } else if (email !== confirmEmail) {
        setError('confirm-email', 'Emails do not match, please recheck.');
        valid = false;
    }

    // message
    if (message === '') {
        setError('message', 'Please enter a message.');
        valid = false;
    }

    // date (must be at least 1 day from today)
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let inputDate = new Date(dateValue);
    inputDate.setHours(0, 0, 0, 0);

    if (dateValue === '' || inputDate <= today) {
        setError('date', 'Please choose a date at least 1 day from today.');
        valid = false;
    }

    return valid;
};

// live validation: clear a field's error as soon as the user starts fixing it
let liveFields = ['name', 'email', 'confirm-email', 'message', 'date'];
for (let i = 0; i < liveFields.length; i++) {
    let el = document.getElementById(liveFields[i]);
    if (el) {
        el.addEventListener('input', function () {
            setError(liveFields[i], '');
        });
    }
};



// shows a summary of submitted content on success
let sendButton = document.getElementById('submit');
let summaryBox = document.getElementById('form-summary');

sendButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (validateForm()) {
        // grab the values before clearing
        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let message = document.getElementById('message').value.trim();
        let date = document.getElementById('date').value;

        // build the summary using textContent (safe against HTML injection)
        summaryBox.innerHTML = '';

        let heading = document.createElement('h3');
        heading.textContent = "Thanks for your message!";
        summaryBox.appendChild(heading);

        let rows = [
            ['Name', name],
            ['Email', email],
            ['Preferred date', date],
            ['Message', message]
        ];

        for (let i = 0; i < rows.length; i++) {
            let p = document.createElement('p');
            let label = document.createElement('strong');
            label.textContent = rows[i][0] + ': ';
            p.appendChild(label);
            p.appendChild(document.createTextNode(rows[i][1]));
            summaryBox.appendChild(p);
        }

        summaryBox.classList.add('show');

        // clear the input fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('confirm-email').value = '';
        document.getElementById('message').value = '';
        document.getElementById('date').value = '';

        // fade the bubble out after 5 seconds
        setTimeout(function () {
            summaryBox.classList.remove('show');
        }, 5000);
    }
});


// THEME TOGGLE

let darkMode = false;
document.getElementById('theme-toggle').addEventListener('click', function () {
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


//Date input disables past dates and sets the minimum date to today

function minimumDate() {
    // get the input element
    let startInput = document.getElementById('date');

    let today = new Date(); // get todays date
    let year = today.getFullYear(); // extract year
    let month = today.getMonth() + 1; // extract Month() starts at 0 so we add 1
    let day = today.getDate(); // extract date

    if (month < 10) {
        month = '0' + month; // add 0 if less than 10
    }

    if (day < 10) {
        day = '0' + day; // add 0 if less than 10
    }

    let formattedDate = year + '-' + month + '-' + day;

    // set the min attribute on the input so past dates can't be selected
    startInput.min = formattedDate;
};

minimumDate(); // disable prev date selection.
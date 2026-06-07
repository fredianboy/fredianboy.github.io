
    //swaps the nav to a hamburger menu at a certain point when width is decreased
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });


    //flips the profile picture on hover
    const flipContainer = document.getElementById('profile-flip');
    const profilePic = document.getElementById('profile-pic');

    flipContainer.addEventListener('mouseenter', () => {
    setTimeout(() => {profilePic.src = 'images/hero2.png';}, 300); 
    });

    flipContainer.addEventListener('mouseleave', () => {
    setTimeout(() => { profilePic.src = 'images/hero.jpg';}, 300);
    });


    //animates the skill load when in view/ on refresh
    const fills = document.querySelectorAll('.fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                observer.unobserve(bar); // only animates once
            }
        });
    }, { threshold: 0.5 });

    fills.forEach(fill => observer.observe(fill));
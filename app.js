// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
 //date object; this is a global object - with method getfullyear

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
 /*    linksContainer.classList.toggle('show-links');*/
const containerHeight = linksContainer.getBoundingClientRect().height;
const linksHeight = links.getBoundingClientRect().height

    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`
    } else {
        linksContainer.style.height = 0;
    }
});

const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// ********** fixed navbar ************
window.addEventListener('scroll', function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav');
    } else {
        navbar.classList.remove('fixed-nav');
    }

    if (scrollHeight > 500) {
        topLink.classList.add('show-link')
    } else {
        topLink.classList.remove('show-link');
    }
})

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){
    link.addEventListener('click', function(e){
        //prevents default functionality
        e.preventDefault();

        //navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1); //skips the # part of the ID (so not #href, just href)
        const element = document.getElementById(id);

        //calculate the height
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');

        let position = element.offsetTop - navHeight; 
        //gives a value for top of section; value will be a little bit off
        //removes navheight value that was covering the title of the section

            if(!fixedNav){ //done for when we aren't starting from the fixed position at top of page
                position = position - navHeight;
            }

            if(navHeight > 82){ //this is for the smaller screen; navheight is bigger than 82 in compact since its vertical and includes container
                position = position + containerHeight;
            }

        window.scrollTo({
            left:0, 
            top:position,
        });

        linksContainer.style.height = 0;
        //this closes the navbar on a smaller screen when scrolling
    });
}); 
//end
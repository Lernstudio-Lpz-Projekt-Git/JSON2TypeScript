/////////////////////////////// NAVIGATION ///////////////////////////////

const nav = document.querySelector('#main-nav');
const navElements = nav.querySelectorAll('a');
const navSlider = nav.querySelector('.nav-slider');
const activeClassName = 'active';

let initload = true;

navElements.forEach((elm) => {
    elm.addEventListener('click', ($event) => {
        // statt $event.path - $event.composedPath() verwenden
        const currBtn = getLinkElm($event.composedPath())
        addToggleClass(currBtn)
    })
})

function getActiveElement() {
    return document.querySelector(`.${activeClassName} `)
}

function getLinkElm(elements) {
    return elements.find((elm) => elm.tagName === 'A');
}

function addToggleClass(newElement) {
    const oldElement = document.querySelector(`.${activeClassName} `)
    oldElement.classList.remove(activeClassName)
    newElement.classList.add(activeClassName)
    animateNavSlider(newElement)
}

function animateNavSlider(element) {
    setAnimation();
    const navPosition = nav.getBoundingClientRect().x
    const elmPos = element.getBoundingClientRect().x
    const elmWidth = element.getBoundingClientRect().width
    const newPos = elmPos - navPosition
    navSlider.style.transform = `translate(${newPos}px, 0)scaleX(${(elmWidth / 13.4)})`
};

function setAnimation() {
    if (initload) {
        initload = false
    } else {
        navSlider.classList.add('animation')
    }
}

addToggleClass(getActiveElement())
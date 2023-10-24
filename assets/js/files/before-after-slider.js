/*
HTML markup hotkey bas

@@include('../../../components/_before-after-item.htm',{
"pathafter":"img/before-after/ba-1-after.jpg",
"pathbefore":"img/before-after/ba-1-before.jpg"
})
*/
import '../../scss/base/before-after-slider.scss';

class BeforeAfterImageSlider {
    constructor(sliderElement) {
        // Initialize elements and state
        this.slider = sliderElement;
        this.before = this.slider.querySelector('[data-before-item]');
        this.beforeImage = this.before.querySelector('img');
        this.change = this.slider.querySelector('[data-before-after-icon]');
        this.isActive = false;

        // Bind the methods to `this`
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);

        // Attach event listeners
        this.init();
    }

    init() {
        // Initialize the image width on DOM load
        window.addEventListener('DOMContentLoaded', () => {
            this.beforeImage.style.width = `${this.slider.offsetWidth}px`;
        });

        // Attach mouse and touch events
        this.change.addEventListener('mousedown', this.handleMouseDown);
        this.slider.addEventListener('mouseup', this.handleMouseUp);
        this.slider.addEventListener('mouseleave', this.handleMouseUp);
        this.slider.addEventListener('mousemove', this.handleMouseMove);
        this.change.addEventListener('touchstart', this.handleTouchStart);
        this.slider.addEventListener('touchend', this.handleTouchEnd);
        this.slider.addEventListener('touchcancel', this.handleTouchEnd);
        this.slider.addEventListener('touchmove', this.handleTouchMove);
    }

    handleMouseDown() {
        this.isActive = true;
    }

    handleMouseUp() {
        this.isActive = false;
    }

    handleMouseMove(e) {
        if (!this.isActive) return;
        const x = e.pageX - this.slider.getBoundingClientRect().left;
        this.beforeAfterSlider(x);
    }

    handleTouchStart() {
        this.isActive = true;
    }

    handleTouchEnd() {
        this.isActive = false;
    }

    handleTouchMove(e) {
        if (!this.isActive) return;
        const touch = e.changedTouches[0];
        const x = touch.pageX - this.slider.getBoundingClientRect().left;
        this.beforeAfterSlider(x);
    }

    beforeAfterSlider(x) {
        const maxShift = this.slider.offsetWidth - 20;
        const shift = Math.max(20, Math.min(x, maxShift));

        this.before.style.width = `${shift}px`;
        this.change.style.left = `${Math.max(0, Math.min(shift, maxShift))}px`;
    }

}

// Initialize all sliders
const sliders = document.querySelectorAll('[data-before-after-slider]');
sliders.forEach(slider => new BeforeAfterImageSlider(slider));
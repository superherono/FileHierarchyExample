import {
    _slideToggle
} from "./functions.js";

/* Careers Page tabs */

const pageCareers = document.querySelector('.page--careers');

if (pageCareers) {
    const careersButtons = document.querySelectorAll('.item-jobs-careers__show-more');
    const careersItemsBodys = document.querySelectorAll('.item-jobs-careers__inner');

    if (careersButtons.length) {
        let btnInitialText = `
        <svg width="24" height="24">
        <use xlink:href="img/icons/icons.svg#svg-plus"></use>
        </svg>
        <span>Read more</span>
        `;

        let btnOpenedText = `
        <span>Collapse</span>
        <svg width="24" height="24">
        <use xlink:href="img/icons/icons.svg#svg-arr-top"></use>
        </svg>
        `;

        const initCareersItemsBodyVisibility = function () {
            console.log('init');
            if (window.innerWidth < 991) {
                careersItemsBodys.forEach(careersItemsBody => {
                    careersItemsBody.setAttribute('hidden', 'true');
                });
            }
        }

        initCareersItemsBodyVisibility();

        const setActaulText = function (button) {
            if (button.classList.contains('active')) {
                button.innerHTML = btnInitialText;
                button.classList.remove('active');

                //lets scroll to top of element
                button.closest('.item-jobs-careers').querySelector('.item-jobs-careers__image').scrollIntoView({
                    behavior: "smooth",
                    block: 'nearest',
                });
            } else {
                button.innerHTML = btnOpenedText;
                button.classList.add('active');
            }
        }

        careersButtons.forEach(careersButton => {
            careersButton.addEventListener("click", function (e) {
                let currentHiddenText = careersButton.closest('.item-jobs-careers').querySelector('.item-jobs-careers__inner');

                setActaulText(careersButton);

                _slideToggle(currentHiddenText);

            });
        });
    }
}



/* Shedulle a call block logic */

const sheduleStepsWrapper = document.querySelector('.shedule-consult__wrapper');
const sheduleFirstStep = document.querySelector('[data-shedule-step="1"]');
const sheduleSecondStep = document.querySelector('[data-shedule-step="2"]');
const sheduleThirdStep = document.querySelector('[data-shedule-step="3"]');
const sheduleGoBackBtn = document.querySelector('.shedule-consult__link-back');

sheduleFirstStep.addEventListener("click", function (e) {

    let target = e.target.closest('.col-shedule-consult__row');
    if (target) {
        sheduleFirstStep.classList.remove('active');
        sheduleSecondStep.classList.add('active');

        sheduleStepsWrapper.closest('.popup__wrapper').scrollIntoView({
            behavior: "smooth"
        });

        _slideToggle(sheduleSecondStep);

        if (window.innerWidth < 650) {
            sheduleStepsWrapper.style.transform = `translateX(-114%)`;
        } else {
            sheduleStepsWrapper.style.transform = `translateX(-100%)`;
        }

    }
});

sheduleGoBackBtn.addEventListener("click", function (e) {
    sheduleFirstStep.classList.add('active');
    sheduleSecondStep.classList.remove('active');
    sheduleStepsWrapper.closest('.popup__wrapper').scrollIntoView({
        behavior: "smooth"
    });
    sheduleStepsWrapper.style.transform = `translateX(0%)`;

    _slideToggle(sheduleSecondStep);
});

//Second Step logic
document.addEventListener("formSent", function (e) {
    // Форма
    const currentForm = e.detail.form;

    //Дописать логику на определение нужной формы
    if (currentForm.classList.contains('shedule-consult__wrapper')) {
        sheduleSecondStep.classList.remove('active');
        sheduleThirdStep.classList.add('active');

        sheduleStepsWrapper.closest('.popup__wrapper').scrollIntoView({
            behavior: "smooth"
        });

        if (window.innerWidth < 650) {
            sheduleStepsWrapper.style.transform = `translateX(-230%)`;
        } else {
            sheduleStepsWrapper.style.transform = `translateX(-208%)`;
        }

        setTimeout(() => {
            sheduleSecondStep.classList.add('hidden');
            sheduleFirstStep.classList.add('hidden');
        }, 400);
    }
});

//Switch language logic

let languageSwitcher = document.querySelector('.languages');

if (languageSwitcher) {
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains('languages__label') || e.target.closest('.languages__label')) {
            languageSwitcher.classList.toggle('active');
        } else {
            languageSwitcher.classList.remove('active');
        }
    });
}
//timer

const
    minute = 1000 * 60,
    hour = minute * 60,
    day = hour * 24;

const dayBlock = document.querySelector('.timer-about__digits--day');
const hoursBlock = document.querySelector('.timer-about__digits--hours');
const minutesBlock = document.querySelector('.timer-about__digits--minutes');


let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "10/11/",
    birthday = dayMonth + yyyy,
    currentDate = new Date('October 11, 2022 18:30:00');

today = mm + "/" + dd + "/" + yyyy;
if (today > birthday) {
    birthday = dayMonth + nextYear;
}
//end

const getRemaningTime = function () {
    const now = new Date().getTime(),
        distance = countDown - now;

    console.log(`now: ${now}`);
    console.log(`distance: ${distance}`);
    console.log(`birthday: ${birthday}`);
    console.log(`countDown: ${countDown}`);

    dayBlock.innerText = Math.floor(distance / (day)),
        hoursBlock.innerText = Math.floor((distance % (day)) / (hour)),
        minutesBlock.innerText = Math.floor((distance % (hour)) / (minute));

    //do something later when date is reached
    if (distance < 0) {
        console.log('finished');
        clearInterval(x);
    }
};

const countDown = new Date(currentDate).getTime(),
    x = setInterval(function () {
        getRemaningTime();
        //seconds
    }, 1000 * 60);

getRemaningTime();
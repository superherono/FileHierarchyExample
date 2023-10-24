// Создаем функцию, в которой каждый скрипт подключаем внутри своего таймаута, чтобы предыдущий успевал загрузиться и выполниться.
// Некоторые скрипты стоит отклыдвать только по одному событию, а не по всем, например загрузку карты проезда с яндекса или гугла можно откладывать только по скроллу, даже без таймаута.
// Чаты и другие маркетинговые инструменты, которые отображаются на странице спустя какое-то время можно отклыдвать только по таймеру и смело откалыдвать чат на 15-20 секунд.

let psLoadedJs = false
const getExtJs = () => {
    // проверяем, была ли выполнена функция ранее
    if (!psLoadedJs) {
        psLoadedJs = true
        // при выполенении функций удаляем события, которые были навешаны ранее.
        window.removeEventListener("scroll", getExtJs, false)
        window.removeEventListener("touchstart", getExtJs, false)
        window.removeEventListener("mousemove", getExtJs, false)
        window.removeEventListener("click", getExtJs, false)
        window.removeEventListener("keydown", getExtJs, false)
        clearTimeout(getExtJsTimeout)
        setTimeout(() => {
            // Здесь все внешние скрипты, вроде живосайта, метрики,
            // аналитикса, обратные звонки, коллтрекинги и так далее
        }, 300)
        // Для каждого скрипта нужно подбирать время, чтобы предыдущий успевал загрузиться и инициализироваться.
    }
}
// Вешаем выполнение функцию на каждое необходимое событие. Здесь перечислены самые распространенные.
window.addEventListener("scroll", getExtJs, {
    passive: true
})
window.addEventListener("touchstart", getExtJs, {
    passive: true
})
window.addEventListener("mousemove", getExtJs, {
    passive: true
})
window.addEventListener("click", getExtJs, {
    passive: true
})
window.addEventListener("keydown", getExtJs, {
    passive: true
})
// Если никакое событие не произошло, то выполняем функцию через 5 секунд
let getExtJsTimeout = setTimeout(getExtJs, 5000)
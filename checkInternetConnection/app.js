let isOnline = true
let intervalIdd
let timer = 10
const popup = document.querySelector(".popup")
const wifiIcon = document.querySelector(".icon i")
const popupTitle = document.querySelector(".popup .title")
const popupDesc = document.querySelector(".desc")
const reconnectBtn = document.querySelector(".reconnect")

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        isOnline = response.status >= 200 && response.status < 300
    } catch (error) {
        isOnline = false
    }
    handkePopup(isOnline)
}

// check connection status every 3 sec
setInterval(checkConnection, 3000)

const handkePopup = (status) => {
    if (status) {
        wifiIcon.classList = ""
        popupTitle.innerText = "Restored Connection"
        popupDesc.innerHTML = "Your device is now successfully connected to the internet."
        popup.classList.add("online")
        return setTimeout(()=> popup.classList.remove("show", "online"), 2000)
    }
    wifiIcon.classList = ""
    popupTitle.innerText = "Lost Connection"
    popupDesc.innerHTML = `Your network is unavailable. we will attempt to reconnect you in <b>10</b> seconds.`
    popup.classList = "popup show"

}

setInterval(()=> {
    timer--
    if (timer == 0) {
        timer = 10
    }
    popup.querySelector('.desc b').innerHTML = timer
}, 1000)

// setInterval(() => isOnline && checkConnection(), 3000)

reconnectBtn.addEventListener('click', checkConnection)
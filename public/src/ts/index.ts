// import { defineCustomElements } from "@agcamacho/mrapi-webcomponents/loader"

console.log("Front-end Environment:", process.env.NODE_ENV)

// if (process.env.NODE_ENV == "production") {
//     defineCustomElements(window)
// }

let logoutEl = document.getElementById("log-out")
logoutEl?.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    window.location.href = "/auth/logout"
})

let closeWarning = document.querySelector(".site-warning-section__close")
let warning = document.querySelector(".site-warning-section") as HTMLElement
closeWarning?.addEventListener("click", (e) => {
    e.preventDefault()
    warning.style.display = "none"
})

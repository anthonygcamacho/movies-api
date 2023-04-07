export const formatDate = (date: Date) => {
    let hours = date.getHours()
    let minutes: number | string = date.getMinutes()
    let ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12 // the hour "0" should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes
    var strTime = hours + ":" + minutes + " " + ampm
    return (
        new Intl.DateTimeFormat("en", { month: "short" }).format(date) +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear() +
        " " +
        strTime
    )
}

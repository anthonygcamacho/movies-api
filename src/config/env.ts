// Uncomment for production apps
// import constants from "./constants"
// export default require(`./env-${constants.ENV}`)

// Forcing production for demo app
// Demo app is not being consumed by a large user base
export default require(`./env-production`)

const _ = require("lodash")

const compareArrays = (a: string[], b: string[]) => {
    return _.isEqual(a.sort(), b.sort())
}

export default compareArrays

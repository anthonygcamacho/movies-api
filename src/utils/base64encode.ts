export const base64Encode = (objStr: string): string => {
    return Buffer.from(objStr).toString("base64")
}

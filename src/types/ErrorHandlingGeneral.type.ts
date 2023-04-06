export interface ErrorHandlingGeneral extends Error {
    severity: string
    query: {
        name: string
    }
    code: number
    message: string
    receive: number
}

export function isErrorHandlingGeneral(x: unknown): x is ErrorHandlingGeneral {
    if (x && typeof x === "object" && ("severity" in x || "code" in x)) {
        return true
    }
    return false
}

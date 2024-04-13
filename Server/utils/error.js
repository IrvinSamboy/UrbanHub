export const errorHandler = (statisCode, message) => {
    const error = new Error(message)
    error.statusCode = statisCode
    error.message = message
    return error
}
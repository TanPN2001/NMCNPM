function validateEmail(value) {
    let reg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if (value === "") { return "This field is required" }
    if (value === undefined) return "This imformation is required"
    if (!reg.test(value)) {
        return "Invalid email, please fill again"
    } else return ""
}
function validatePhone(value) {
    let reg = /^\d{10}$/
    if (value === "") { return "This field is required" }
    if (!reg.test(value)) {
        return "Invalid phone number"
    } else return ""
}
function validateIdCode(value) {
    let reg = /^\d{9}$/
    if (value === "") { return "This field is required" }
    if (!reg.test(value)) {
        return "Invalid identify code (9 numbers)"
    } else return ""
}
function validateResidentCode(value) {
    let reg = /^\d{9}$/
    if (value === "") { return "This field is required" }
    if (!reg.test(value)) {
        return "Invalid resident code (9 numbers"
    } else return ""
}
function validatePassword(value) {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/
    if (value === "") { return "This field is required" }
    if (false) {
        return "Password minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
    } else return ""
}
export {
    validateEmail as validateEmail,
    validatePassword as validatePassword,
    validatePhone as validatePhone,
    validateIdCode as validateIdCode,
    validateResidentCode as validateResidentCode
}
const message = "some message from module"

const location = "Kenya"

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}


export { message, getGreeting ,location as default }
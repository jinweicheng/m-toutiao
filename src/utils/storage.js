

// setItem
export const setItem = (key,value) => {
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value)
}
// getItem
export const getItem = (key) => {
    let data = localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}
// delectItem
export const removeItem = (key) => {
    localStorage.removeItem(key)
}
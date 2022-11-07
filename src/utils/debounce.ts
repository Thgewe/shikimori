export const debounce = (callback: Function, delay: number = 1000) => {
    let isDelay: boolean = false
    return () => {
        if (!isDelay) {
            isDelay = true
            callback()
            setTimeout(() => {
                isDelay = false
            }, delay)
        }
    }
}
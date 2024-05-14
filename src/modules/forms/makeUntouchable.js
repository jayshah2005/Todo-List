export function makeUntouchable() {
    document.querySelector('#content').className = 'untouchable'
}

export function makeTouchable() {
    document.querySelector('.untouchable').className = ""
}
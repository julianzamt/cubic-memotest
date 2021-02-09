import { roll } from "./roll"

const cubeFaces = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "bottom"
]

let randomCubeFaces = []
let discard = []


for (let i = 0; i < 6; i++) {
    const random = roll(0, cubeFaces.length)
    if (!discard.includes(random)) {
        discard.push(random)
        randomCubeFaces.push(cubeFaces[random])
    }
    else {
        i--
    }
}

console.log(randomCubeFaces)

export default randomCubeFaces
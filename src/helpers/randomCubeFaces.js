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
let random = null;

while (randomCubeFaces.length < cubeFaces.length) {
    random = roll(0, cubeFaces.length)
    if (!discard.includes(random)) {
        discard.push(random)
        randomCubeFaces.push(cubeFaces[random])
    }
}

console.log(randomCubeFaces)

export default randomCubeFaces
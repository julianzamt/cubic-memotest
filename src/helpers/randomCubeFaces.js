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

while (randomCubeFaces.length < 7) {
    random = roll(0, cubeFaces.length)
    if (!discard.includes(random)) {
        discard.push(random)
        randomCubeFaces.push(cubeFaces[random])
    }
}

export default randomCubeFaces
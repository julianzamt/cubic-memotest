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
let random = null;

while (randomCubeFaces.length < cubeFaces.length) {
    random = roll(0, cubeFaces.length)
    if (!randomCubeFaces.includes(cubeFaces[random])) {
        randomCubeFaces.push(cubeFaces[random])
    }
}

export default randomCubeFaces
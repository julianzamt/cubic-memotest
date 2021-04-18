import { roll } from "./roll"
import francella_1 from "../img/francellas/francella-1.jpg"
import francella_2 from "../img/francellas/francella-2.png"
import francella_3 from "../img/francellas/francella-3.png"
import francella_4 from "../img/francellas/francella-4.png"
import francella_5 from "../img/francellas/francella-5.png"
import francella_6 from "../img/francellas/francella-6.png"
import francella_7 from "../img/francellas/francella-7.png"
import francella_8 from "../img/francellas/francella-8.png"
import francella_9 from "../img/francellas/francella-9.png"
import francella_10 from "../img/francellas/francella-10.png"
import francella_11 from "../img/francellas/francella-11.png"
import francella_12 from "../img/francellas/francella-12.png"
import francella_13 from "../img/francellas/francella-13.png"
import francella_14 from "../img/francellas/francella-14.png"
import francella_15 from "../img/francellas/francella-15.png"
import francella_16 from "../img/francellas/francella-16.png"
import francella_17 from "../img/francellas/francella-17.png"
import francella_18 from "../img/francellas/francella-18.png"

const francellas = [
    francella_1,
    francella_2,
    francella_3,
    francella_4,
    francella_5,
    francella_6,
    francella_7,
    francella_8,
    francella_9,
    francella_10,
    francella_11,
    francella_12,
    francella_13,
    francella_14,
    francella_15,
    francella_16,
    francella_17,
    francella_18
]

function sortCubeCards() {
    /* Random Cube Cards */
    // Select 3 cards of deck
    let cubeCards = []
    let random = null
    while (cubeCards.length < 3) {
        random = roll(0, francellas.length)
        if (!cubeCards.includes(francellas[random])) {
            cubeCards.push(francellas[random])
        }
    }
    // Duplicate them 
    cubeCards = cubeCards.concat(cubeCards)
    // Random Sort
    // TODO - ver Fishes-Yates Algorithm (https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb)
    cubeCards.sort(() => Math.random() - 0.5)
    return cubeCards
}

export { sortCubeCards }

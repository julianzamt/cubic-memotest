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
]

let randomFrancellas = []
let random = null;

while (randomFrancellas.length < 11) {
    random = roll(0, francellas.length)
    if (!randomFrancellas.includes(francellas[random])) {
        randomFrancellas.push(francellas[random])
    }
}

export default randomFrancellas

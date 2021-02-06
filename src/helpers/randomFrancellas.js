import { roll } from "./roll"

let francellas = []
let randomFrancellas = []

const fs = require('fs');
const dir = '../img/francellas';

fs.promises.readdir(dir)
    .then(files => {
        for (let francella of files) {
            francellas.push(francella)
        }
    })
    .then(() => {
        for (let i = 0; i < 10; i++) {
            const random = roll(0, francellas.length)
            randomFrancellas.push(francellas[random])
        }
    })
    .catch(err => console.log(err))

export { randomFrancellas }

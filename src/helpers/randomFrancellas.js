import { roll } from "./roll"

// TODO: investigate require.context
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
//   }

//   const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

let francellas = []
let randomFrancellas = []



// firebase.db.collection("Public/Images/Francellas")
//     .get()
//     .then(querySnapshot => {
//         querySnapshot.docs.map(francella => francellas.push(francella))
//     })
//     .then(() => {
//         for (let i = 0; i < 10; i++) {
//             const random = roll(0, francellas.length)
//             randomFrancellas.push(francellas[random])
//         }
//     })
//     .catch(err => console.log(err))

export { randomFrancellas }

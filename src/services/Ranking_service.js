import firebase from "../config/firebase"

let rankingRef = firebase.db.collection("Ranking")

function addScoreToRanking(score, username) {
    rankingRef.add({
        username: username,
        score: score
    })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

export { addScoreToRanking }
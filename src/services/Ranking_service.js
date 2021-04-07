import { useContext } from "react"
import AppContext from "../context/AppContext"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"

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

const useGetRanking = () => {
    const context = useContext(AppContext)
        (rankingRef.orderBy("score", "desc").limit(10).get()
            .then((querySnapshot) => {
                const ranking = querySnapshot.docs.map((item, index) =>
                    <HighScore
                        key={item.id}
                        index={index + 1}
                        username={item.data().username}
                        score={item.data().score}
                    />
                )
                context.setRanking(ranking)
            }))
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

export { addScoreToRanking }
export { useGetRanking }
import { db } from "../firebaseConfig";
import { doc, setDoc, getDocs, query, collection, limit, where } from "firebase/firestore";
import { loggedInUserId } from "./authService";

export async function saveFavorite(song, user) {
    const track_id = song.trackId;
    const user_id = user.uid;
    const key = `LpEERDmHsuuQOO5zNzCn`;
    await setDoc(doc(db, "favorites", key), { track_id, user_id });
}

export async function fetchFavorites(user) {
    const snapshot = await getDocs(
        query(collection(db, "favorites"), where("user_id", "==", loggedInUserId()))
    );
return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    track_id: doc.data().song_id,
}));
}
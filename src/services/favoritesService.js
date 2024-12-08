import { db } from "../firebaseConfig";
import { doc, setDoc, getDocs, query, collection, limit, where } from "firebase/firestore";
import { loggedInUserId } from "./authService";

export async function saveFavorite(song, user) {
    const songId = song.trackId;
    const userId = user.uid;
    const key = `${userId}_${songId}`;
    await setDoc(doc(db, "favorites", key), { songId, userId });
}

export async function fetchFavorites(user) {
    const snapshot = await getDocs(
        query(collection(db, "favorites"), where("userId", "==", loggedInUserId()))
    );
return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    trackId: doc.data().songId,
}));
}



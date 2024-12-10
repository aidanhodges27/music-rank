import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { doc, setDoc, getDocs, query, collection, limit, where } from "firebase/firestore";
import { loggedInUserId } from "./authService";

export async function saveFavorite(song, user) {
    const track_id = song.trackId;
    const user_id = user.uid;
    await addDoc(collection(db, "favorites"), { track_id, user_id });
}

export async function fetchFavorites(user) {
    const snapshot = await getDocs(
        query(collection(db, "favorites"), where("user_id", "==", loggedInUserId()))
    );
    
    return snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
}
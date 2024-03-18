import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "@/configs/firebase";
const firestore = getFirestore(app);

export async function addChatUser(email, user) {
  try {
    const querySnapshot = await getDocs(query(collection(firestore, "users"), where("email", "==", email)));

    if (querySnapshot.empty) {
        const userRef = doc(collection(firestore, `users`), user.id.toString());
        await setDoc(userRef, user);
        return true;
    } else {
      return false
    }
  } catch (error) {
    return false;
  }
}

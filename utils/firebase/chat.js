import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "@/configs/firebase";
const firestore = getFirestore(app);

export const messageTypes = {
  text: "text",
  image: "image",
  file: "file",
};

export async function getUsers(id) {
  try {
    const usersRef = query(collection(firestore, `users`));
    const querySnapshot = await getDocs(usersRef);
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    throw error;
  }
}

export async function CheckChatExists(email, user) {
  try {
    const querySnapshot = await getDocs(query(collection(firestore, "users"), where("email", "==", email)));

    if (!querySnapshot.empty && querySnapshot.docs[0].id != user?.id) {
      const retrievedUser = querySnapshot.docs[0].data();
      const userRef = doc(collection(firestore, `users/${user.id}/my_users`), retrievedUser.id);
      await setDoc(userRef, {});
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("DOC ERROR >>>>>>>>>", error);
    return false;
  }
}


export async function insertFirstMessage(chatUser, message, type, user) {
  try {
    const data = {
      toId: chatUser.id,
      message: message,
      read: false,
      type: type,
      fromId: user.id,
      sent: true,
    };
    const userRef = doc(collection(firestore, `users/${user.id}/my_users`), retrievedUser.id);
    await addDoc(userRef, data);
    return true;
  } catch (error) {
    return false;
  }
}

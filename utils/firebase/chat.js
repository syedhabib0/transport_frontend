import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  setDoc,
  doc,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import app from "@/configs/firebase";
import { toast } from "react-toastify";
const firestore = getFirestore(app);

export const messageTypes = {
  text: "text",
  image: "image",
  file: "file",
};

export async function getUsers(id) {
  try {
    const userRef = query(collection(firestore, `users/${id}/my_users`));
    const userQuerySnapshot = await getDocs(userRef);
    const usersIds = userQuerySnapshot.docs.map((doc) => doc.id);
    const usersRef = collection(firestore, "users");
    let queryRef = query(usersRef, where("id", "in", usersIds));
    const querySnapshot = await getDocs(queryRef);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
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
    return false;
  }
}

export async function insertFirstMessage(chatUser, message, type, user) {
  try {
    const data = {
      toId: chatUser.id,
      message: message,
      read: Date.now(),
      type: type,
      fromId: user.id,
      sent: Date.now(),
    };

    const isUserExists = await checkChatExists(chatUser.email, user);
    if (!isUserExists) {
      toast.error("User not found");
      return false;
    }

    const chatRef = doc(collection(firestore, "chats"), `${user.id}_${chatUser.id}`);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      await setDoc(chatRef, {});
    }

    const messagesRef = collection(firestore, `chats/${user.id}_${chatUser.id}/messages`);
    await addDoc(messagesRef, data);

    return true;
  } catch (error) {
    console.error("Error inserting first message:", error);
    return false;
  }
}

export async function getAllMessages(user, chatUser) {
  try {
    const messagesRef = query(
      collection(firestore, `chats/${user.id}_${chatUser.id}/messages`),
      orderBy("sent", "asc")
    );
    const querySnapshot = await getDocs(messagesRef);
    const messages = querySnapshot.docs.map((doc) => doc.data());
    return messages;
  } catch (error) {
    console.error("Error getting All message:", error);
    return [];
  }
}

export async function insertMessage(chatUser, message, type, user) {
  try {
    const data = {
      toId: chatUser.id,
      message: message,
      read: Date.now(),
      type: type,
      fromId: user.id,
      sent: Date.now(),
    };

    const messagesRef = collection(firestore, `chats/${user.id}_${chatUser.id}/messages`);
    await addDoc(messagesRef, data);

    return true;
  } catch (error) {
    console.error("Error inserting message:", error);
    return false;
  }
}

export function listenForNewMessages(chatUser,user, callback) {
  if (!chatUser?.id) {
    return () => {};
  }
  const messagesRef = collection(firestore, `chats/${user.id}_${chatUser.id}/messages`);

  const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const newMessage = change.doc.data();
        newMessage.id = change.doc.id;
        callback(newMessage);
      }
    });
  });
  return unsubscribe;
}

import { getFirestore, setDoc, doc, getDoc , collection, Timestamp} from 'firebase/firestore'

export const addUser = async (info) => {
  const db = getFirestore()
  const usersCollection = doc(db, "users", info.uid);
  await setDoc(usersCollection, {...info, createdAt: Timestamp.now()})
}

export const getUserInfo = async (uid) => {
  const db = getFirestore()
  const usersCollection = doc(db, "users", uid);
  const userDoc = await getDoc(usersCollection)
  if (!userDoc.exists) {
    return null
  }
  return userDoc.data()
}

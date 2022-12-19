import { getFirestore, setDoc, doc, getDocs , collection, Timestamp, addDoc, query, where, deleteDoc, onSnapshot } from 'firebase/firestore'

import { authState } from '../libs/atoms/auth';

import { useRecoilValue } from 'recoil';


export const addTranscript = async (data) => {
    const db = getFirestore()
    const transcripts = collection(db, `users/${data.uid}/transcripts`);
    const {id} = await addDoc(transcripts, data)
    await setDoc(doc(db, `users/${data.uid}/transcripts`, id), {createdAt: Timestamp.now(), id:id}, {merge: true})
}

export const fetchTranscripts = async (uid) => {
        const db = getFirestore()
        const transcriptRef = collection(db, `users/${uid}/transcripts`);
        const transcriptSnapshot = await getDocs(transcriptRef);
        const transcriptList = transcriptSnapshot.docs.map(doc => doc.data());
        return transcriptList
}

export const deleteTranscript = async (uid, id) => {
const db=getFirestore()
await deleteDoc(doc(db, `users/${uid}/transcripts`, id));
}
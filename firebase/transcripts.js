import { getFirestore, setDoc, doc, getDoc , collection, Timestamp, addDoc} from 'firebase/firestore'

import { authState } from '../libs/atoms/auth';

import { useRecoilValue } from 'recoil';

export const addTranscript = async (data) => {

    // const {uid} = useRecoilValue(authState)
    console.log(data, 'recieved data')
    const db = getFirestore()
    const transcripts = collection(db, `users/${data.uid}/transcripts`);
    await addDoc(transcripts, {...data, createdAt: Timestamp.now()})
}

import {} from '../firebaseConfig'
import {collection,doc,getDoc,getDocs, orderBy, query} from 'firebase/firestore';

// fetching data from database
 export const getAllFeeds = async (firestoreDb) =>{
    try {
       const feeds =  await getDocs(
            query(collection(firestoreDb, 'videos'),orderBy('id','desc'))
        )

        return feeds.docs.map(doc=>doc.data());
    } catch (error) {
        console.log(error)
    }
 } 


// user information using userid
 export const userInfo=  async (firestoreDb , userId)=>{
    const userRef = doc(firestoreDb,'users',userId)
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()){
        return userSnap.data()
    }
    return 'No such user'
 }


 export const videoInfo = async (firestoreDb,id) =>{
    const videoRef = doc(firestoreDb,'videos',id)
    const videSnap = await getDoc(videoRef)
    if(videSnap.exists()){
        return videSnap.data()
    }
    return 'No such Video'
 }
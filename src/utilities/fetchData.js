import {} from '../firebaseConfig'
import {collection,deleteDoc,doc,getDoc,getDocs, orderBy, query, where} from 'firebase/firestore';

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
    const videoRef =  doc(firestoreDb,'videos',id)
    const videSnap = await getDoc(videoRef)
    if(videSnap.exists()){
        return videSnap.data()
    }
    else{
        return 'No such Video'
    }
 }


 export const deleteVideo = async (firestoreDb,id) =>{
    await deleteDoc(doc(firestoreDb,'videos',id))
 }

 export const userUploadedVideos = async (firestoreDb,userId) =>{
    try {
       const feeds =  await getDocs(
            query(collection(firestoreDb, 'videos'),where('userId','==','',userId),('id','desc'))
        )

        return feeds.docs.map(doc=>doc.data());
    } catch (error) {
        console.log(error)
    }
 } 
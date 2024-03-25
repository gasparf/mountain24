import jsonData from "./firebase_config.json";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, collection, getCountFromServer } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormData } from "./UploadMenu";


const firebaseConfig = {
    apiKey: jsonData.apiKey,
    authDomain: jsonData.authDomain,
    projectId: jsonData.projectId,
    storageBucket: jsonData.storageBucket,
    messagingSenderId: jsonData.messagingSenderId,
    appId: jsonData.appId,
    measurementId: jsonData.measurementId
};

const app = initializeApp(firebaseConfig);
const store = getFirestore();

const storage = getStorage();

const imgDirectory = "images/";
const imgDataType = ".jpg";

export const dataSubmission = async (info : FormData) => {

    if(!info.photo)
    {
        console.error("no photo file! data upload failed!");
        return;
    }

    //checks if the location exists in the db already or not
    //creates a doc if there isn't
    const locEntry = doc(store, 'Locations', info.locationName);
    const loc = await getDoc(locEntry)
    
    let id = "";

    if (!loc.exists()) {
        try {
            await setDoc(locEntry, {
                CommunityStitch: "null"
            })
        }
        catch(e)
        {
            console.log(e)
        }
    }else{
        const stash = collection(store, 'Locations', info.locationName, 'locationEntries')
        const snap = await getCountFromServer(stash);
        id = snap.data().count.toString();
    }

    const imgRef = ref(storage, imgDirectory + info.locationName + id + imgDataType);

    let fileUrl : string = "";

    //image upload to firebase storage
    try {
        await uploadBytes(imgRef, info.photo).then((snapshot) => {
            console.log("image upload success!");
            fileUrl = snapshot.ref.fullPath;
        })
    }
    catch(e)
    {
        console.error("image upload error!");
    }
    

    //data upload to firebase database
    try{
        await setDoc(doc(store, 'Locations', info.locationName, 'locationEntries', 'entry' + id), {
            direction: info.direction,
            imageReference: fileUrl,
            latitude: info.lat,
            longitude: info.lon,
            season: info.season,
            time: info.time
        });

        console.log("data upload success!");
    } catch (e) {
        console.error("data upload error!");
    }
}

//method for url retrieval to access images
export const getImgURL = (url: string) : string => {
    const reference = ref(storage, url);

    let accessURL = "";

    getDownloadURL(reference).then((data) => {
        accessURL = data;
    }).catch((e) => {
        console.error("download url for " + url + "retrieval error!");
    });

    return accessURL;
}
import jsonData from "./firebase_config.json";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, collection, getCountFromServer, getDocsFromServer, query, CollectionReference, DocumentData} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


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

interface SnapshotProperties {
    direction: string;
    locationName: string;
    lat: number;
    lon: number;
    season: string;
    time: string;
}

export interface SnapshotForm extends SnapshotProperties{
    photo: File | null;
}

export interface SnapshotInfo extends SnapshotProperties{
    photo: string;
}

export const dataSubmission = async (info : SnapshotForm) => {

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
        await uploadBytes(imgRef, info.photo as File).then((snapshot) => {
            console.log("image upload success!");
            fileUrl = snapshot.ref.fullPath;
        })
    }
    catch(e)
    {
        console.error("image upload error!");
    }
    
    fileUrl = await(getImgURL(fileUrl));

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
export const getImgURL = async (url: string) => {
    const reference = ref(storage, url);

    let accessURL = "";

    await getDownloadURL(reference).then((data) => {
        accessURL = data;
    }).catch((e) => {
        console.error("download url for " + url + "retrieval error!");
    });

    return accessURL;
}

export const getInfo = async () => {
    const snap = await getCountFromServer(collection(store, 'Locations'));
    const id = snap.data().count.toString();
    console.log(id)
}

export const getCollectionDocs = async (collectionRef : CollectionReference) => {

    let q = query(collectionRef );

    const locations = await getDocsFromServer(q);
    
    let docs : DocumentData[] = [];
    
    locations.forEach((doc) => {
        docs.push(doc);
    })

    return docs;
}

export const getCollectionInfo = async (collectionRef : string) => {
    const docs = await getCollectionDocs(collection(store, "Locations", collectionRef, "locationEntries"));

    let info : SnapshotInfo[] = [];

    docs.forEach( async (dInfo) => {
        info.push(docToLoc(dInfo, collectionRef));
    })

    return info;
}

const docToLoc = (doc : DocumentData, name : string) : SnapshotInfo => {
    const data = doc.data();
    const translation : SnapshotInfo = {
        direction: data['direction'],
        locationName: name,
        photo: data['imageReference'],
        lat: data['latitude'],
        lon: data['longitude'],
        season: data['season'],
        time: data['time']
    };
    return translation;
}

export const getExploreData = async () => {
    
    const locations = await getCollectionDocs(collection(store, 'Locations'));

    const info = locations.map( async (docInfo) => {
        const docRef = doc(store, "Locations", docInfo.id, "locationEntries", "entry");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docToLoc(docSnap, docInfo.id);
            // console.log(docToLoc(docSnap));
        }else{
            return null
        }
    })
    const docs = await Promise.all(info)

    // basically gets all the location data possible and returns it
    // vvvvvvvv

    // const t = await Promise.all(docs);
    // const out = t.filter((d) => d != null);

    // const docs = locations.map(async element => {
    //     const info = await getCollectionInfo(element.id);
    //     return info
    // });

    // const out = await Promise.all(docs);

    // return out.flat()

    return docs.filter(element => element != null) as SnapshotInfo[];
    
}
import { addDoc, doc, setDoc, collection } from "@firebase/firestore"
import { firestore, storage } from "../firebase"
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const createDoc = async (data) => {
    const docRef = await addDoc(collection(firestore, "preWeddingData"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
}
 
async function uploadImageAsPromise(file, path) {
    return new Promise(function (resolve, reject) {

    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percentage);
        },

        function error(err) {
          reject(err);
        },

        async function complete() {

          getDownloadURL(storageRef)
            .then((url) => {
              resolve(url)
              // Insert url into an <img> tag to "download"
            })
            .catch((error) => {
              console.log('error.code')
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.codeerror.code) {
                case 'storage/object-not-found':
                  // File doesn't exist
                  break;
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
                // ...
                case 'storage/unknown':
                  // Unknown error occurred, inspect the server response
                  break;
              }
            });
        }
      );
    });
  }
  
  


export const useFirebase = (docId) => {

  const docRef = doc(firestore, "preWeddingData", docId) 
  const [snapshot, loadingSnapshot] = useDocumentOnce(docRef);

  

const handleMultipleUpload = (files, position) => {
    const promises = [];
    for(const file of files){//Instead of e.target.files, you could also have your files variable
        promises.push(uploadImageAsPromise(file, position))
    }

    //The Promise.all() will stop the execution, until all of the promises are resolved.
    Promise.all(promises).then((fileURLS)=>{
        //Once all the promises are resolved, you will get the urls in a array.
        console.log(fileURLS)
        const data = snapshot?.data();
        const prevData = data[position];
          const update = {
            ...data,
            [position]: [...fileURLS, ...prevData],
          };
          updateDoc(update);
    })
}

const handleImageUpload = (file, position) => {
    if (!file) return;
    
    uploadImageAsPromise(file, position).then((imgUrl) => {
        const data = snapshot?.data();
          const update = {
            ...data,
            [position]: imgUrl,
          };
          updateDoc(update);
    }).catch(err=>console.log(err))
  }


const updateDoc = (data) => {
    setDoc(docRef, data, {merge: true})
      .then(docRef => {
          console.log("Entire Document has been updated successfully");
      })
      .catch(error => {
          console.log(error.message);
      });
}
 
return [snapshot, loadingSnapshot, updateDoc, handleImageUpload, handleMultipleUpload]

}



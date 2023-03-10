import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import "./RequestList.scss";

export const RequestList = () => {
  const [requestedData, setRequestedData] = useState([]);
  const [requestUserId, setRequestUserId] = useState("");
  const [approvedUser, setApprovedUser] = useState("");
  const id = auth.currentUser.uid; //現在ログインしているユーザーのID

  //　ユーザーIDと、投稿者(現在ログインしているユーザー)のIDが等しいものだけ取得する。
  const request = query(
    collection(db, "joinRequest"),
    where("hostUid", "==", `${id}`)
  );

  // リクエストの取得
  useEffect(() => {
    // getDocs(request).then((querySnapshot) => {
    //   setRequestedData(querySnapshot.docs.map((doc) => doc.data()));
    // });
    onSnapshot(request,(querySnapshot) =>{
      setRequestedData(querySnapshot.docs.map((doc) => doc.data())); 
    })
  }, []);

  //　リクエストの投稿と、承認後のデータ削除
  const onApproveJoin = async (name, image, postId, requestingId, docId) => {
    addDoc(collection(db, "approvedUsers"), {
      name: name,
      image: image,
      postId: postId,
      requestingId: requestingId,
    })
      .then(() => deleteDoc(doc(db, "joinRequest", docId)))
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // リクエストの拒否
  const onDeleteRequest = (docId) => {
    deleteDoc(doc(db, "joinRequest", docId)).then(() =>
      alert("削除しました！")
    );
  };

  return (
    <div className="notification-page">
      {requestedData?.map(
        ({ title, name, postId, image, requestingId, docId }) => {
          return (
            <div key={requestingId}>
              <p>
                『{title}』に{name}さんから
              </p>
              <p>参加リクエストが届きました！</p>
              <button
                onClick={() =>
                  onApproveJoin(name, image, postId, requestingId, docId)
                }
              >
                承認する
              </button>
              <button onClick={() => onDeleteRequest(docId)}>×</button>
            </div>
          );
        }
      )}
    </div>
  );
};

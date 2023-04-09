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
  const [isRendered, setIsRendered] = useState(false);
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
    onSnapshot(request, (querySnapshot) => {
      setRequestedData(querySnapshot.docs.map((doc) => doc.data()));
    });
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

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return isRendered ? (
    <div className="notification-page">
      {requestedData.length != 0 ? (
        <>
          {" "}
          {requestedData?.map(
            ({ title, name, postId, image, requestingId, docId }) => {
              return (
                <div key={requestingId} className="request__list">
                  <p>
                    <span className="request__title">『{title}』</span>に
                    <span className="request__username">{name}</span>
                    
                  </p>
                  <p>さんから参加リクエストが届きました！</p>
                  <div className="button">
                    <button
                      className="reject-button"
                      onClick={() => onDeleteRequest(docId)}
                    >
                      ×
                    </button>

                    <button
                      className="approved-button"
                      onClick={() =>
                        onApproveJoin(name, image, postId, requestingId, docId)
                      }
                    >
                      承認する
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </>
      ) : (
        <>
          <p className="notification-no-exist">通知がまだありません</p>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

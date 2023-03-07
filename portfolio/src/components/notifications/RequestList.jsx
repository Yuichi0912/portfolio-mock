import { addDoc, collection, doc, documentId, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import "./RequestList.scss"

export const RequestList = () => {
  const [requestedData, setRequestedData] = useState([]);
  const [requestUserId,setRequestUserId] = useState("")
  const [approvedUser, setApprovedUser] = useState("")
  const id = auth.currentUser.uid; //現在ログインしているユーザーのID

  //　ユーザーIDと、投稿者(現在ログインしているユーザー)のIDが等しいものだけ取得する。
  const request = query(
    collection(db, "joinRequest"),
    where("hostUid", "==", `${id}`)
  );

  // リクエストの取得
  useEffect(() => {
    getDocs(request).then((querySnapshot) => {
      setRequestedData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // 参加リクエスト承認可否用のユーザーデータ取得
useEffect(()=>{

})
console.log(requestUserId);

  const onApproveJoin =(docId)=>{
    console.log(docId);
    setRequestUserId(docId)
    setDoc(doc(db,"approvedUsers",docId),{ 
        approvedUid:"",
        image:"",
    })
    // リクエスト者のユーザーID、imageを送り返す。whereでIDを指定する?

    // const result = query(collection(db,"joinRequest"),where("documentId","==",docId))
    // getDoc(result).then((querySnapshot)=>{
    //     console.log(querySnapshot);
    // })
  }


  return (
    <div className="notification-page">
      {requestedData?.map(({ id, title, name,docId }) => {
        return (
          <div key={id}>
            <p>
              『{title}』に{name}さんから
            </p>
            <p>参加リクエストが届きました！</p>
            <button onClick={onApproveJoin(docId)}>承認する</button>
      <button >×</button>
          </div>
        );
      })}
    </div>
  );
};

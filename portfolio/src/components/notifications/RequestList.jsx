import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db,auth } from "../../firebase";

export const RequestList = () => {
    const [requestedData,setRequestedData] = useState();
  const id = auth.currentUser.uid; //現在ログインしているユーザーのID

  //　ユーザーIDと、投稿者のIDが等しいものだけ取得する。
  const q = query(
    collection(db, "joinRequest"),
    where("hostUid", "==", `${id}`)
  ); 

  useEffect(()=>{
    getDocs(q).then((querySnapshot)=>{
        setRequestedData(querySnapshot.docs.map((doc) => doc.data()))
    })
  },[])

console.log(requestedData);

  return <div></div>;
};

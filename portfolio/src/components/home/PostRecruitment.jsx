import { useState } from "react";
import {collection, addDoc} from "firebase/firestore"
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const PostRecruitment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  // const newDoc = collection.doc().id
const handleSubmit=(e)=>{
  e.preventDefault();
  addDoc(collection(db,"recruitments"),{
    title:title,
    number:number,
    image:"",
    description:description,
    date:new Date(date),
    // id:newDoc,
  })
  navigate("/home")
}

  return (
    <div className="">
      <h2>投稿画面</h2>
      <form onSubmit={handleSubmit}>
        <h3>投稿</h3>
        <p>タイトル</p>
        <input
          type="text"
          placeholder="タイトルを入力してください"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>場所</p>
        <p>日時</p>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <p>募集人数</p>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <p>タグの選択</p>
        <p>説明文</p>
        <input
          type="text"
          placeholder="説明文を入力してください"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>投稿する</button>
      </form>
    </div>
  );
};

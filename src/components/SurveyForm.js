import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SurveyForm.css"; // ← ★CSSを読み込み！

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    gender: "",
    brandImage: "",
    howKnow: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert("メールアドレスは必須です");
      return;
    }

    try {
      await addDoc(collection(db, "usersResponses"), {
        ...formData,
        timestamp: Timestamp.now()
      });
      navigate("/result");
    } catch (error) {
      console.error("Firestore保存エラー: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>アンケートにご協力ください</h2>

      <label>
        メールアドレス（必須）：
        <input type="email" name="email" onChange={handleChange} required />
      </label>

      <label>
        年齢：
        <select name="age" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="20代">20代</option>
          <option value="30代">30代</option>
          <option value="40代">40代</option>
        </select>
      </label>

      <label>
        性別：
        <select name="gender" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="女性">女性</option>
          <option value="男性">男性</option>
          <option value="その他">その他</option>
        </select>
      </label>

      <label>
        エネリッシュのブランドイメージ：
        <input type="text" name="brandImage" onChange={handleChange} />
      </label>

      <label>
        商品をどこで知ったか：
        <select name="howKnow" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="Instagram">Instagram</option>
          <option value="テレビ">テレビ</option>
          <option value="知人から">知人から</option>
        </select>
      </label>

      <button type="submit">送信して抽選へ進む</button>
    </form>
  );
};

export default SurveyForm;

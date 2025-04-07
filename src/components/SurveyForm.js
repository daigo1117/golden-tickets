import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc
} from "firebase/firestore";
import "./SurveyForm.css";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    gender: "",
    brandImage: "",
    howKnow: ""
  });

  const [isCodeValid, setIsCodeValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  useEffect(() => {
    const checkCodeValidity = async () => {
      if (!code) {
        alert("QRコードが無効です");
        return;
      }

      try {
        const codeRef = doc(db, "codes", code);
        const codeSnap = await getDoc(codeRef);

        if (!codeSnap.exists()) {
          alert("このQRコードは存在しません");
          window.location.href = "/";
          return;
        }

        if (codeSnap.data().used) {
          alert("このQRコードはすでに使用されています");
          window.location.href = "/";
          return;
        }

        setIsCodeValid(true);
        console.log("✅ このコードは有効です！");
      } catch (error) {
        console.error("コード確認中にエラーが発生しました", error);
        alert("エラーが発生しました。もう一度お試しください。");
      }
    };

    checkCodeValidity();
  }, [code]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCodeValid) {
      alert("無効なQRコードです。抽選はできません。");
      return;
    }

    if (!formData.email) {
      alert("メールアドレスは必須です");
      return;
    }

    try {
      await addDoc(collection(db, "usersResponses"), {
        ...formData,
        timestamp: Timestamp.now(),
        code: code
      });

      navigate("/result?code=" + code);
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

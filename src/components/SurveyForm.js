import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "./SurveyForm.css";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    age: "",
    gender: "",
    brandImage: [],
    howKnow: "",
    eventName: "",
    otherHowKnow: "",
  });

  const [isSerialValid, setIsSerialValid] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serial = searchParams.get("serial");

  useEffect(() => {
    const checkSerialValidity = async () => {
      if (!serial) {
        alert("QRコードが無効です");
        return;
      }

      try {
        const serialRef = doc(db, "serials", serial);
        const serialSnap = await getDoc(serialRef);

        if (!serialSnap.exists()) {
          alert("このQRコードは存在しません");
          window.location.href = "/";
          return;
        }

        if (serialSnap.data().used) {
          alert("このQRコードはすでに使用されています");
          window.location.href = "/";
          return;
        }

        setIsSerialValid(true);
        console.log("✅ このシリアルは有効です！");
      } catch (error) {
        console.error("シリアル確認中にエラーが発生しました", error);
        alert("エラーが発生しました。もう一度お試しください。");
      }
    };

    checkSerialValidity();
  }, [serial]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBrandImageChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFormData((prev) => {
      const current = prev.brandImage || [];
      if (checked) {
        if (current.length >= 2) return prev;
        return { ...prev, brandImage: [...current, value] };
      } else {
        return {
          ...prev,
          brandImage: current.filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSerialValid) {
      alert("無効なQRコードです。抽選はできません。");
      return;
    }

    if (!formData.email) {
      alert("メールアドレスは必須です");
      return;
    }

    const finalData = {
      ...formData,
      howKnow:
        formData.howKnow === "イベント"
          ? `イベント: ${formData.eventName}`
          : formData.howKnow === "その他"
          ? `その他: ${formData.otherHowKnow}`
          : formData.howKnow,
      timestamp: Timestamp.now(),
      serial: serial,
    };

    try {
      await addDoc(collection(db, "usersResponses"), finalData);
      await updateDoc(doc(db, "serials", serial), { used: true });
      navigate("/result?serial=" + serial);
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
          <option value="10代">10代</option>
          <option value="20代">20代</option>
          <option value="30代">30代</option>
          <option value="40代">40代</option>
          <option value="50代">50代</option>
          <option value="60代以上">60代以上</option>
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

      <label className="checkbox-group">
        『ENERICHE』のブランドイメージとマッチする単語を選んでください。（2個以内）
        {["エネルギッシュ", "集中力", "リラックス", "刺激", "興奮", "制御不能", "自信", "挑戦", "応援", "リフレッシュ"].map((label, idx) => (
          <span key={idx} className="checkbox-item">
            <input
              type="checkbox"
              name="brandImage"
              value={label}
              onChange={handleBrandImageChange}
              checked={formData.brandImage.includes(label)}
            />
            {label}
          </span>
        ))}
      </label>

      <label>
        商品をどこで知ったか：
        <select name="howKnow" onChange={handleChange}>
          <option value="">選択してください</option>
          <option value="X">X</option>
          <option value="Amazonの検索結果">Amazonの検索結果</option>
          <option value="知人から">知人から</option>
          <option value="イベント">イベント（イベント名記入）</option>
          <option value="その他">その他（自由記述）</option>
        </select>
      </label>

      {formData.howKnow === "イベント" && (
        <label>
          イベント名：
          <input type="text" name="eventName" onChange={handleChange} />
        </label>
      )}

      {formData.howKnow === "その他" && (
        <label>
          その他（自由記述）：
          <input type="text" name="otherHowKnow" onChange={handleChange} />
        </label>
      )}

      <button type="submit">送信して抽選へ進む</button>
    </form>
  );
};

export default SurveyForm;

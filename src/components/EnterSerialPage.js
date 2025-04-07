// src/components/EnterSerialPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const EnterSerialPage = () => {
  const [serial, setSerial] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = serial.trim();

    if (!trimmed) {
      setError("シリアルナンバーを入力してください");
      return;
    }

    try {
      const serialRef = doc(db, "serials", trimmed);
      const serialSnap = await getDoc(serialRef);

      if (!serialSnap.exists()) {
        setError("このシリアルナンバーは存在しません");
        return;
      }

      if (serialSnap.data().used) {
        setError("このシリアルナンバーはすでに使用されています");
        return;
      }

      // OKならアンケートページへ遷移
      navigate(`/form?serial=${trimmed}`);
    } catch (err) {
      console.error("エラー:", err);
      setError("エラーが発生しました。もう一度お試しください。");
    }
  };

  return (
    <div className="form-container">
      <h2>シリアルナンバーを入力してください</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="例：1234"
        />
        <button type="submit">次へ進む</button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default EnterSerialPage;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const [result, setResult] = useState(null); // null: 抽選中, "win", "lose", "error"
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serial = searchParams.get("serial");

  console.log("🎫 渡ってきた serial:", serial);

  // シリアルを使用済みにする処理
  useEffect(() => {
    const markSerialAsUsed = async () => {
      if (!serial) return;

      try {
        const serialRef = doc(db, "serials", serial);
        await updateDoc(serialRef, { used: true });
        console.log("✅ シリアルナンバーを使用済みにしました");
      } catch (err) {
        console.error("❌ シリアルの更新に失敗しました", err);
      }
    };

    markSerialAsUsed();
  }, [serial]);

  // 抽選処理
  useEffect(() => {
    const drawLottery = async () => {
      await new Promise((r) => setTimeout(r, 6000)); // 6秒待機

      try {
        const serialRef = doc(db, "serials", serial);
        const serialSnap = await getDoc(serialRef);

        if (!serialSnap.exists()) {
          setResult("error");
          return;
        }

        const data = serialSnap.data();
        const isWinner = data.isWinner === true;

        setResult(isWinner ? "win" : "lose");
      } catch (err) {
        console.error("抽選エラー:", err);
        setResult("error");
      }
    };

    drawLottery();
  }, [serial]);

  return (
    <div className="result-container">
      <AnimatePresence>
        {result === null && (
          <motion.div
            key="loading"
            className="video-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.0 }}
          >
            <video
              src="/loading-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "12px",
                transition: "opacity 0.0s ease-out",
              }}
            />
          </motion.div>
        )}

        {result === "win" && (
          <motion.div
            key="win"
            className="result-card win"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="emoji">🎉🎊</div>
            <h1>おめでとうございます！</h1>
            <p>あなたは当選しました！</p>
            <p className="coupon">
              🎁 クーポンコード：<strong>PEACH2025</strong>
            </p>
            <button
              onClick={() => window.location.href = "https://eneriche.jp"}
              className="back-button"
            >
              トップに戻る
            </button>
          </motion.div>
        )}

        {result === "lose" && (
          <motion.div
            key="lose"
            className="result-card lose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="emoji">😢</div>
            <h1>残念…ハズレです</h1>
            <p>またのご参加をお待ちしています！</p>
            <button
              onClick={() => window.location.href = "https://eneriche.jp"}
              className="back-button"
            >
              トップに戻る
            </button>
          </motion.div>
        )}

        {result === "error" && (
          <motion.div
            key="error"
            className="result-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="emoji">⚠️</div>
            <h1>エラーが発生しました</h1>
            <p>もう一度お試しください。</p>
            <button
              onClick={() => window.location.href = "https://eneriche.jp"}
              className="back-button"
            >
              トップに戻る
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPage;

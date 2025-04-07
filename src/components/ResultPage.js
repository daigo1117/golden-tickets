import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const [result, setResult] = useState(null); // null: 抽選中, "win", "lose"
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serial = searchParams.get("serial"); // ← 修正されたパラメータ名

  // 🎯 使用済みにする処理（抽選後に実行）
  useEffect(() => {
    const markSerialAsUsed = async () => {
      if (!serial) return;

      try {
        const serialRef = doc(db, "serials", serial);
        await updateDoc(serialRef, {
          used: true
        });
        console.log("✅ シリアルナンバーを使用済みにしました");
      } catch (err) {
        console.error("❌ シリアルの更新に失敗しました", err);
      }
    };

    markSerialAsUsed();
  }, [serial]);

  // 🎲 抽選処理
  useEffect(() => {
    const drawLottery = async () => {
      await new Promise((r) => setTimeout(r, 5000)); // 5秒待機

      try {
        const statsRef = doc(db, "lotteryStats", "counter");
        const statsSnap = await getDoc(statsRef);
        const currentWins = statsSnap.data().winCount || 0;

        const isWinner = ["1007", "2222", "3333", "4444", "5555"].includes(serial);

        if (isWinner && currentWins < 5) {
          await updateDoc(statsRef, {
            winCount: increment(1),
          });
          setResult("win");
        } else {
          setResult("lose");
        }
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
    transition={{ duration: 0.0 }} // ← ここでゆっくり消える時間指定
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
        transition: "opacity 0.0s ease-out" // ← CSS側でも保険かけておく
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
          </motion.div>
        )}

        {result === "error" && (
          <p>エラーが発生しました。もう一度お試しください。</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultPage;

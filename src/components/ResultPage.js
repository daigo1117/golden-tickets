import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const [result, setResult] = useState(null); // null:抽選中, "win", "lose"
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  // 🎯 使用済みにする処理（抽選後に実行）
  useEffect(() => {
    const markCodeAsUsed = async () => {
      if (!code) return;

      try {
        const codeRef = doc(db, "codes", code);
        await updateDoc(codeRef, {
          used: true
        });
        console.log("✅ QRコードを使用済みにしました");
      } catch (err) {
        console.error("❌ QRコードの更新に失敗しました", err);
      }
    };

    markCodeAsUsed();
  }, [code]);

  // 🎲 抽選処理
  useEffect(() => {
    const drawLottery = async () => {
      await new Promise((r) => setTimeout(r, 2000)); // 2秒待機（演出）

      try {
        const statsRef = doc(db, "lotteryStats", "counter");
        const statsSnap = await getDoc(statsRef);
        const currentWins = statsSnap.data().winCount || 0;

        const isDrawn = Math.random() < 0.99; // テスト用に当選確率75%
        // const isDrawn = Math.random() < (5 / 3000); // 本番は5/3000の確率

        if (isDrawn && currentWins < 5) {
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
  }, []);

  return (
    <div className="result-container">
      <AnimatePresence>
      {result === null && (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.1 }} // 👈 消えるとき0.1秒で即座に消える
    className="spinner"
  >
    🎯
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
            <p className="coupon">🎁 クーポンコード：<strong>PEACH2025</strong></p>
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

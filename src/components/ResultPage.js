import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import "./ResultPage.css";

const ResultPage = () => {
  const [result, setResult] = useState(null); // null:抽選中, "win", "lose"

  useEffect(() => {
    const drawLottery = async () => {
      await new Promise((r) => setTimeout(r, 2000)); // ← 演出用に2秒待つ！

      try {
        const statsRef = doc(db, "lotteryStats", "counter");
        const statsSnap = await getDoc(statsRef);
        const currentWins = statsSnap.data().winCount || 0;

        const isDrawn = Math.random() < 0.5; // ← 50%の確率で当たり
        //const isDrawn = Math.random() < (5 / 3000); // ← 本番用


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
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
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

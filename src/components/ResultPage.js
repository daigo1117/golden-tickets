import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const ResultPage = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const drawLottery = async () => {
      try {
        const statsRef = doc(db, "lotteryStats", "counter");
        const statsSnap = await getDoc(statsRef);
        const currentWins = statsSnap.data().winCount || 0;

        // 毎回一定確率（5 / 3000）で抽選
        const isDrawn = Math.random() < (5 / 3000);

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

  if (result === null) return <p style={{ textAlign: "center", marginTop: "100px" }}>抽選中です...</p>;

  if (result === "error") return <p style={{ textAlign: "center", marginTop: "100px" }}>エラーが発生しました。</p>;

  if (result === "win") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>🎉 おめでとうございます！</h2>
        <p>あなたは当選しました！</p>
        <p>🎁 クーポンコード：<strong>PEACH2025</strong></p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>😢 残念...ハズレです。</h2>
      <p>またのご参加をお待ちしています！</p>
    </div>
  );
};

export default ResultPage;

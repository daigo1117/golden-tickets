import React from "react";
import "./ResultPage.css"; // CSSは別ファイルで定義

const ResultPage = ({ isWinner }) => {
  return (
    <div className="result-container">
      <div className="result-card">
        {isWinner ? (
          <>
            <div className="emoji">🎉</div>
            <h1>おめでとうございます！</h1>
            <p>あなたは当選者の1人に選ばれました！</p>
          </>
        ) : (
          <>
            <div className="emoji">😢</div>
            <h1>残念…ハズレです。</h1>
            <p>またのご参加をお待ちしています！</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;

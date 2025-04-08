// src/components/EntryOverviewPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./EntryOverviewPage.css";

const EntryOverviewPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/serial");
  };

  return (
    <div className="entry-container">
      <div className="entry-inner">
        <h1>ENERICHE ピーチ発売記念<br />＼プレゼントキャンペーン／</h1>

        <img src="/peach_can.png" alt="ENERICHEピーチ缶" />
        <p>抽選で5名様に<br /><strong>豪華景品プレゼント！</strong></p>

        <button className="draw-button" onClick={handleClick}>
          今すぐ抽選！ ▶
        </button>

        <div className="highlight">数量限定！</div>
        <p>先着2,700ケース<br />なくなり次第終了</p>

        <div className="highlight">豪華景品！</div>
        <div className="product-grid">
          <div className="product-item">
            <img src="/can.png" alt="can.png" />
            <p>ENERICHE 一年分<br />(12ケース)</p>
          </div>
          <div className="product-item">
            <img src="/tumbler.png" alt="tumbler.png" />
            <p>〇〇×ENERICHE<br />コラボタンブラー</p>
          </div>
        </div>

        <div className="highlight">応募方法</div>
        <div className="steps">
          <p>シールに記載しているシリアルナンバーを入力</p>
          <div className="arrow">↓</div>
          <p>アンケートに回答</p>
          <div className="arrow">↓</div>
          <p>その場で結果が分かる！</p>
          <button className="draw-button" onClick={handleClick}>
            今すぐ抽選！ ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryOverviewPage;

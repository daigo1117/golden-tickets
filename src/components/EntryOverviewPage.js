// src/components/EntryOverviewPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./EntryOverviewPage.css";

const EntryOverviewPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/serial");
  };

  return (
    <div className="entry-container">
      <section className="campaign-section">
        <h1>ENERICHE ピーチ発売記念<br />＼プレゼントキャンペーン／</h1>
        <img
          src="/peach-can.png"
          alt="ENERICHEピーチ缶"
          className="campaign-can"
        />
        <p className="present-text">抽選で5名様に<br />豪華景品プレゼント！</p>
        <button className="entry-button" onClick={handleStart}>
          今すぐ抽選！ ▶
        </button>
      </section>

      <section className="limited-section">
        <h2 className="black-title">数量限定！</h2>
        <p className="limited-text">先着2,700ケース<br />なくなり次第終了</p>
      </section>

      <section className="prizes-section">
        <h2 className="black-title">豪華景品！</h2>
        <div className="prize-items">
          <div className="prize">
            <img src="/prize1.png" alt="ENERICHE一年分" />
            <p>ENERICHE一年分<br />(12ケース)</p>
          </div>
          <div className="prize">
            <img src="/prize2.png" alt="コラボタンブラー" />
            <p>〇〇×ENERICHE<br />コラボタンブラー</p>
          </div>
        </div>
      </section>

      <section className="howto-section">
        <h2 className="black-title">応募方法</h2>
        <p>シールに記載しているシリアルナンバーを入力</p>
        <p>↓</p>
        <p>アンケートに回答</p>
        <p>↓</p>
        <p>その場で結果が分かる！</p>
        <button className="entry-button" onClick={handleStart}>
          今すぐ抽選！ ▶
        </button>
      </section>
    </div>
  );
};

export default EntryOverviewPage;

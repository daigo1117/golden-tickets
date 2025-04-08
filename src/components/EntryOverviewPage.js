// src/components/EntryOverviewPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./EntryOverviewPage.css";

const EntryOverviewPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/serial");
  };

  return (
    <div className="entry-container">
      <div className="entry-card">
        <h1>ENERICHEが当たる抽選に参加しよう！</h1>
        <p className="entry-subtext">
          シリアルナンバーを使って、豪華景品が当たるチャンス！
        </p>

        <div className="entry-images">
          <img src="/can.png" alt="ENERICHE缶" />
          <img src="/tumbler.png" alt="タンブラー" />
        </div>

        <h2>参加方法はとってもカンタン！</h2>
        <ol className="entry-steps">
          <li>ENERICHE缶についているシリアルナンバーをチェック</li>
          <li>簡単なアンケートに答える</li>
          <li>その場ですぐに抽選結果がわかる！</li>
        </ol>

        <div className="entry-note">
          ※景品が無くなり次第終了となります。<br />
          ※シリアルナンバー1つにつき、1回のみご参加いただけます。
        </div>

        <button className="start-button" onClick={handleNext}>
          抽選に進む
        </button>
      </div>
    </div>
  );
};

export default EntryOverviewPage;

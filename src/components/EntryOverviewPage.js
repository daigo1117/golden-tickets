import React from "react";
import { useNavigate } from "react-router-dom";
import "./EntryOverviewPage.css";

const EntryOverviewPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/serial");
  };

  return (
    <div className="overview-container">
      <h1 className="campaign-title">ENERICHE ピーチ発売記念<br />＼プレゼントキャンペーン／</h1>

      <div className="main-visual">
        <img src="/can.png" alt="ENERICHE缶" className="can-image" />
        <p className="headline">抽選で5名様に<br />豪華景品プレゼント！</p>
        <button className="lottery-button" onClick={handleClick}>
          今すぐ抽選！▶
        </button>
      </div>

      <div className="limited-info">
        <div className="label">数量限定！</div>
        <p>先着2,700ケース<br />なくなり次第終了</p>
      </div>

      <div className="prize-section">
        <div className="label">豪華景品！</div>
        <div className="prizes">
          <div className="prize">
            <img src="/can.png" alt="ENERICHE一年分" />
            <p>ENERICHE一年分<br />（12ケース）</p>
          </div>
          <div className="prize">
            <img src="/tumbler.png" alt="タンブラー" />
            <p>〇〇×ENERICHE<br />コラボタンブラー</p>
          </div>
        </div>
      </div>

      <div className="how-to">
        <div className="label">応募方法</div>
        <p>シールに記載しているシリアルナンバーを入力</p>
        <p>↓</p>
        <p>アンケートに回答</p>
        <p>↓</p>
        <p>その場で結果が分かる！</p>
        <button className="lottery-button" onClick={handleClick}>
          今すぐ抽選！▶
        </button>
      </div>
    </div>
  );
};

export default EntryOverviewPage;

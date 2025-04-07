const admin = require("firebase-admin");
const fs = require("fs");

// サービスアカウントキーの読み込み
const serviceAccount = require("./serviceAccountKey.json");

// Firebase初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// シリアル生成関数（例：0001～3000の数字コード）
function generateSerials(count) {
  const serials = new Set();
  while (serials.size < count) {
    const num = String(Math.floor(Math.random() * 9000) + 1000); // 4桁の番号
    serials.add(num);
  }
  return [...serials];
}

async function seed() {
  const serials = generateSerials(3000);

  const batch = db.batch();
  serials.forEach((serial) => {
    const docRef = db.collection("serials").doc(serial);
    batch.set(docRef, { used: false });
  });

  await batch.commit();
  console.log(`✅ ${serials.length} 件のシリアルを Firestore に登録しました！`);
}

seed();

// seedFirestore.js

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Firebaseの管理者用秘密鍵

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedNumbers() {
  const batch = db.batch();
  const total = 3000;

  for (let i = 1; i <= total; i++) {
    const id = i.toString().padStart(4, '0'); // "0001"〜"3000"
    const ref = db.collection("numbers").doc(id);
    batch.set(ref, { assigned: false });
  }

  await batch.commit();
  console.log(`✅ ${total} 件の番号を Firestore に登録しました！`);
}

seedNumbers();

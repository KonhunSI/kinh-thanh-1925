// Gói Firebase cho Kinh Thánh 1925: đăng nhập (email/mật khẩu, Google) và lưu dữ liệu người dùng.
// Tạo lại src/static/fb.js bằng: bash scripts/build-fb.sh
import { initializeApp } from "firebase/app";
import {
  initializeAuth, indexedDBLocalPersistence, browserLocalPersistence, browserPopupRedirectResolver,
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup, reauthenticateWithPopup, reauthenticateWithCredential, EmailAuthProvider,
  signOut, deleteUser,
} from "firebase/auth";
import { getFirestore, doc, runTransaction, deleteDoc } from "firebase/firestore/lite";

const app = initializeApp({
  apiKey: "AIzaSyCHwPKtH6tO924Wq1-5TobpzHqqmFGAn80",
  authDomain: "kinhthanh1925.firebaseapp.com",
  projectId: "kinhthanh1925",
  storageBucket: "kinhthanh1925.firebasestorage.app",
  messagingSenderId: "556850553547",
  appId: "1:556850553547:web:36d36757ccc209f388714e",
});
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
  popupRedirectResolver: browserPopupRedirectResolver,
});
auth.languageCode = "vi";
const db = getFirestore(app);
const google = () => { const p = new GoogleAuthProvider(); p.setCustomParameters({ prompt: "select_account" }); return p; };
const userRef = (uid) => doc(db, "users", uid);

export const onUser = (cb) => onAuthStateChanged(auth, cb);
export const current = () => auth.currentUser;
export const signUp = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
export const signIn = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
export const signInGoogle = () => signInWithPopup(auth, google());
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
export const logOut = () => signOut(auth);
export const providers = () => (auth.currentUser ? auth.currentUser.providerData.map((p) => p.providerId) : []);

// Đọc tài liệu của người dùng, gộp bằng hàm merge(remote) → { data, write }, rồi ghi lại trong cùng một giao dịch.
export async function sync(merge) {
  const u = auth.currentUser; if (!u) throw new Error("signed-out");
  const ref = userRef(u.uid);
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const res = merge(snap.exists() ? snap.data() : null);
    if (res.write) tx.set(ref, res.write);
    return res;
  });
}

// Xóa tài khoản: xác thực lại (Google hoặc mật khẩu), xóa dữ liệu rồi xóa người dùng.
export async function deleteAccount(pass) {
  const u = auth.currentUser; if (!u) throw new Error("signed-out");
  if (pass) await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, pass));
  else await reauthenticateWithPopup(u, google());
  await deleteDoc(userRef(u.uid));
  await deleteUser(u);
}

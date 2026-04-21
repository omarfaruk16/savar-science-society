import * as admin from "firebase-admin";

const adminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const canInitialize = adminConfig.projectId && adminConfig.clientEmail && adminConfig.privateKey;

if (canInitialize && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig as any),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
} else if (!canInitialize) {
  const missing = [];
  if (!adminConfig.projectId) missing.push("FIREBASE_PROJECT_ID");
  if (!adminConfig.clientEmail) missing.push("FIREBASE_CLIENT_EMAIL");
  if (!adminConfig.privateKey) missing.push("FIREBASE_PRIVATE_KEY");
  console.warn(`Firebase Admin could not initialize. Missing: ${missing.join(", ")}`);
}

export const adminAuth = canInitialize ? admin.auth() : null;
export const adminDb = canInitialize ? admin.firestore() : null;
export { canInitialize };

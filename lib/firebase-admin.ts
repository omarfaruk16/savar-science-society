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
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
}

export const adminAuth = canInitialize ? admin.auth() : null;
export const adminDb = canInitialize ? admin.firestore() : null;
export { canInitialize };

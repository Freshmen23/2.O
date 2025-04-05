const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin with your service account
const serviceAccount = require("./serviceAccountKey.json"); // Update the path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * Converts faculty reviews from a text file to JSON.
 * Assumes the text file contains structured reviews separated by new lines.
 * @param {string} filePath - Path to the faculty reviews text file.
 * @returns {Array} - Array of faculty review objects.
 */
function parseFacultyReviews(filePath) {
  const fileData = fs.readFileSync(filePath, "utf8");
  const lines = fileData.split("\n").map(line => line.trim()).filter(line => line);

  const reviews = [];
  let currentReview = {};

  lines.forEach(line => {
    if (line.includes(":")) {
      const [key, value] = line.split(":").map(str => str.trim());
      currentReview[key.toLowerCase().replace(/\s+/g, "_")] = value;
    } else if (line === "---") { // Separator for multiple reviews
      if (Object.keys(currentReview).length > 0) {
        reviews.push(currentReview);
        currentReview = {};
      }
    }
  });

  if (Object.keys(currentReview).length > 0) {
    reviews.push(currentReview);
  }

  return reviews;
}

/**
 * Uploads faculty reviews to Firestore.
 * @param {string} collectionName - The Firestore collection name.
 * @param {string} filePath - Path to the faculty reviews text file.
 */
async function uploadFacultyReviews(collectionName, filePath) {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    const reviews = parseFacultyReviews(fullPath);

    for (const review of reviews) {
      const docId = review.faculty_name ? review.faculty_name.replace(/\s+/g, "_").toLowerCase() : `review_${Date.now()}`;
      await db.collection(collectionName).doc(docId).set(review);
      console.log(`Uploaded review for "${review.faculty_name}" to collection "${collectionName}"`);
    }

    console.log("All faculty reviews uploaded successfully.");
  } catch (error) {
    console.error(`Error uploading collection ${collectionName}:`, error);
  }
}

async function main() {
  await uploadFacultyReviews("faculty_reviews", "faculty_reviews.txt");
  process.exit(0);
}

main();

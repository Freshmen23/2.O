import { db } from '../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const getFaculties = async () => {
  const querySnapshot = await getDocs(collection(db, 'faculties'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const addFaculty = async (name) => {
  const docRef = await addDoc(collection(db, 'faculties'), {
    name: "Faculty Name",
    reviewCount: 0,       // Number of reviews
    overall: 0,           // Average rating
    lastUpdated: null,     // Timestamp
    Teaching: '0',
    Evaluation: '0',
    Behaviour: '0',
    Internals: '0',
    Average: 'Not Rated',
    Overall: 'Not Rated'
  });
  return docRef.id;
};
import {
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  storage,
  ref,
  getDownloadURL,
} from "~/firebase";

export const getFlavors = async () => {
  const snap = await getDocs(collection(db, "flavors"));
  const data: any[] = [];
  snap.forEach((doc: any) => {
    data.push({ id: doc.id, data: doc.data() });
  });
  return data;
};

export const getFlavor = async (flavor: string | undefined) => {
  if (flavor) {
    const docRef = doc(db, "flavors", flavor);
    const docSanp = await getDoc(docRef);
    const data = docSanp?.data();
    if (data) {
      const ingredientsSnap = await getDocs(
        collection(db, `flavors/${flavor}/ingredients`)
      );
      const ingredients: any[] = [];
      ingredientsSnap.forEach((doc) => ingredients.push(doc.data()));

      return { ...data, ingredients };
    }
    return undefined;
  }
};

export const getImageUrl = async (location: string) => {
  return await getDownloadURL(ref(storage, location));
};

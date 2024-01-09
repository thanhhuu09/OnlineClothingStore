import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    // Get the data from the store
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    // Save the data to the store
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    // Remove the data from the store
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// Nếu window tồn tại thì sử dụng localStorage, nếu không thì sử dụng createNoopStorage
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;

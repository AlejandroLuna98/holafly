export const setItemToLocalStorage = (key: string, data: unknown): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (e) {
    console.error('Error saving data to localStorage', e);
  }
};

export const getItemFromLocalStorage = (key: string) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (e) {
    console.error('Error getting data from localStorage', e);
    return null;
  }
};

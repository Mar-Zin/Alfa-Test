const FAVORITES = "favorites";

export function setFavorites() {
  localStorage.setItem(FAVORITES, JSON.stringify([]));
}
export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES) || "[]");
}

export function removeLocalFavorites(favorites: number[], id: number) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((item: number) => item !== id);
    localStorage.favorites = JSON.stringify(favorites);
  }
}

export function changeLocalFavorites(favorites: number[], id: number) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((item: number) => item !== id);
  } else favorites.push(id);
  localStorage.favorites = JSON.stringify(favorites);
}

const localStorageService = {
  setFavorites,
  getFavorites,
  removeLocalFavorites,
  changeLocalFavorites,
};

export default localStorageService;

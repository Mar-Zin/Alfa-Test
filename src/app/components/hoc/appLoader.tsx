import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import localStorageService from "../../services/localStorage.service";
import { getCardsLoadingStatus, loadCardList } from "../../store/cards";
import { loadFavoritesList } from "../../store/favorites";
import { useAppDispatch } from "../../store/store";

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader: FC<AppLoaderProps> = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const catalogLoadingStatus = useSelector(getCardsLoadingStatus());

  useEffect(() => {
    dispatch(loadCardList());
    if (!localStorageService.getFavorites()) localStorageService.setFavorites();
    dispatch(loadFavoritesList());
  }, [dispatch]);

  if (!catalogLoadingStatus) return children;
  return "loading...";
};
export default AppLoader;

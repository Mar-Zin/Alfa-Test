import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "./components/hoc/appLoader";
import Header from "./components/Header";
import CardList from "./components/CardList";
import { getCards, getError } from "./store/cards";
import FavoriteButton from "./components/FavoriteButton";
import { getFavorites } from "./store/favorites";

const App: FC = () => {
  const [filterActive, setFilterActive] = useState(false);
  const cards = useSelector(getCards());
  const favorites = useSelector(getFavorites());
  const error = useSelector(getError());

  const handleFiltred = () => {
    setFilterActive(!filterActive);
  };

  let filterCards = filterActive
    ? cards.filter((item) => favorites.includes(item.id))
    : cards;

  if (error) toast.error(error);

  return (
    <AppLoader>
      <div className="min-h-screen min-w-550 bg-slate-100 flex flex-col">
        <Header />
        <FavoriteButton
          filter={handleFiltred}
          active={filterActive}
          badgeCount={favorites.length}
        />
        <CardList cards={filterCards} />
        <ToastContainer />
      </div>
    </AppLoader>
  );
};

export default App;

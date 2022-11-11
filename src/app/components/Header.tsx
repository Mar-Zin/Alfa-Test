import { memo } from "react";

const Header = memo(() => {
  return (
    <header className="w-full flex h-24 min-w-550 justify-center items-center bg-slate-300">
      <img
        src="https://static.tildacdn.com/tild6539-3461-4230-b862-363738303561/Alfa_amp_lending-08.svg"
        className="h-16 inline-block "
        alt="alfa-logo"
      />
      <span className="text-slate-800 mx-4 font-bold">Alfa-Test</span>
    </header>
  );
});

export default Header;

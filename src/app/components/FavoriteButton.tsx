import { Fab, Badge } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FC, memo, useMemo } from "react";

interface FavoriteButtonProps {
  filter(): void;
  active: boolean;
  badgeCount: number;
}

const styleForIcon = { mr: 1 };
const styleForBadge = {
  position: "absolute",
  top: 5,
  right: 7,
};

const FavoriteButton: FC<FavoriteButtonProps> = memo(
  ({ filter, active, badgeCount }) => {
    const styleForFab = useMemo(() => {
      return {
        mt: 3,
        mx: "auto",
        bgcolor: active ? "#E868FA" : "white",
        color: active ? "white" : "#E868FA",
        "&:hover": {
          bgcolor: "#E868FA",
          color: "white",
        },
      };
    }, [active]);
    return (
      <Fab variant="extended" sx={styleForFab} onClick={filter}>
        <FavoriteIcon sx={styleForIcon} />
        Favorites
        <Badge
          badgeContent={badgeCount}
          color="warning"
          sx={styleForBadge}
        ></Badge>
      </Fab>
    );
  }
);

export default FavoriteButton;

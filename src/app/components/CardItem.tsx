import { FC, memo, useState } from "react";
import { iCardItem } from "../../models";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import localStorageService from "../services/localStorage.service";
import { useAppDispatch } from "../store/store";
import {
  changeFavorites,
  getFavorites,
  removeFavorite,
} from "../store/favorites";
import { useSelector } from "react-redux";
import { removeCard } from "../store/cards";

interface CardProps {
  card: iCardItem;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardItem: FC<CardProps> = memo(({ card }) => {
  const dispatch = useAppDispatch();
  const favoritesRedux = useSelector(getFavorites());
  const [expanded, setExpanded] = useState(false);
  let favorites = localStorageService.getFavorites();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToFavorites = () => {
    dispatch(changeFavorites(card.id));
    localStorageService.changeLocalFavorites(favorites, card.id);
  };

  const deleteCard = () => {
    dispatch(removeCard(card.id));
    dispatch(removeFavorite(card.id));
    localStorageService.removeLocalFavorites(favorites, card.id);
  };

  return (
    <Grid item xs={6} md={4}>
      <Card
        sx={{
          minWidth: 200,
          maxWidth: 300,
          borderRadius: 3,
          margin: "auto",
          transition: "transform 0.2s linear",
          "&:hover": {
            transform: "scale(1.1,1.1)",
          },
        }}
      >
        <CardHeader
          title={<Typography variant="h6">{card.name.slice(0, 17)}</Typography>}
          action={
            <>
              <IconButton
                aria-label="add to favorites"
                onClick={addToFavorites}
              >
                <FavoriteIcon
                  sx={{
                    "&:hover": {
                      color: "#E868FA",
                    },
                    fontSize: 35,
                  }}
                  htmlColor={
                    favoritesRedux.includes(card.id) ? "#E868FA" : "grey"
                  }
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={deleteCard}>
                <ClearIcon />
              </IconButton>
            </>
          }
        />
        <CardMedia component="img" image={card.image} alt={card.name} />
        <CardActions disableSpacing>
          <Stack spacing={1} direction="row">
            <Chip
              label={card.gender}
              color={card.gender === "Male" ? "primary" : "warning"}
            />
            <Chip
              label={card.species}
              color={card.species === "Human" ? "secondary" : "info"}
            />
            <Chip
              label={card.status}
              color={
                card.status === "Alive"
                  ? "success"
                  : card.status === "unknown"
                  ? "default"
                  : "error"
              }
            />
          </Stack>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Location:</Typography>
            <Stack sx={{ mb: 1 }} direction="row">
              <Chip label={card.location.name} color="secondary" />
            </Stack>
            <Typography paragraph>Origin:</Typography>
            <Stack sx={{ mb: 1 }} direction="row">
              <Chip label={card.origin.name} color="info" />
            </Stack>
            <Button
              variant="contained"
              size="small"
              href={card.url}
              endIcon={<SendIcon />}
              target="_blank"
            >
              All about character
            </Button>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
});

export default CardItem;

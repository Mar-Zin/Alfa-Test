import { FC, memo } from "react";
import { iCardItem } from "../../models";
import { Grid } from "@mui/material";
import CardItem from "./CardItem";
import { Container } from "@mui/material";

interface CardListProps {
  cards: iCardItem[];
}

const CardList: FC<CardListProps> = memo(({ cards }) => {
  if (!cards.length) {
    return (
      <div className="container mx-auto mt-20 flex justify-center items-center">
        <h1 className="text-lg text-slate-500 tracking-wider underline underline-offset-8">
          Здесь появятся персонажи, которых вы добавите в избранное
        </h1>
      </div>
    );
  }

  return (
    <Container sx={{ mt: "2rem", minWidth: 500 }}>
      <Grid container columnSpacing={1} rowSpacing={{ md: 5, xs: 2 }}>
        {cards.map((card: iCardItem) => (
          <CardItem card={card} key={card.id} />
        ))}
      </Grid>
    </Container>
  );
});

export default CardList;

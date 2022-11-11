import httpService from "./http.service";

const cardsEndPoint = "/character";

const cardsService = {
  get: async () => {
    const { data } = await httpService.get(cardsEndPoint);
    return data;
  },
};

export default cardsService;

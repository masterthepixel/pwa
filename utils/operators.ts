const gameUrlObj = {
  jam: "https://app.parallelz.com/?auth=Pk5Jm9qQr4&app=jam",
  btb: "https://app.parallelz.com/?auth=jeuvyiph1&app=btb",
};

export const getGameUrl = (appCode: string) => {
  return gameUrlObj[appCode];
};

export interface GameParams {
  id: string | undefined;
  title: string | undefined;
  bannerUrl: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: GameParams
    }
  }
}
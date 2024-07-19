export type TChartDataType = {
  id: string;
  color?: string;
  data: {
    x: string;
    y: number;
    color?: string;
  }[];
}[];

export type TChartDataDefs = {
  id: string;
  type: string;
  colors: {
    offset: number;
    color: string;
  }[];
}[];

export type TChartDataFill = {
  match: {
    id: string;
  };
  id: string;
}[];

export type TSkillamiPointsFinanceDashboardData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

export type TSkillamiPointsFinanceDashboardDefs = {
  id: string;
  type: string;
  colors: {
    offset: number;
    color: string;
  }[];
}[];

export type TSkillamiPointsFinanceDashboardFill = {
  match: {
    id: string;
  };
  id: string;
}[];

export type TCommissionsFinanceDashboardData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

export type TCommissionsFinanceDashboardDefs = {
  id: string;
  type: string;
  colors: {
    offset: number;
    color: string;
  }[];
}[];

export type TCommissionsFinanceDashboardFill = {
  match: {
    id: string;
  };
  id: string;
}[];

export type TSkillamiPointsFinanceHistoryData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

export type TSkillamiPointsFinanceHistoryDefs = {
  id: string;
  type: string;
  colors: {
    offset: number;
    color: string;
  }[];
}[];

export type TSkillamiPointsFinanceHistoryFill = {
  match: {
    id: string;
  };
  id: string;
}[];

export type TRewardsCalculatorChartDataType = {
  id: string;
  color?: string;
  data: {
    x: string;
    y: number;
  }[];
}[];

export type TRewardsCalculatorChartDataDefs = {
  id: string;
  type: string;
  colors: {
    offset: number;
    color: string;
  }[];
}[];

export type TRewardsCalculatorChartDataFill = {
  match: {
    id: string;
  };
  id: string;
}[];

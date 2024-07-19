export interface TINFLATIONRULES {
  inflation: {
    _id: string;
    adminNote: string;
    name: string; // Added "name" to match the initial state
  };
  rules: {
    dropPercentage: number;
    productionDecreasePercentage: number;
    increaseDLPPercentage: number;
    mintingBoost: number;
  }[];
}

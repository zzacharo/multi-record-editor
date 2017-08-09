export interface Action {
    selectedAction: string;
    mainKey: string;
    value: any;
    updateValue: string;
    matchType: string;
  }

export interface Condition {
  key: string;
  value: string;
  matchType: string;
}

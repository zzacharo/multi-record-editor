export interface Action {
    selectedAction: string,
    mainKey: string,
    whereRegex: boolean,
    value: string,
    updateValues: string[],
    updateRegex: boolean,
    whereKey: string,
    whereValues: string[]
  }
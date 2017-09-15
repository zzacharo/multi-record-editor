export interface Action {
    selectedAction: string,
    mainKey: string,
    whereRegex: boolean,
    value: any,
    updateValues: string[],
    updateRegex: boolean,
    whereKey: string,
    whereValues: string[]
  }
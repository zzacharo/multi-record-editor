import { QueryResult, RecordsPreview } from '../interfaces';
export interface RecordsToCompare {
    oldRecords: QueryResult;
    newRecords: RecordsPreview;
}

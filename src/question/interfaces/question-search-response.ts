import { QuestionSearchBody } from './question-search.dto';

export interface QuestionSearchResponse {
  hits: {
    total: number;
    hits: Array<{
      _source: QuestionSearchBody;
    }>;
  };
}

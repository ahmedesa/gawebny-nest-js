import { PostSearchBody } from './question-search.dto';

export interface QuestionSearchResponse {
  hits: {
    total: number;
    hits: Array<{
      _source: PostSearchBody;
    }>;
  };
}

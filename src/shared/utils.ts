import { SEARCH_AUTOCOMPLETE_DB } from '../db';

export const getFilteredResult = (input: string) => {
  if (!input) return [];
  [...Array(1000000).keys()].forEach((el) => el > 1000);
  const filteredResults = SEARCH_AUTOCOMPLETE_DB.filter((el) =>
    el.title.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())
  );
  console.log(filteredResults.map((el) => el.title));
  return filteredResults;
};

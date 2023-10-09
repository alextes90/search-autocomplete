import { useState, useMemo } from 'react';
import {
  LOCAL_STORAGE_KEY,
  MAX_AUTOCOMPLETE_RESULT,
} from '../shared/constants';
import { AutocompleteItemType, InMemoryDb } from '../shared/types';
import { getFilteredResult } from '../shared/utils';
import { AutocompleteItem } from './autocomplete-item';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [autocompleteList, setAutocompleteList] = useState<
    AutocompleteItemType[]
  >([]);
  const [searchResult, setSearchResult] = useState('');
  const initialMemoryData: InMemoryDb = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
  );
  const [inMemoryResults, setInMemoryResluts] = useState<InMemoryDb>({
    ...initialMemoryData,
    ['React js']: true,
  });

  const searchResultInfo = useMemo(() => {
    const startOperation = Date.now();
    const searchResultList = getFilteredResult(searchResult);
    setIsInputFocused(false);
    setAutocompleteList(searchResultList.slice(0, MAX_AUTOCOMPLETE_RESULT));
    const endOperation = Date.now();
    const timeSpent = endOperation - startOperation;
    return { searchResultList, timeSpent };
  }, [searchResult]);

  return (
    <section>
      <div className="flex justify-center flex-col items-center relative">
        <SearchInput
          inputValue={inputValue}
          isInputFocused={isInputFocused}
          setAutocompleteList={setAutocompleteList}
          setInputValue={setInputValue}
          setIsInputFocused={setIsInputFocused}
          setSearchResult={setSearchResult}
        />

        {isInputFocused && (
          <div className="shadow-lg absolute z-10 top-10 border border-slate-400 w-[300px] border-t-0 rounded-b-lg bg-white">
            {autocompleteList.length > 0 ? (
              <ul role="rowgroup">
                {autocompleteList.map((el) => (
                  <li key={el.id}>
                    <AutocompleteItem
                      setInputValue={setInputValue}
                      setSearchResult={setSearchResult}
                      title={el.title}
                      inMemoryResults={inMemoryResults}
                      setInMemoryResluts={setInMemoryResluts}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-2">No results</p>
            )}
          </div>
        )}
      </div>
      {!!searchResultInfo.searchResultList.length && (
        <SearchResults
          searchResultList={searchResultInfo.searchResultList}
          timeSpent={searchResultInfo.timeSpent}
        />
      )}
    </section>
  );
};

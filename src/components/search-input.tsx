import { useEffect, useRef } from 'react';
import { MAX_AUTOCOMPLETE_RESULT } from '../shared/constants';
import { AutocompleteItemType } from '../shared/types';
import { getFilteredResult } from '../shared/utils';

type Props = {
  isInputFocused: boolean;
  setIsInputFocused: (isFocused: boolean) => void;
  setInputValue: (input: string) => void;
  setAutocompleteList: (autocompleteList: AutocompleteItemType[]) => void;
  setSearchResult: (searchResult: string) => void;
  inputValue: string;
};
export const SearchInput = ({
  isInputFocused,
  setAutocompleteList,
  setInputValue,
  setIsInputFocused,
  setSearchResult,
  inputValue,
}: Props) => {
  const ref = useRef<boolean | null>(null);
  const inutHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isInputFocused) {
      setIsInputFocused(true);
    }
    setInputValue(e.target.value);
    const autocompleteResult = getFilteredResult(e.target.value).slice(
      0,
      MAX_AUTOCOMPLETE_RESULT
    );
    setAutocompleteList(autocompleteResult);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    setSearchResult(inputValue);
  };

  useEffect(() => {
    ref.current = true;
  }, []);

  const inputStyle = isInputFocused
    ? 'focus:border-b-0 focus:rounded-b-none focus:shadow-none'
    : '';
  return (
    <div className="relative">
      <input
        aria-label="search-input"
        className={`shadow-lg border border-slate-200 w-[300px] rounded-lg p-2 pl-8 focus:border-slate-400 focus:outline-none ${inputStyle}`}
        autoFocus
        value={inputValue}
        onChange={(e) => {
          inutHandler(e);
        }}
        onFocus={() => {
          if (ref.current) setIsInputFocused(true);
        }}
        onBlur={() => setIsInputFocused(false)}
        onKeyDown={(e) => {
          onKeyDownHandler(e);
        }}
      />
      <img
        className="absolute top-3 left-2"
        src="./search.svg"
        alt="search icon"
      />
      {!!inputValue.length && (
        <img
          onClick={() => {
            setInputValue('');
            setAutocompleteList([]);
          }}
          className="absolute top-3 right-2 hover:cursor-pointer"
          src="./close.svg"
          alt="close icon"
        />
      )}
    </div>
  );
};

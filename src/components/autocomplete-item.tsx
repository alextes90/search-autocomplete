import { LOCAL_STORAGE_KEY } from '../shared/constants';
import { InMemoryDb } from '../shared/types';

type Props = {
  setInputValue: (input: string) => void;
  setSearchResult: (searchResult: string) => void;
  title: string;
  inMemoryResults: InMemoryDb;
  setInMemoryResluts: (newDb: InMemoryDb) => void;
};
export const AutocompleteItem = ({
  setInputValue,
  setSearchResult,
  title,
  inMemoryResults,
  setInMemoryResluts,
}: Props) => {
  const onMouseDown = () => {
    const newInMemoryDb = { ...inMemoryResults, [`${title}`]: true };
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newInMemoryDb)
    );
    setInMemoryResluts(newInMemoryDb);
    setInputValue(title);
    setSearchResult(title);
  };
  const onDeleteHandler = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const newInMemoryDb = { ...inMemoryResults };
    delete newInMemoryDb[title];
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(newInMemoryDb)
    );
    setInMemoryResluts(newInMemoryDb);
  };
  const inMemoryStyle = inMemoryResults[title] ? 'text-purple-950' : '';
  return (
    <div
      className={`px-2 py-1 hover:cursor-pointer hover:bg-slate-200 rounded-lg flex justify-between ${inMemoryStyle}`}
      onMouseDown={onMouseDown}
    >
      <div className="flex gap-2">
        {inMemoryResults[title] ? (
          <img src="clock.svg" alt="clock icon" />
        ) : (
          <img src="./search.svg" alt="search icon" />
        )}
        <p>{title.toLowerCase()}</p>
      </div>

      {inMemoryResults[title] && (
        <p
          className="hover:cursor-pointer"
          onMouseDown={(e) => onDeleteHandler(e)}
        >
          Remove
        </p>
      )}
    </div>
  );
};

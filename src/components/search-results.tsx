import { AutocompleteItemType } from '../shared/types';
import { SearchResultItem } from './search-result-item';

type Props = {
  searchResultList: AutocompleteItemType[];
  timeSpent: number;
};

export const SearchResults = ({ searchResultList, timeSpent }: Props) => {
  console.log(timeSpent);
  return (
    <aside className="p-2">
      <p className="text-gray-400">
        The total results {searchResultList.length} ({timeSpent / 1000}) s
      </p>

      {searchResultList.map((el) => (
        <SearchResultItem
          key={el.id}
          title={el.title}
          description={el.description}
          url={el.url}
        />
      ))}
    </aside>
  );
};

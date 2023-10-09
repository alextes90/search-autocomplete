type Props = {
  title: string;
  description: string;
  url: string;
};
export const SearchResultItem = ({ title, description, url }: Props) => {
  return (
    <div className="py-2">
      <h4 className="py-2 text-blue-800 font-bold text-lg">
        <a href={url}>{title}</a>
      </h4>
      <p className="pb-2">{description.substring(0, 300)}...</p>
      <hr />
    </div>
  );
};

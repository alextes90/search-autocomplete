import { Search } from './components/search';

function App() {
  return (
    <>
      <header className="flex justify-center">
        <h1 className="text-[32px] font-bold">Serch - autocomplete</h1>
      </header>
      <main className="my-4 min-h-screen">
        <Search />
      </main>
      <footer className="p-2">@Alex Teslin</footer>
    </>
  );
}

export default App;

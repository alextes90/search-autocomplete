import { screen, render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Search } from './search';

afterEach(cleanup);
describe('<Search/>', () => {
  it('Input is on the screen', async () => {
    render(<Search />);
    const input = (await screen.findByLabelText(
      'search-input'
    )) as HTMLInputElement;
    expect(input).toBeTruthy();
  });
  it('type react', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react js');
    expect(input.value).toBe('react js');
  });
  it('get autocomplete list of 10 items', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react j');
    const autocompleteList = screen.getAllByText(/react j/i);
    expect(autocompleteList.length).toBe(10);
  });
  it('render react js search results', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react js');
    const reactJsDiv = screen.getByText('react js');
    await userEvent.click(reactJsDiv);
    const searchResultList = screen.getAllByText(/react js/i);
    expect(searchResultList.length).toBe(10);
    const description = screen.getByText(
      /React is the most popular front-end JavaScript/i
    );
    expect(description).toBeTruthy();
  });
  it('remove from inMemory search', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react js');
    const removeButton = screen.getByText('Remove');
    await userEvent.click(removeButton);
    const removeButtonNew = screen.queryByText('Remove');
    expect(removeButtonNew).toBeFalsy();
  });
  it('add to inMemory search', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react js');
    const jssAutocomplete = screen.getByText('react jss');
    await userEvent.click(jssAutocomplete);
    await userEvent.type(input, '{backspace}');
    const removeButtons = screen.queryAllByText('Remove');
    expect(removeButtons.length).toBe(2);
  });
  it('autocomplete desapiare onBlur', async () => {
    render(<Search />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    await userEvent.type(input, 'react js');
    const autocompleteList = screen.getByRole('rowgroup');
    expect(autocompleteList).toBeTruthy();
    const jssAutocomplete = screen.getByText('react jss');
    await userEvent.click(jssAutocomplete);
    const autocompleteListNew = screen.queryByRole('rowgroup');
    expect(autocompleteListNew).toBeFalsy();
  });
});

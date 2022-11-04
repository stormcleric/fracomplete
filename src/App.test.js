import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

const user = userEvent.setup({
    // Some defaults ...
    skipPointerEventsCheck: true,
    // This could also e.g. include a localized keyboard mapping:
    keyboardMap: [
        // Force @ in case these test are not working.
        {key: '@', code: 'Digit2', altRightKey: true }
        // ...
    ],
})

test('renders the main component', () => {
  render(<App />);
  const element = screen.getByTestId('fraMainComponent');
  expect(element).toBeInTheDocument();
});

test('writes on the main component', async () => {
  render(<App />);
  let text = 'testing testing plz';
  await user.click(screen.getByTestId('fraTextArea'));
  await user.keyboard(text);
  const element = screen.getByText(text);
  expect(element).toBeInTheDocument();
});

test('invokes the Item Selector', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  render(<App />);
  let text = "No users matched your search";
  await user.click(screen.getByTestId('fraTextArea'));
  
  // This now dispatches key events for [Digit2] for the double quotes
  await user.keyboard('@')
  
  const element = screen.getByTestId('fraItemContainer');
  expect(element).toBeInTheDocument();
});

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
  
  await user.click(screen.getByTestId('fraTextArea'));
  await user.keyboard('@')
  
  const element = screen.getByTestId('fraItemContainer');
  expect(element).toBeInTheDocument();
});

test('no users available', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  render(<App />);
  let text = "No users matched your search.";
  
  await user.click(screen.getByTestId('fraTextArea'));  
  await user.keyboard('@----')
  
  const element = screen.getByText(text);
  expect(element).toBeInTheDocument();
});

test('some users available', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  render(<App />);
  let text = "No users matched your search.";
  
  await user.click(screen.getByTestId('fraTextArea'));  
  await user.keyboard('@')
  
  const element = screen.queryByText(text);
  expect(element).not.toBeInTheDocument();
});

test('selects first user', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  window.HTMLElement.prototype.focus = function() {};
  render(<App />);
    
  await user.click(screen.getByTestId('fraTextArea'));  
  await user.keyboard('@[Enter]')
  
  const element = screen.queryByText('@');
  expect(element).not.toBeInTheDocument();
});

test('writes, selects first user, text still present', async () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  window.HTMLElement.prototype.focus = function() {};
  render(<App />);
  let text = 'Hello Paula Turner (pturner0)';
    
  await user.click(screen.getByTestId('fraTextArea'));  
  await user.keyboard('Hello ');
  await user.keyboard('@');
  await user.keyboard('[Enter]');
  
  const element = screen.getByText(text);
  expect(element).toBeInTheDocument();
});

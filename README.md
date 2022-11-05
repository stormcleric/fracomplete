# Fracomplete

Hi there!

Here you've got a textarea that provides an autocomplete widget which you can invoke by typing "@". My aims when developing this tool were to be able to write down people's names and usernames in a way that is easy to use and does not interfere with the main task - that is, writing a comment. So you can just write some text, type an @, select a person - or close the list - and keep on writing!

![Sample of Fracomplete in action!](https://github.com/stormcleric/fracomplete/blob/master/public/Fracomplete.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). And also thanks to [nicorayanud](https://github.com/nicoraynaud/) for his build:widget feature.

## Live demo

Not in the mood of cloning this repo into your local? No problem!

Just try this [live demo on Vercel](https://fracomplete.vercel.app) and enjoy the latest master version of the widget.

## Purpose and disclaimer

This project started as a demo test for a job application, so wish me luck!

## Component usage

Below you'll find how to use the component. I mean, it's very likely you'll have already guessed how to do so, but just for your information.

### @

Use "@" (Digit2) to invoke the list

### UpArrow, DownArrow

Use UpArrow and DownArrow to cycle through the list

### Enter, Tab, RightArrow

Any of these keys writes current selected name into the textarea

### Escape

One way to close the list

### Click on a list item

Another way to write down a name into the textarea

### Click outside the window

Another way to close the list

### Delete the @

Last way to close the list

This is a widget used for displaying a stock symbol, name, price and intraday variation in an embeddable div.

Here is an example of the 3 widget items in the same page :

## Developers

You know the deal - fork/clone the project and then...

### `npm install`

Install all dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run test`

Runs the test suite.

**Note that the test heavily depends on being able to print "@" so if the test is failing it's very likely you'll have to tweak your keyb mappings. To do so, edit your App.test.js file, section const user = userEvent.setup(...**

### `npm build:widget`

Builds the app as an embeddable widget. Creates two files :
- fracomplete.js
- fracomplete.css

That can be included in any web page to trigger the load of the widget.

## Integration

Pretty straightforward.

### HTML

Just id="fracomplete" a div and you're good to go.

```html
...
<div id="fracomplete"></div>
...
...
<!-- /!\ Only add these two tags once per page -->
<link href="[YOUR_LOCATION]/fracomplete.css" rel="stylesheet"/>
<script src="[YOUR_LOCATION]/fracomplete.js"></script>
...
```
### React

You can use this react component inside your React app.

```html
...
<Fracomplete />
...
```

# Next steps and TODO

Feel free to submit me your suggestions on this widget.

* Allow setting an initial text to the textarea.
* Importing/fetching list of people from different sources.
* Map people's properties to Item's properties via config.


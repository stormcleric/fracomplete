import React from 'react';
import PropTypes from 'prop-types';
import ItemContainer from './ItemContainer';

/**
 * MainComponent is the main component for this widget.
 * Whenever you write down an @ inside the textarea,
 * the ItemContainer container will show.
 * @param {string} value Initial message to be shown
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleManualClosing = this.handleManualClosing.bind(this);
    this.handleSelectedItem = this.handleSelectedItem.bind(this);
    this.getTextProperties = this.getTextProperties.bind(this);
    this.updateCaret = this.updateCaret.bind(this);

    this.textareaRef = React.createRef();

    this.state = {
      value: props.value,
      list: [],
      acompleteQueryStart: -1,
    };
  }

  render() {    
    let autocomplete = '';
    if (this.state.acompleteQueryStart > -1) {      
      autocomplete = (
        <ItemContainer
          query={this.state.query}
          list={this.state.list}
          onSelectedItem={this.handleSelectedItem}
          onManualClosing={this.handleManualClosing}
        />
      );
    }

    return (
      <div id="mainComponent" data-testid='fraMainComponent'>
        <textarea
          ref={this.textareaRef}
          id="textarea"
          name="commentbox"
          placeholder="Write @ to invoke the auto complete..."
          onChange={this.handleOnChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.value}
          data-testid='fraTextArea'
        ></textarea>
        {autocomplete}
      </div>
    );
  }

  static propTypes = {
    value: PropTypes.string,
  };

  /**
   * Handles the textarea's onChange event 
   * @param {event} event System event
   */
  handleOnChange(event) {    
    this.setState({
      value: event.target.value,
    });
  }

  /**
   * Handles the autocomplete manual closing event
   * When the ItemContainer needs to be closed,
   * it asks the MainComponent. 
   */
  handleManualClosing() {
    this.setState({
      acompleteQueryStart: -1,
      query: '',
    });
  }

  /**
   * ItemContainer notifies the MainComponent when
   * an item has been selected in order to enter
   * the user into the textarea.
   * @param {object} item Selected user
   */
  handleSelectedItem(item) {
    var textProp = this.getTextProperties();
    var userText = item.name + ' (' + item.username + ')';
    var newValue = textProp.textToTheLeft + userText + textProp.textToTheRightMinusQuery;

    this.setState({
        value: newValue,
        acompleteQueryStart: -1,
        query: '',
      },
      this.updateCaret(textProp.queryIndexStart + userText.length + 1)
    );
  }

  /**
   * When modifying the text in a textarea, the caret goes
   * to the end of the text. This function recognices its
   * current place and sets a timeout to reposition it
   * later.
   * @param {integer} pos Where to put the caret
   */
  updateCaret(pos) {    
    setTimeout(() => {
      this.textareaRef.current.focus();
      this.textareaRef.current.selectionStart =
        this.textareaRef.current.selectionEnd = pos;
    }, 250);
  }

  /**
   * Returns the main properties that we extract from
   * the text, like the search query, its position,
   * and the text at both sides of the query.
   * @returns {object} Text properties 
   */
  getTextProperties() {
    if (typeof this.state.value === 'undefined' || this.state.acompleteQueryStart === -1) {
      return {
        queryIndexStart: -1,
        queryIndexEnd: -1,
        textToTheLeft: this.state.value,
        query: undefined,
        textToTheRightMinusQuery: '',
      };
    }

    let queryIndexStart = this.state.acompleteQueryStart;
    let textToTheLeft = this.state.value.substring(0, queryIndexStart);

    let textToTheRight = this.state.value.substring(queryIndexStart + 1);
    let textToTheRightMinusQuery = textToTheRight;
    let query = '';

    let queryIndexEnd = queryIndexStart + textToTheRight.length;
    var nextSpaceIndex = textToTheRight.indexOf(' ');
    
    // Different query processing depending on the caret position,
    // i.e. in the middle or in the end of the text.
    if (nextSpaceIndex > -1) {
      query = textToTheRight.substring(0, nextSpaceIndex);
      textToTheRightMinusQuery = textToTheRight.substring(nextSpaceIndex);
      queryIndexEnd = queryIndexStart + nextSpaceIndex;
    } else {
      textToTheRightMinusQuery = '';
      query = textToTheRight;
    }

    return {
      queryIndexStart: queryIndexStart,
      queryIndexEnd: queryIndexEnd,
      textToTheLeft: textToTheLeft,
      query: query,
      textToTheRightMinusQuery: textToTheRightMinusQuery,
    };
  }

  /**
   * Handles the key press function in order to
   * invoke the ItemContainer when pressing '@'
   * @param {event} event System event
   */
  handleKeyPress(event) {
    event = event || window.event;
    var charCode = event.which || event.keyCode;
    if (charCode === 64) {
      let list = this.getUserList();
      this.setState({
        acompleteQueryStart: event.target.selectionStart,
        query: '',
        list: list,
      });
    }
  }

  /**
   * The user list could change at any time so
   * we need to update it prior to showing the component.
   * Nevertheless here the call is cached.
   * TODO Add a prop to get the list from an API.
   * @returns {array} List of users.
   */
  getUserList() {
    let list = require('../resources/Auto Complete data.json');
    return list;
  }

  /**
   * We need to perform a second update in case
   * the query has changed or the '@' has dissapeared,
   * what means that we need to close the ItemContainer.
   */
  componentDidUpdate(prevProps, prevState) {
    let tp = this.getTextProperties();    
    if (this.state.acompleteQueryStart > -1) {
      if (prevState.query !== tp.query) {
        this.setState({
          query: tp.query,
        });
      }
      if (
        this.state.value !== undefined &&
        this.state.value !== prevState.value &&
        this.state.value.length >= this.state.acompleteQueryStart &&
        this.state.value[this.state.acompleteQueryStart] !== '@'
      ) {
        this.handleManualClosing();
      }
    }
  }
}

export default MainComponent;

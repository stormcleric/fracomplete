import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

/**
 * ItemContainer shows a list of Item (persons)
 * for the user to select one.
 * @param {string} query The query used to search
 * @param {array} list The complete list of people to show
 * @param {func} onSelectedItem Callback to tell parent an item was selected
 * @param {func} onManualClosing Callback to tell parent that it should close the component
 */
class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.keyPressFunc = this.keyPressFunc.bind(this);
    this.handleItemClicked = this.handleItemClicked.bind(this);
    this.clickFunc = this.clickFunc.bind(this);
    this.keyPressFunc = this.keyPressFunc.bind(this);

    this.state = {
      query: '',
      selectedIndex: 0,
    };
  }

  render() {    
    let items = this.getFilteredList();
    let toRender = '';
    if (items.length > 0) {
      toRender = items.map((item, i) => {
        return (
          <Item
            key={'item_' + i}
            item={item}
            isSelected={i === this.state.selectedIndex}
            onClick={this.handleItemClicked}
          />
        );
      });
    } else {
      toRender = (
        <tr className="item">
          <td className="emptyItem">No users matched your search.</td>
        </tr>
      );
    }

    return (
      <div id="itemContainerDiv" data-testid='fraItemContainer'>
        <table id="itemContainerTable">
          <tbody>{toRender}</tbody>
        </table>
      </div>
    );
  }

  static propTypes = {
    query: PropTypes.string,
    list: PropTypes.array,
    onSelectedItem: PropTypes.func,
    onManualClosing: PropTypes.func,
  };

  /**
   * Handles the item's clicked event and raises
   * a SelectedItem event for the parent to know. 
   * @param {event} event System event
   */
  handleItemClicked(item) {
    let index = this.props.list.indexOf(item);
    this.props.onSelectedItem(this.props.list[index]);
  }

  /**
   * Handles the keyboard's keypress event
   * in order to move around the list, 
   * select items and close the container. 
   * @param {event} event System event
   */
  keyPressFunc(event) {
    switch (event.code) {
      // Exit component
      case 'Escape':
        event.preventDefault();
        this.props.onManualClosing();
        break;
      // Accept selection
      case 'Enter':
      case 'NumpadEnter':
      case 'Tab':
      case 'ArrowRight':
        event.preventDefault();
        this.props.onSelectedItem(this.getSelectedItem());
        break;
      // Next item
      case 'ArrowDown': {
        event.preventDefault();
        let index = this.state.selectedIndex + 1;
        let list = this.getFilteredList();
        if (index < list.length)
          this.setState({
            selectedIndex: index,
          });
        break;
      }
      // Previous item
      case 'ArrowUp': {
        event.preventDefault();
        let index = this.state.selectedIndex - 1;
        if (index >= 0)
          this.setState({
            selectedIndex: index,
          });
        break;
      }
      default:
        break;
    }
  }
  
  /** Returns current selected item data.
   * @returns {object} username and name.
   */
  getSelectedItem() {
  debugger;
    let items = this.getFilteredList();
    return items[this.state.selectedIndex];
  }
  
  /** Returns the list, filtered.
   * @returns {object} Filtered user list or empty array.
   */
  getFilteredList() {
  debugger;
    let items = [];
    if (this.props.list) {
      items = this.props.list.filter(
        item =>
          item.name.includes(this.state.query) ||
          item.username.includes(this.state.query)
      );
    }
    return items;
  }

  /** This handler allows us to know if the user clicked outside
   * of the component in order to close it.
   * https://www.w3docs.com/snippets/javascript/how-to-detect-a-click-outside-an-element.html
   * @param {event} event Actual clicked event
   */
  clickFunc(event) {
    const flyoutEl = document.getElementById('itemContainerDiv');
    let targetEl = event.target; // clicked element
    do {
      if (targetEl === flyoutEl) {
        // This is a click inside, does nothing, just return.
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    } while (targetEl);
    // This is a click outside.
    this.props.onManualClosing();
  }

  /**
   * Add event listeners for the onclick and keydown events.
   */
  componentDidMount() {
    document.addEventListener('keydown', this.keyPressFunc, false);
    document.addEventListener('click', this.clickFunc, false);
  }
  
  /**
   * Remove event listeners for the onclick and keydown events.
   */  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPressFunc, false);
    document.removeEventListener('click', this.clickFunc, false);
  }
  
  /**
   * We need to perform a second update in case
   * the query has changed so that filtering is
   * actually achieved.
   */
  componentDidUpdate(prevProps) {
    if (typeof prevProps.query !== 'undefined' && prevProps.query !== this.state.query) {
      this.setState({
        query: prevProps.query,
      });
    }
  }
}

export default ItemContainer;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Item represents a user's data
 * to be used in the FraCompleteContainer.
 * @param {bool} isSeleted To show the element as selected
 * @param {class} item An item with avatar, username, and name
 * @param {function} onCLick THe parent handles this component's clicked event
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    let selectedClass = ' itemSelected';
    if (!this.props.isSelected) selectedClass = '';
    return (
      <tr
        className={'item' + selectedClass}
        ref={this.myRef}
        onClick={() => this.props.onClick(this.props.item)}
      >
        <td className="itemAvatar">
          <img
            className="itemAvatarImage"
            src={this.props.item.avatar_url}
            alt={this.props.item.avatar_url}
          />
        </td>
        <td className="itemUsername">
          <span>{this.props.item.username}</span>
        </td>
        <td className="itemName">
          <span>{this.props.item.name}</span>
        </td>
      </tr>
    );
  }

  static propTypes = {
    isSelected: PropTypes.bool,
    item: PropTypes.object,
    onClick: PropTypes.func,
  };

  /**
   * If this item was selected, we force it into
   * the view so that no selection goes out of the
   * user's scope.
   */
  componentDidUpdate() {
    if (this.props.isSelected) {
      this.myRef.current.scrollIntoView();
    }
  }
}

export default Item;

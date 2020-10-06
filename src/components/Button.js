import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { MenuButton, FontIcon, ListItem } from 'react-md';
import '../index.css';
// import './Button.css';

export class C_Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button raised
        primary={this.props.primary}
        className={this.props.className}
        secondary={this.props.secondary}
        children={this.props.label}
        style={this.props.style}
        onClick={this.props.action}
        disabled={this.props.disabled}
        iconEl={this.props.icon}
        name={this.props.name}
      />
    );
  }
}

export class C_ButtonFloat extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
      <Button floating
        children={this.props.label}
        tooltipLabel={this.props.tooltipLabel}
        tooltipPosition={this.props.tooltipPosition}
        primary={this.props.primary}
        secondary={this.props.secondary}
        className={this.props.className}
        style={this.props.style}
        onClick={this.props.action}
        forceIconFontSize={this.props.iconSize ? true : undefined}
        secondary={this.props.secondary}
        forceIconSize={this.props.iconSize}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.icon}
      </Button>
    );
  }
}


export class C_MenuButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options
    }

  }


  render() {
    var options = this.state.options;

    var listItem = [];

    options.map((item, i) => {
      var obj = {
        primaryText: <ListItem disabled={item.disabled} key={item.value} onClick={() => this.props.onClickItem(item.value)} primaryText={item.name} />,
        leftIcon: <FontIcon>{item.icon}</FontIcon>,
      } 

      listItem.push(obj);
    })

    return (
      <MenuButton
        id={this.props.name}
        icon
        cascading={this.props.cascading}
        style={this.props.style}
        listStyle={this.props.listStyle}
        menuStyle={this.props.menuStyle}
        anchor={{
          x: MenuButton.HorizontalAnchors.INNER_LEFT,
          y: MenuButton.VerticalAnchors.TOP,
        }}
        position={this.props.position ? this.props.position : MenuButton.Positions.TOP_RIGHT}
        secondary
        menuItems={listItem}
      >
        {this.props.icon}
      </MenuButton>
    );
  }
}

import React, { PureComponent } from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import '../index.css';

export class C_ToolTip extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Tooltip
        html={(
          <div style={this.props.tooltipStyle}>
            {this.props.tooltip}
          </div>
        )}
        size="big"
        unmountHTMLWhenHide={true}
        className={this.props.className}
        position={this.props.position}
        trigger={this.props.trigger ? this.props.trigger : "mouseenter"}
        arrow={true}
        onShow={this.props.onShow}
        style={this.props.style}
        tooltipStyle={this.props.tooltipStyle}
        delay={this.props.delay ? this.props.delay : 250}
        theme={this.props.theme}
        interactive={this.props.interactive}
        distance={this.props.distance}
        duration={this.props.duration}
      >
        {this.props.children}
      </Tooltip>
    );
  }
}
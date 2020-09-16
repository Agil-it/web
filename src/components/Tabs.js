import React, { PureComponent } from 'react';
import { TabsContainer, Tabs, Tab } from 'react-md'
import '../index.css';
// import './Button.css';

export class C_Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {

    const labelTabStyle = {
      userSelect: "none",
      fontSize:16, 
      fontStyle:"oblique",
      textTransform: "capitalize"
    }
    let tabs = this.props.tabs

    return (
      <TabsContainer className="md-cell md-cell--12 md-cell--bottom" >
          <Tabs >
            {tabs.map((tab, i) => (
              <Tab style={{ color: "black" }} disabled={tab.disabled} onClick={() => this.props.onClick(tab.value)} label={<p style={{...labelTabStyle, ...(tab.labelStyle || {})}}>{tab.name}</p>}>
                {this.props.children}
              </Tab>
            ))
            }
          </Tabs>
      </TabsContainer>
    );
  }
}
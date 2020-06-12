import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { TabsContainer, Tabs, Tab } from 'react-md'
import '../index.css';
// import './Button.css';

export class C_Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: this.props.tabs
    }
  }

  render() {

    const labelTabStyle = {
      fontSize:16, 
      fontStyle:"oblique",
      textTransform: "capitalize"
    }
    let tabs = this.state.tabs
    return (
      <TabsContainer className="md-cell md-cell--12 md-cell--bottom" >
          <Tabs >
            {tabs.map((tab, i) => (
              <Tab style={{ color: "black" }} onClick={() => this.props.onClick(tab.value)} label={<p style={labelTabStyle}>{tab.name}</p>}>
                {this.props.children}
              </Tab>
            ))
            }
          </Tabs>
      </TabsContainer>
    );
  }
}
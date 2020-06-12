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
    let tabs = this.state.tabs
    return (
      <Tabs style={{marginTop:40}} tabId="simple-tab" >
        {tabs.map((tab, i) => (
          <Tab style={{ width: "50%"}} label={tab.name}>
            {this.props.children}
          </Tab>
        ))
        }
      </Tabs>
    );
  }
}
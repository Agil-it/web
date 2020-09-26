import React, { Component } from 'react';
import '../index.css';
import { HandlerProvider } from '../providers/handler';
import { UserProvider } from '../providers/User';
import { UserHelper } from '../helpers/UserHelper';
import { C_Icon } from './Icon';
import { C_Label } from './Label';
import C_Header from './Header';
import { DateHelper } from '../helpers/Date';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listNotifications: [],
      userId: this.props.user.userId,
    }

    this.provider = new UserProvider();
  }

  componentDidMount(){
    this.getNotifications();
  }

  async getNotifications(){
    let { listNotifications, userId } = this.state;

    try {
      const response = await this.provider.getNotifications(userId)
      
      if (response.success) this.setState({listNotifications: response.data})
    } catch (error) {
      console.log("Notification -> getNotifications -> error", error)      
    }
  }

  render() {

    return (
      <div>
        <h1>{"NOTIFICAÇÃO"}</h1>
      </div>
    )
  }
}

export default Notification;
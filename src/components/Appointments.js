import React from 'react';
import '../index.css';
import { C_Table } from './Table';
import { DateHelper } from '../helpers/Date';
import { C_Loading } from './Loading';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { MessageModal } from './Message'
import { Card } from 'react-md';
import { C_Icon } from './Icon';

export class C_Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'Manutentor', property: 'user.name' },
        { name: 'Data do Apontamento', property: 'workedTime.startedWork', format: value => DateHelper.formatDate(value) },
        { name: 'Hora inicial', property: 'workedTime.startedWork', format: value => DateHelper.formatTime(value) },
        { name: 'Hora Final', property: 'workedTime.finishedWork', format: value => DateHelper.formatTime(value) },
        { name: 'Intervalo', property: 'workedTime.intervalTime', format: value => DateHelper.convertMinuteToHour(value) },
        { name: 'Descrição do Apontamento', property: 'workedTime.description' },
      ],
      appointments: [],
      isLoading: false,
    };

    this.close = this.close.bind(this);
    this.getTitle = this.getTitle.bind(this);
  }

  async getAppointments() {
    this.setState({
      appointments: [],
      isLoading: true,
    });

    try {
      const { data } = await new MaintenanceOrderProvider().getWorkedTimes(this.props.orderId);

      const appointments = data.reduce((acc, appointment) => {
        const { user, maintenanceWorkerId, workedTime } = appointment;

        workedTime.forEach(workedAppointmente => {
          acc.push({
            user,
            maintenanceWorkerId,
            workedTime: workedAppointmente,
          });
        });

        return acc;
      }, []);

      this.setState({
        appointments,
      })
    } catch(err) {
      console.log("C_Appointments -> getAppointments -> err", err)
      MessageModal.information('⚠ Erro', 'Algo deu errado. Tente novamente mais tarde');
      this.close();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  close() {
    this.props.onClose();
  }

  componentDidMount() {
    this.getAppointments();
  }

  getTitle() {
    return `Apontamentos da Ordem ${this.props.orderNumber}`;
  }

  render() {
    if(this.state.isLoading)
      return (<C_Loading />);

    return (
      <Card style={{ padding: 20, borderRadius: 5, width: '80%' }} >
        <div style={{ position: "relative" }}>
          <div>
            <C_Icon
              style={{ cursor: "pointer", position: "absolute", right: 0 }}
              icon="close" iconSize={25}
              action={() => this.close()}
            />
          </div>
        </div>
        <p style={{ fontSize: 24, fontWeight: "bold", textAlign: 'center' }}>{ this.getTitle() }</p>
        <div style={{ marginTop: 20, }}>
          <C_Table
            columns={this.state.columns}
            content={this.state.appointments}
            onClick={(event) => {
              this.setState({ showAppointmentDetails: true, appointmentDetails: event })
            }}
            showEffect={true}
            showPagination={true}
            hasFilter={true}
            rowsPerPage={10}
            filterPadding={true}
          />
        </div>
      </Card>
    );
  }
}
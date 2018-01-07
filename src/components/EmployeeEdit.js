import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';


class EmployeeEdit extends Component {
  state = {
    showConfirmModal: false
  }
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ uid: this.props.employee.uid, name, phone, shift });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `You will work on ${shift}`);
  }

  onFirePress() {
    this.toggleModal();
  }

  toggleModal() {
    console.log('it will be ', !this.state.showConfirmModal);
    this.setState({ showConfirmModal: !this.state.showConfirmModal });
    console.log(this.state);
  }

  deleteUser() {
    this.props.employeeDelete(this.props.employee.uid);
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>Save changes</Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>Text schedule</Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onFirePress.bind(this)}>Fire!</Button>
        </CardSection>

        <Confirm
          visible={this.state.showConfirmModal}
          onAccept={this.deleteUser.bind(this)}
          onDecline={this.toggleModal.bind(this)}
        >
          Are you sure to remove this employee?
        </Confirm>
      </Card>
    );
  }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};


export default connect(mapStateToProps, {
  employeeSave,
  employeeUpdate,
  employeeDelete
})(EmployeeEdit);

import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection } from './common';


class EmployeeCard extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name, phone, shift } = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <Card>
            <CardSection>
              <Text>{name}</Text>
            </CardSection>

            <CardSection>
              <Text>{phone}</Text>
            </CardSection>

            <CardSection>
              <Text>{shift}</Text>
            </CardSection>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default EmployeeCard;

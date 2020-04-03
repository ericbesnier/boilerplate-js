import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from "react-native";
import { Button, Card } from 'react-native-elements'
import { logout as _logout } from './UserActions';
import LoadingScreen from '../commons/LoadingScreen';

// c l a s s   S i g n O u t S c r e e n
// -------------------------------------
class SignOutScreen extends Component {
  constructor(props) {
    super(props);
    console.log('SignOutScreen/constructor');
  }

  render() {
    const { logout, user } = this.props;
    console.log('SignOutScreen/render: user=', user);
    if (user.isPending) {
      return (<LoadingScreen color="#FF0000" size="large" message="logout en cours..." />);
    }
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={user.email}>
        </Card>
        <Button
          buttonStyle={{ marginTop: 20, marginLeft: 15, marginRight: 15 }}
          title="Logout"
          onPress={() => logout(user.email, user.password)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (email, password) => dispatch(_logout(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOutScreen);

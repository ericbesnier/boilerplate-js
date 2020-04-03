import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Keyboard } from "react-native";
import { Button, Card, Input } from 'react-native-elements'
import { login as _login } from './UserActions';
import LoadingScreen from '../commons/LoadingScreen';

// c l a s s   S i g n I n S c r e e n
// -----------------------------------
class SignInScreen extends Component {
  constructor(props) {
    super(props);
    console.log('SignInScreen/constructor');
  }

  state = {
    email: '',
    password: ''
  }

  handleEmailChange = email => {
    console.log('SignInScreen/handleEmailChange: email=', email);
    this.setState({ email })
  }

  handlePasswordChange = password => {
    console.log('SignInScreen/handlePasswordChange: password=', password);
    this.setState({ password })
  }

  handleOnLogin = async () => {
    console.log('SignInScreen/handleOnLogin');
    const { email, password } = this.state
    try {
      if (email.length > 0 && password.length > 0) {
        this.props.login(email, password);
        Keyboard.dismiss();
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    const { email, password } = this.state;
    if (this.props.user.isPending) {
      return (<LoadingScreen color="#FF0000" size="large" message="login à l'application onepoint. en cours..." />);
    }
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Input
            placeholder='Email'
            onChangeText={this.handleEmailChange}
            value={email}
          />
          <Input
            placeholder='Password'
            onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
            value={password}
          />
        </Card>
        <Button
          buttonStyle={{ marginTop: 20, marginLeft: 15, marginRight: 15 }}
          title="Login"
          onPress={this.handleOnLogin}
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
  login: (email, password) => dispatch(_login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
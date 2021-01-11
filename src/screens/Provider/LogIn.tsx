import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { Text, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Login = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = () => {};

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.topColor, Colors.bottomColor]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={Colors.topColor}
        />

        <View style={styles.formContainer}>
          <Item>
            <FontAwesome //Icon for Username
              style={styles.icon}
              name="user-o"
              size={20}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Usuario"
                placeholderTextColor={Colors.white}
              />
            </View>
          </Item>

          <Item>
            <MaterialIcons //Icon for Password
              style={styles.icon}
              name="lock-outline"
              size={20}
            />

            <View style={styles.inputContainer}>
              <TextInput
                secureTextEntry={showPassword}
                style={styles.textInput}
                placeholder="Contraseña"
                placeholderTextColor={Colors.white}
                autoCorrect={false}
              />

              <MaterialCommunityIcons // Show/Hide Password Icon
                style={styles.passwordIcon}
                name={!showPassword ? 'eye-outline' : 'eye-off'}
                size={20}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
          </Item>

          <TouchableOpacity
            style={styles.loginButtonTouchable}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('Orders');
            }}>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={handleChange}>
            <Text style={styles.createAccText}>Crear cuenta</Text>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
  },

  icon: {
    color: 'white',
  },

  textInput: {
    width: '85%',
    color: 'white',
    padding: 10,
    fontSize: 17,
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  loginButtonTouchable: {
    marginVertical: 20,
  },

  loginButtonContainer: {
    padding: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },

  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },

  passwordIcon: {
    color: 'white',
    alignSelf: 'center',
  },

  createAccText: {
    color: 'white',
    paddingTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Login;

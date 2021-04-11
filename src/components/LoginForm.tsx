import React, { useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { Text, Item } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

interface Props {
  onChangeUser: (user: string) => void;
  onChangePassword: (pw: string) => void;
  onSubmit: () => void;
  errorMessage: string;
  isLoading: boolean;
}

const LoginScreen = ({
  onChangeUser,
  onChangePassword,
  onSubmit,
  errorMessage,
  isLoading,
}: Props) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.purple2, Colors.purple]}
        style={styles.linearGradient}
        start={{ x: 0.7, y: 0.3 }}>
        <FocusAwareStatusBar
          barStyle="light-content"
          backgroundColor={Colors.purple2}
        />

        <View style={styles.formContainer}>
          <Item>
            <FontAwesome style={styles.icon} name="user-o" size={20} />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Usuario"
                placeholderTextColor={Colors.white}
                autoCorrect={false}
                onChangeText={onChangeUser}
              />
            </View>
          </Item>

          <Item>
            <MaterialIcons style={styles.icon} name="lock-outline" size={20} />

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Clave"
                placeholderTextColor={Colors.white}
                autoCorrect={false}
                onChangeText={onChangePassword}
                secureTextEntry={showPassword}
              />

              <MaterialCommunityIcons
                style={styles.passwordIcon}
                name={showPassword ? 'eye-off' : 'eye-outline'}
                size={20}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
          </Item>

          <TouchableOpacity
            style={styles.loginButtonTouchable}
            activeOpacity={1}
            onPress={onSubmit}>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginButtonText}>Iniciar sesion</Text>
            </View>
          </TouchableOpacity>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          {isLoading ? <ActivityIndicator size="large" color="#fff" /> : null}
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

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInput: {
    width: '85%',
    color: 'white',
    padding: 10,
    fontSize: 17,
  },

  passwordIcon: {
    color: 'white',
    alignSelf: 'center',
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

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.red,
  },
});

export default LoginScreen;

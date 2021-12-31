import {LoginData, RegisterData} from './types';
import {makeObservable, observable, action, computed} from 'mobx';
import {AppStateType} from './app-state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkServiceBase} from '../services';
import {handleErrorMessage} from '../utils';

const DATA_DEFAULT = {
  LOGIN_DATA: {
    email: '',
    password: '',
  },
  REGISTER_DATA: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

export class Auth extends NetworkServiceBase {
  appState?: AppStateType = undefined;

  constructor() {
    super();
    makeObservable(this, {
      loginData: observable,
      registerData: observable,
      onLogin: action,
      updateDataLogin: action,
      updateDataRegister: action,
      onRegister: action,
      isActiveBtnLogin: computed,
    });
  }

  loginData: LoginData = DATA_DEFAULT.LOGIN_DATA;

  registerData: RegisterData = DATA_DEFAULT.REGISTER_DATA;

  //computed
  get isActiveBtnLogin() {
    if (this.loginData?.email && this.loginData?.password) {
      return true;
    }
    return false;
  }

  get isActiveBtnRegister() {
    const {password, confirmPassword, email, name} = this.registerData;
    if (
      password &&
      confirmPassword &&
      email &&
      name &&
      confirmPassword === password
    ) {
      return true;
    }
    return false;
  }

  //action
  resetDataLogin() {
    this.loginData = DATA_DEFAULT.LOGIN_DATA;
  }

  resetDataRegister() {
    this.registerData = DATA_DEFAULT.REGISTER_DATA;
  }

  updateDataLogin(type: 'email' | 'password', value: string) {
    this.loginData[type] = value;
  }

  updateDataRegister(
    type: 'name' | 'email' | 'password' | 'confirmPassword',
    value: string,
  ) {
    this.registerData[type] = value;
  }

  async onLogin() {
    try {
      const {data} = await this.post('LOGIN', this.loginData).promise;
      this.resetDataLogin();
      return data;
    } catch (error) {
      throw handleErrorMessage(error);
    }
  }

  async onRegister() {
    try {
      const {password, confirmPassword, email, name} = this.registerData;
      if (
        password &&
        confirmPassword &&
        email &&
        name &&
        confirmPassword === password
      ) {
        const {data} = await this.post('REGISTER', this.registerData).promise;
        this.resetDataRegister();
        return data;
      }
    } catch (error) {
      throw handleErrorMessage(error);
    }
  }
}

export type AuthStoreType = Auth;

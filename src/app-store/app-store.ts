import {makeObservable, observable} from 'mobx';
import {AppState, AppStateType} from '../models';
import { Auth, AuthStoreType } from '../models/auth';
// import { persistStore } from '@/services';
// import { SYNC_STORAGE } from '@/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
class AppStore {
  appState: AppStateType = new AppState();
  appAuth: AuthStoreType = new Auth();

  constructor() {
    makeObservable(this, {
      appState: observable,
      appAuth: observable,
    });

    // persistStore(
    //   this.appState,
    //   ['isSkipWelcome', 'isSkipGuideTour', 'attachmentConfigs'],
    //   SYNC_STORAGE.PERSIST_APP_STATE,
    // );

    // persistStore(this.auth, ['infoLogged'], SYNC_STORAGE.PERSIST_APP_AUTH);
  }

  // get isSynchronized() {
  // return this.appState.isSynchronized && this.auth.isSynchronized;
  // }

  // clearStore = () => {
  //   this.liveSetupStore = new LiveSetup(this.auth);
  //   this.favoriteLive = new FavoriteLive(this.auth);
  //   this.notificationStore = new NotificationStore(this.auth);
  //   this.shoppingCartStore = new ShoppingCartStore();
  //   this.ordersStore = new OrdersStore(this.auth);
  //   // this.auth = new Auth(this.appState);
  //   this.homeLive = new HomeLive();
  //   this.products = new ProductStore();
  //   this.liveComment = new LiveCommentState(
  //     this.appState,
  //     this.auth,
  //     this.products,
  //   );
  //   this.searchStore = new SearchStore();
  //   this.paymentOptions = new PaymentOption(this.shoppingCartStore, this.auth);
  //   this.withdrawal = new Withdrawal();
  //   this.accountSettingStore = new AccountSetting(
  //     this.liveSetupStore,
  //     this.paymentOptions,
  //     this.auth,
  //   );
  //   this.ordersStore = new OrdersStore(this.auth);
  //   AsyncStorage.removeItem(SYNC_STORAGE.PERSIST_APP_AUTH);
  // };
}

export default new AppStore();

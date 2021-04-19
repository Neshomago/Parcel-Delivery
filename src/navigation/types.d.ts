export interface IHistory {
  fecha: string;
  estado: string;
}

export interface IMainScreen {
  data: { id_segui: string; estadoHist: IHistory[] };
}

export interface IOrder {
  id_cpte: string;
  id_estado: string;
  nombre_cliente: string;
  direccion: string;
  nu_paquetes: string;
  latitud: string;
  longitud: string;
  tx_detalle: string;
  bl_firma: string;
}

export interface IAuthContext {
  user: string | null;
  errorMessage: string;
  signin: (username: string, password: string) => void;
  signout: () => void;
}

export type StackParams = {
  MainScreen: IMainScreen;
  StatusScreen: any;
  QRScanner: undefined;
  HistoryScreen: { orderNumber: string; history: IHistory[] };
  LoginScreen: { user: string };
  OrdersScreen: { userName: string };
  OrderScreen: { id_cpte: string };
  MapScreen: { orders: IOrder[] };
};

export type TabParams = {
  MainScreen: undefined;
  LoginScreen: undefined;
};

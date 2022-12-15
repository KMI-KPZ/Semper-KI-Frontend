import { TUserType } from "./types";

export interface IProcessState {
  progressState: number;
  activeProcess: number;
  activeProcessList: number[];
  processList: IProcess[];
  nextID: number;
}

export interface IProcess {
  processId: number;
  model?: IModel;
  material?: IMaterial;
  manufacturer?: IManufacturer;
  postProcessing?: IPostProcessing;
  additive?: IAdditive;
}

export interface IModel {
  modelId?: number;
  name?: string;
  file: File;
}

export interface IMaterial {
  materialId?: number;
  name: string;
  propList?: string[];
}

export interface IManufacturer {
  manufacturerId?: number;
  name: string;
  propList?: string[];
  certificateList?: string[];
  distance?: number;
  productionTime?: number;
  deliverTime?: number;
  location?: ILocation;
}

export interface ILocation {
  name: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
}

export interface IPostProcessing {
  specificationList?: ISpecification[];
}

export interface ISpecification {
  name: string;
  value?: string;
  unit?: string;
  price?: number;
}

export interface IAdditive {
  file: string;
  text: string;
}

export interface IOption {
  name: string;
  numberInput?: boolean;
  stringInput?: boolean;
  checkInput?: boolean;
  price?: number;
  selectionMenuList?: ISelectionMenu[];
}

export interface ISelectionMenu {
  name: string;
  selectionList: ISelection[];
  followSelectionMenuList?: ISelectionMenu[];
}

export interface ISelection {
  name?: string;
  value?: string;
  unit?: string;
  price?: number;
}

export interface IOrder {
  orderId?: number;
  processList: IProcess[];
  date: Date;
  orderState: string;
  bill?: File;
}

export interface IUserInfo {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nickname: string;
  nonce: string;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

export interface IAuthToken {
  access_token: string;
  expires_at: number;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
  userinfo: IUserInfo;
}

export interface IChat {
  orderId: number;
  userIds: number[];
  messages: IMessage[];
}

export interface IMessage {
  userId: number;
  text: string;
  date: number;
}

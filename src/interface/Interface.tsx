import {
  EOrderState,
  EPostProcessingOption,
  EProgressType,
  EUserType,
} from "./enums";

export interface IProcess {
  title?: string;
  model?: IModel;
  material?: IMaterial;
  procedure?: IProcedure;
  postProcessing?: IPostProcessing;
  manufacturer?: IManufacturer;
  additive?: IAdditive;
}

export interface IProgress {
  title: string;
  link: string;
  type: EProgressType;
}

export interface IModel {
  title: string;
  tags: string[];
  date: string;
  license: string;
  certificate: string[];
  URI: string;
}

export interface IMaterial {
  title: string;
  propList: string[];
  URI: string;
}

export interface IProcedure {
  title: string;
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
  title: string;
  checked: boolean;
  value: string;
  valueList: string[];
  type: EPostProcessingOption;
  URI: string;
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
  orderState: EOrderState;
  bill?: File;
}

export interface IUser {
  name: string;
  email: string;
  type: EUserType;
  created: string;
  updated: string;
  accessed: string;
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

export interface IHeaderItem {
  title: string;
  i18n: string;
  link: string;
  icon: string;
  extern: boolean;
  preferred: string;
  userType: EUserType[];
  loggedIn?: boolean;
}

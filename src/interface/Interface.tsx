import {
  EHeaderItemLoggedIn,
  EHeaderItemPreferred,
  EOrderState,
  EPostProcessingOptionType,
  EProgressType,
  EUserType,
} from "./enums";

export interface IProcessItem {
  title?: string;
  model?: IModel;
  material?: IMaterial;
  procedure?: IProcedure;
  postProcessings?: IPostProcessing[];
  manufacturerID?: string;
  additive?: IAdditive;
}

export interface IProgress {
  title: string;
  link: string;
  type: EProgressType;
}

export interface IModel {
  id: string;
  title: string;
  tags: string[];
  date: string;
  license: string;
  certificate: string[];
  URI: string;
  createdBy: string;
}

export interface IMaterial {
  id: string;
  title: string;
  propList: string[];
  URI: string;
}

export interface IProcedure {
  title: string;
}

export interface IManufacturer {
  // manufacturerId?: number;
  // name: string;
  // propList?: string[];
  // certificateList?: string[];
  // distance?: number;
  // productionTime?: number;
  // deliverTime?: number;
  // location?: ILocation;
  name: string;
  id: string;
}

export interface ILocation {
  name: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
}

export interface IPostProcessing {
  id: string;
  title: string;
  checked: boolean;
  value: string;
  valueList: string[];
  type: EPostProcessingOptionType;
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
  orderId: string;
  processList: IProcessItem[];
  date: Date;
  orderState: EOrderState;
  files: File[];
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
  link: string;
  icon: string;
  extern: boolean;
  preferred: EHeaderItemPreferred;
  userType: EUserType[];
  loggedIn: boolean[];
}

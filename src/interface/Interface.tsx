import { ReactNode } from "react";
import {
  EHeaderItemLoggedIn,
  ENavigationItemPreferred,
  EOrderCollectionState,
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
  name: string;
  id: string;
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

export interface IUser {
  address: IAddress;
  email: string;
  hashedID: string;
  name: string;
  organization: string;
  type: EUserType;
  created: Date;
  accessed: Date;
  updated: Date;
}

export interface IAddress {
  city: string;
  houseNumber: string;
  street: string;
  country: string;
  zipcode: string;
}

export interface IOrderCollection {
  id: string;
  date: string;
  state: EOrderCollectionState;
  orders: IOrder[];
}

export interface IOrder {
  id: string;
  item: IProcessItem;
  orderState: EOrderState;
  chat: { messages: IChatMessage[] };
}

export interface IChatMessage {
  userID: string;
  userName: string;
  date: string;
  text: string;
}

export interface IHeaderItem {
  title: string;
  link: string;
  icon: string | ReactNode;
  extern: boolean;
  preferred: ENavigationItemPreferred;
  userType: EUserType[];
  loggedIn: boolean[];
}

export interface IOrderCollectionEvent {
  orderCollectionID: string;
  orders: IOrderEvent[];
}
export interface IOrderEvent {
  orderID: string;
  status?: number;
  messages?: number;
}

export interface IWebsocketEvent {
  queries: string[];
  events: IOrderCollectionEvent[];
}

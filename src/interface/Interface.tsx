import { EProgressType, EUserType } from "./enums";

export interface IProcess {
  title?: string;
  model?: IModel;
  material?: IMaterial;
  manufacturer?: IManufacturer;
  postProcessing?: IPostProcessing;
  additive?: IAdditive;
}

export interface IProgress {
  title: string;
  type: EProgressType;
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

export interface IUser {
  name: string;
  email: string;
  type: string;
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
  show: boolean;
  userType: EUserType[];
}

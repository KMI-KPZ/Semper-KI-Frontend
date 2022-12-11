import { UserType } from "./types";

export interface ProcessState {
  progressState: number;
  activeProcess: number;
  activeProcessList: number[];
  processList: Process[];
  nextID: number;
}

export interface Process {
  processId: number;
  model?: Model;
  material?: Material;
  manufacturer?: Manufacturer;
  postProcessing?: PostProcessing;
  additive?: Additive;
}

export interface Model {
  modelId?: number;
  name?: string;
  file: File;
}

export interface Material {
  materialId?: number;
  name: string;
  propList?: string[];
}

export interface Manufacturer {
  manufacturerId?: number;
  name: string;
  propList?: string[];
  certificateList?: string[];
  distance?: number;
  productionTime?: number;
  deliverTime?: number;
  location?: Location;
}

export interface Location {
  name: string;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
}

export interface PostProcessing {
  specificationList?: Specification[];
}

export interface Specification {
  name: string;
  value?: string;
  unit?: string;
  price?: number;
}

export interface Additive {
  file: string;
  text: string;
}

export interface Option {
  name: string;
  numberInput?: boolean;
  stringInput?: boolean;
  checkInput?: boolean;
  price?: number;
  selectionMenuList?: SelectionMenu[];
}

export interface SelectionMenu {
  name: string;
  selectionList: Selection[];
  followSelectionMenuList?: SelectionMenu[];
}

export interface Selection {
  name?: string;
  value?: string;
  unit?: string;
  price?: number;
}

export interface Order {
  orderId?: number;
  processList: Process[];
  date: Date;
  orderState: string;
  bill?: File;
}

export interface UserInfoType {
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

export interface AuthTokenType {
  access_token: string;
  expires_at: number;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
  userinfo: UserInfoType;
}

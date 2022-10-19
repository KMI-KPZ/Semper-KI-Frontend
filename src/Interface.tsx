
export interface ProcessState {
  progressState: number,
  activeProcess: number,
  processList: Process[]
  nextID:number,
}

export interface Process {
  processId:number
  model?:Model,
  material?:Material,
  manufacturer?:Manufacturer,
  postProcessing?:PostProcessing,
  additive?:Additive
}

export interface Model {
  modelId?:number
  name?:string
  file:File
}

export interface Material {
  materialId?:number
  name:string
  propList?: string[]
}

export interface Manufacturer {
  manufacturerId?:number
  name: string,
  propList?: string[]
  certificateList?:string[]
  distance?:number
  productionTime?:number
  deliverTime?:number
  location?:Location
}

export interface Location {
  name:string,
  street:string,
  houseNumber:number,
  postalCode:string,
  city:string
}

export interface PostProcessing {
  specificationList?:Specification[]
}

export interface Specification {
  name:string,
  value?:string,
  unit?:string,
  price?:number
}

export interface Additive {
  file:string,
  text:string
}

export interface Option {
  name:string,
  numberInput?:boolean,
  stringInput?:boolean,
  checkInput?:boolean,
  price?:number,
  selectionMenuList?:SelectionMenu[]
}

export interface SelectionMenu {
  name:string,
  selectionList:Selection[],
  followSelectionMenuList?:SelectionMenu[]
}

export interface Selection {
  name?:string,
  value?:string,
  unit?:string,
  price?:number,
}

export interface Order {
  orderId?: number
  processList: Process[]
  date: Date
  orderState: string
  bill?:  File
}

export interface User {
  userId:number
  name:string
  username:string
  email:string
  password:string
}
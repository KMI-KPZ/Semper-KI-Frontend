
export interface ProcessState {
  progressState: number,
  activeProcess: number,
  processList: Process[]
  nextID:number,
}

export interface Process {
  id:number
  model?:Model,
  material?:Material,
  manufacturer?:Manufacturer,
  postProcessing?:PostProcessing,
  additive?:Additive
}

export interface Model {
  name?:string,
  file:File
}

export interface Material {
  name:string
  propList?: string[]
}

export interface Manufacturer {
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
export interface ISearchFilter {
  generally?: IGeneralFilter;
  model?: IModelFilter;
  proceeding?: IProceeding;
  material?: IMaterialFilter;
  manufacturer?: IManufacturerFilter;
  postProcessing?: IPostProcessingFilter;
}

export interface IGeneralFilter {
  price?: {
    min?: number;
    max?: number;
  };
  deliverTime?: {
    min?: number;
    max?: number;
  };
  amount?: {
    min?: number;
    max?: number;
  };
}

export interface IModelFilter {
  name?: string;
  categorys?: string[];
  certificates?: any[];
  properties?: string[];
  size?: {
    boxSize?: {
      lenghtMin?: number;
      lenghtMax?: number;
      widhtMin?: number;
      widhtMax?: number;
      heightMin?: number;
      heightMax?: number;
      unit: string;
    };
    surface?: {
      min?: number;
      max?: number;
      unit: string;
    };
    volume?: {
      min?: number;
      max?: number;
      unit: string;
    };
  };
}

export interface IProceeding {
  name?: string;
}

export interface IMaterialFilter {
  name?: string;
  category?: string[];
  properties?: string[];
}

export interface IManufacturerFilter {
  name?: string;
}

export interface IPostProcessingFilter {
  properties?: string[];
}

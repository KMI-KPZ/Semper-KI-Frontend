import React from "react";

interface Props {}

export interface FilterItemType {
  id: number;
  title: string;
  open: boolean;
  options: FilterItemOptionType[];
}

export interface FilterItemOptionType {
  id: number;
  title: string;
  checked: boolean;
  selection?: string[];
  range?: RangeFilterType | Range3DFilterType;
}

export interface RangeFilterType {
  type: string;
  start?: number;
  end?: number;
  unit?: string[];
}

export interface Range3DFilterType {
  type: string;
  start_x?: number;
  end_x?: number;
  start_y?: number;
  end_y?: number;
  start_z?: number;
  end_z?: number;
  unit?: string[];
}

const FilterData: FilterItemType[] = [
  {
    id: 0,
    title: "model",
    open: true,
    options: [
      {
        id: 0,
        title: "category",
        checked: false,
        selection: [
          "medicine",
          "fashion",
          "hobby",
          "tools",
          "models",
          "toy",
          "gadgets",
          "art",
          "learning",
        ],
      },
      {
        id: 1,
        title: "boxsize",
        checked: false,
        range: {
          type: "range3D",
          unit: ["m", "cm", "mm"],
        },
      },
      {
        id: 2,
        title: "surface",
        checked: false,
        range: {
          type: "range",
          unit: ["m²", "cm²", "mm²"],
        },
      },
      {
        id: 3,
        title: "volume",
        checked: false,
        range: {
          type: "range",
          unit: ["m³", "cm³", "mm³"],
        },
      },
    ],
  },
  {
    id: 1,
    title: "material",
    open: false,
    options: [
      {
        title: "material",
        id: 0,
        checked: false,
        selection: ["iron,copper,plastic"],
      },
      {
        title: "proceeding",
        id: 1,
        checked: false,
        selection: ["3D-Print,Molding"],
      },
    ],
  },
  {
    id: 2,
    title: "manufacturer",
    open: false,
    options: [
      {
        id: 0,
        title: "manufacturer",
        checked: false,
        selection: ["Man 1,Man 2"],
      },
    ],
  },
  {
    id: 3,
    title: "post-Processing",
    open: false,
    options: [],
  },
];

const getFilterData = (): FilterItemType[] => {
  return FilterData;
};

export default getFilterData;

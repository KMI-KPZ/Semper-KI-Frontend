import React from "react";
import {
  IManufacturer,
  IMaterial,
  IModel,
  IOrder,
  IProcess,
} from "../interface/Interface";

export const TestOrderList: IOrder[] = [
  {
    date: new Date(),
    orderState: "Angefragt",
    orderId: 0,
    bill: undefined,
    processList: [
      {
        model: { file: new File([], "t4est.stl") },
        material: { name: "Material 1" },
        manufacturer: { name: "Hersteller 1" },
      },
      {
        model: { file: new File([], "tes2345t.stl") },
        material: { name: "Material 1324" },
        manufacturer: { name: "Hersteller 41" },
      },
      {
        model: { file: new File([], "tes33t.stl") },
        material: { name: "Material 14" },
        manufacturer: { name: "Hersteller 123" },
      },
    ],
  },
  {
    date: new Date(),
    orderState: "In Bearbeitung",
    orderId: 1,
    bill: undefined,
    processList: [
      {
        model: { file: new File([], "test.stl") },
        material: { name: "Material 1" },
        manufacturer: { name: "Hersteller 1" },
      },
    ],
  },
  {
    date: new Date(),
    orderState: "Abgeschlossen",
    orderId: 2,
    bill: new File([], "Rechnung.pdf"),
    processList: [
      {
        model: { file: new File([], "test.stl") },
        material: { name: "Material 1" },
        manufacturer: { name: "Hersteller 1" },
      },
    ],
  },
];

export const TestModelList: IModel[] = [
  {
    modelId: 0,
    name: "Modell 0",
    file: new File([], "Model0.stl"),
  },
  {
    modelId: 1,
    name: "Modell 1",
    file: new File([], "Model1.stl"),
  },
  {
    modelId: 2,
    name: "Modell 2",
    file: new File([], "Model2.stl"),
  },
  {
    modelId: 3,
    name: "Modell 3",
    file: new File([], "Model3.stl"),
  },
  {
    modelId: 4,
    name: "Modell 4",
    file: new File([], "Model4.stl"),
  },
  {
    modelId: 5,
    name: "Modell 5",
    file: new File([], "Model5.stl"),
  },
  {
    modelId: 6,
    name: "Modell 6",
    file: new File([], "Model6.stl"),
  },
  {
    modelId: 7,
    name: "Modell 7",
    file: new File([], "Model7.stl"),
  },
  {
    modelId: 8,
    name: "Modell 8",
    file: new File([], "Model8.stl"),
  },
  {
    modelId: 9,
    name: "Modell 9",
    file: new File([], "Model9.stl"),
  },
];

export const TestMaterialList: IMaterial[] = [
  {
    materialId: 0,
    name: "Material 0",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 1,
    name: "Material 1",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 2,
    name: "Material 2",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 3,
    name: "Material 3",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 4,
    name: "Material 4",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 5,
    name: "Material 5",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 6,
    name: "Material 6",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 7,
    name: "Material 7",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 8,
    name: "Material 8",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
  {
    materialId: 9,
    name: "Material 9",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
  },
];

export const TestManufacturerList: IManufacturer[] = [
  {
    manufacturerId: 0,
    name: "Hersteller 0",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 32,
    productionTime: 4,
    deliverTime: 7,
  },
  {
    manufacturerId: 1,
    name: "Hersteller 1",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 43,
    productionTime: 9,
    deliverTime: 5,
  },
  {
    manufacturerId: 2,
    name: "Hersteller 2",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 47,
    productionTime: 3,
    deliverTime: 6,
  },
  {
    manufacturerId: 3,
    name: "Hersteller 3",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 6,
    productionTime: 8,
    deliverTime: 5,
  },
  {
    manufacturerId: 4,
    name: "Hersteller 4",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 14,
    productionTime: 7,
    deliverTime: 5,
  },
  {
    manufacturerId: 5,
    name: "Hersteller 5",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 16,
    productionTime: 2,
    deliverTime: 6,
  },
  {
    manufacturerId: 6,
    name: "Hersteller 6",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 34,
    productionTime: 9,
    deliverTime: 6,
  },
  {
    manufacturerId: 7,
    name: "Hersteller 7",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 21,
    productionTime: 6,
    deliverTime: 2,
  },
  {
    manufacturerId: 8,
    name: "Hersteller 8",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 22,
    productionTime: 1,
    deliverTime: 4,
  },
  {
    manufacturerId: 9,
    name: "Hersteller 9",
    propList: ["Eigenschaft 1", "Eigenschaft 2"],
    certificateList: ["Zertifikat 1", "Zertifikat 2"],
    distance: 12,
    productionTime: 4,
    deliverTime: 1,
  },
];

export const TestProcessList: IProcess[] = [
  {
    model: { file: new File([], "test0.stl") },
    material: { name: "Material 0" },
    manufacturer: { name: "Hersteller 0" },
  },
  {
    model: { file: new File([], "test1.stl") },
    material: { name: "Material 1" },
    manufacturer: { name: "Hersteller 1" },
  },
  {
    model: { file: new File([], "test2.stl") },
    material: { name: "Material 2" },
    manufacturer: { name: "Hersteller 2" },
  },
];

const { randomInt } = require("crypto");
module.exports = () => {
  const data = {
    modelList: [],
    materialList: [],
    manufacturerList: [],
    userList: [],
    orderList: [],
  };

  for (let i = 0; i < 100; i++) {
    data.modelList.push({
      modelId: i,
      name: `Modell ${i}`,
      file: { name: `File_${i}.stl` },
    });
    data.materialList.push({
      materialId: i,
      name: `Material ${i}`,
      propList: ["Eigenschaft 1", "Eigenschaft 2"],
    });
    data.manufacturerList.push({
      manufacturerId: i,
      name: `Hersteller ${i}`,
      propList: ["Eigenschaft 1", "Eigenschaft 2"],
      certificateList: ["Zertifikat 1", "Zertifikat 2"],
      distance: randomInt(1, 100),
      productionTime: randomInt(1, 10),
      deliverTime: randomInt(1, 10),
    });
    data.userList.push({
      userId: i,
      name: Math.round(Math.random() * 100).toString(),
      username: `user${i}`,
      email: `user${i}@email.de`,
      password: `user${i}_IsThEbEsT`,
    });
    data.orderList.push({
      orderId: i,
      date: Date.now(),
      orderState: "in Bearbeitung",
      processList: [],
    });
  }

  const fs = require("fs");
  fs.writeFileSync("testData.json", JSON.stringify(data, null, 2));

  return data;
};

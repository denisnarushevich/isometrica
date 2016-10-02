const BuildingData = require('src/data/buildings');

module.exports = {
  "items": [
    {
      "buildingCode": 15,
      name: BuildingData[15].name,
      "image": require("./img/buildings/15.png")
    },
    {
      "buildingCode": 16,
      name: BuildingData[16].name,
      "image": require("./img/buildings/16.png")
    },
    {
      "buildingCode": 17,
      name: BuildingData[17].name,
      "image": require("./img/buildings/15.png")
    },
    {
      "buildingCode": 18,
      name: BuildingData[18].name,
      "image": require("./img/buildings/16.png")
    },
    {
      "buildingCode": 19,
      name: BuildingData[19].name,
      "image": require("./img/buildings/15.png")
    },
    {
      "buildingCode": 20,
      name: BuildingData[20].name,
      "image": require("./img/buildings/16.png")
    },
    {
      "buildingCode": 10,
      name: BuildingData[10].name,
      "image": require("./img/buildings/10.png")
    },
    {
      "buildingCode": 6,
      name: BuildingData[6].name,
      "image": require("./img/buildings/3.png")
    },
    {
      "buildingCode": 0,
      name: BuildingData[0].name,
      "image": require("./img/buildings/tree2.png")
    }
  ],
  "categories": [
    {
      "code": 0,
      "name": "Industry",
      "image": require("./img/categories/industry.png"),
      "items": [
        6
      ]
    },
    {
      "code": 1,
      "name": "Municipal",
      "image": require("./img/categories/municipal.png"),
      "items": [
        10
      ]
    },
    {
      "code": 2,
      "name": "Housing",
      "image": require("./img/categories/housing.png"),
      "items": [
        15,
        16,
        17,
        18,
        19,
        20
      ]
    },
    {
      "code": 3,
      "name": "Commercial",
      "image": require("./img/categories/commercial.png"),
      "items": [
        0
      ]
    },
    {
      "code": 4,
      "name": "Misc",
      "image": require("./img/categories/misc.png"),
      "items": [
        0
      ]
    }
  ]
}
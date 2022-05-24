import { formatDate } from "@angular/common";
import { VesselAttribute } from "../backend-api/identity-registry/model/vesselAttribute";
import { MenuTypeNames } from "../shared/models/menuType";
import { convertTime } from "./timeConverter";
export const formatData = (data: object): object => {
  let menuData = {};
  for (const key in data) {
    if (key === "attributes") {
      // for vessel
      for (const attr_key in data[key]) {
        const attributeName = camel2snake(data[key][attr_key].attributeName);
        if (
          Object.values(VesselAttribute.AttributeNameEnum).find(
            (e) => e === attributeName
          )
        ) {
          menuData[snake2camel(attributeName)] =
            data[key][attr_key].attributeValue;
        }
      }
    } else {
      menuData[key] = data[key];
    }
  }
  return menuData;
};

export const formatServiceData = (data: object): object => {
  let menuData = {};
  for (const key in data) {
    menuData[key] = key.endsWith("At")
      ? convertTime(new Date(data[key]))
      : data[key];
  }
  return menuData;
};

export const formatVesselToUpload = (vesselData: object): object => {
  let attributes = [];
  for (const key in vesselData) {
    const attributeName = camel2snake(key);
    if (
      Object.values(VesselAttribute.AttributeNameEnum).find(
        (e) => e === attributeName
      )
    ) {
      attributes.push({
        createdAt: new Date(),
        updatedAt: new Date(),
        attributeName: attributeName,
        attributeValue: vesselData[key],
      });
      delete vesselData[key];
    }
  }
  vesselData["attributes"] = attributes;
  return vesselData;
};

const snake2camel = (input) =>
  input
    .split("-")
    .reduce(
      (res, word, i) =>
        i === 0
          ? word.toLowerCase()
          : `${res}${word.charAt(0).toUpperCase()}${word
              .substr(1)
              .toLowerCase()}`,
      ""
    );

const camel2snake = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

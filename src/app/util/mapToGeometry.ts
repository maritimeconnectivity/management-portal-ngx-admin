import { wktToGeoJSON, geojsonToWKT } from "@terraformer/wkt";

export const getGeometryCollectionFromMap = (drawnItems: any) => {
    // Initialise a geometry collection
    var geometry = {
        type: "GeometryCollection",
        geometries: []
    };
    drawnItems.toGeoJSON().features.forEach(feature => {
        geometry.geometries.push(feature.geometry);
    });

    const crs = {
        crs: {
          type: "name",
          properties: {
              name: "EPSG:4326"
          }
      }
    };
    // And return
    return {...geometry, ...crs};
}

export const getSingleGeometryFromMap = (drawnItems: any) => {
    // Initialise a single geometry object
    var geometry = undefined;
    console.log(drawnItems.toGeoJSON());
    drawnItems.toGeoJSON().features.forEach(feature => {
        geometry = feature.geometry;
    });
    // And return
    return geometry;
}

export const populateWKTTextArea = (drawnItems: any): string => {
    const geometry = getSingleGeometryFromMap(drawnItems);
    if(geometry) {
        return geojsonToWKT(geometry);
    } else {
        return '';
    }
}
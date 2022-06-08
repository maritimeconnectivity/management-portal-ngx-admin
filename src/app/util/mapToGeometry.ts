import * as L from 'leaflet';
import { wktToGeoJSON, geojsonToWKT } from '@terraformer/wkt';

export const getGeometryCollectionFromMap = (drawnItems: any) => {
    // Initialise a geometry collection
    const geometry = {
        type: 'GeometryCollection',
        geometries: [],
        crs: {
            type: 'name',
            properties: {
                name: 'EPSG:4326',
            },
        },
    };
    drawnItems.toGeoJSON().features.forEach(feature => {
        geometry.geometries.push(feature.geometry);
    });

    // And return
    return geometry;
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

export const addNonGroupLayers = (sourceLayer: any, targetGroup: any) => {
    if (sourceLayer instanceof L.LayerGroup) {
      sourceLayer.eachLayer(function(layer) {
        addNonGroupLayers(layer, targetGroup);
      });
    } else {
      targetGroup.addLayer(sourceLayer);
    }
}

export const removeLayers = (sourceLayer: any, targetGroup: any) => {
    if (sourceLayer instanceof L.LayerGroup) {
        sourceLayer.eachLayer(function(layer) {
            removeLayers(layer, targetGroup);
        });
    } else {
        targetGroup.removeLayer(sourceLayer);
    }
}
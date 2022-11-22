/**
 * Maritime Connectivity Platform Service Registry API
 * Maritime Connectivity Platform Service Registry, developed by the MCC MSR WG
 *
 * OpenAPI spec version: 0.1
 * Contact: info@maritimeconnectivity.net
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Coordinate } from './coordinate';
import { CoordinateSequence } from './coordinateSequence';
import { Envelope } from './envelope';
import { Geometry } from './geometry';
import { GeometryFactory } from './geometryFactory';
import { PrecisionModel } from './precisionModel';

export interface Point { 
    envelope?: Geometry;
    factory?: GeometryFactory;
    userData?: any;
    coordinates?: Array<Coordinate>;
    empty?: boolean;
    x?: number;
    y?: number;
    simple?: boolean;
    coordinate?: Coordinate;
    numPoints?: number;
    dimension?: number;
    boundary?: Geometry;
    geometryType?: string;
    boundaryDimension?: number;
    coordinateSequence?: CoordinateSequence;
    length?: number;
    valid?: boolean;
    numGeometries?: number;
    rectangle?: boolean;
    area?: number;
    centroid?: Point;
    interiorPoint?: Point;
    envelopeInternal?: Envelope;
    srid?: number;
    precisionModel?: PrecisionModel;
}
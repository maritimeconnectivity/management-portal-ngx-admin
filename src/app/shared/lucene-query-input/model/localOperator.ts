export enum LogicalOperator {
    And = 'and',
    Or = 'or',
}

interface FieldInfo {
    name: string;
    value: string;
}

export const fieldInfo: FieldInfo[] = [
    {
      name: 'Name',
      value: 'name',
    },
    {
      name: 'Status',
      value: 'status',
    },
    {
      name: 'Version',
      value: 'version',
    },
    {
      name: 'Keywords',
      value: 'keywords',
    },
    {
      name: 'Description',
      value: 'description',
    },
    {
      name: 'Data product type',
      value: 'dataProductType',
    },
    {
      name: 'Specification ID',
      value: 'specificationId',
    },
    {
      name: 'Design ID',
      value: 'designId',
    },
    {
      name: 'Instance ID',
      value: 'instanceId',
    },
    {
      name: 'MMSI',
      value: 'mmsi',
    },
    {
      name: 'IMO number',
      value: 'imo',
    },
    {
      name: 'Service type',
      value: 'serviceType',
    },
    {
      name: 'UN/LOCODE',
      value: 'unlocode',
    },
    {
      name: 'Endpoint URI',
      value: 'endpointUri',
    },
  ];
import { convertTime } from "../../util/timeConverter";

export const ColumnForRole = {
    id: {
        title: 'ID',
        type: 'number',
    },
    createdAt: {
        title: 'Created at',
        type: 'string',
        filter: false,
        valuePrepareFunction: (timestamp: any) => {
            return convertTime(timestamp);
        },
        visibleFrom: ['detail', 'list'],
    },
    updatedAt: {
        title: 'Updated at',
        type: 'string',
        filter: false,
        valuePrepareFunction: (timestamp: any) => {
            return convertTime(timestamp);
        },
        visibleFrom: ['detail', 'list'],
    },
    roleName: {
        title: 'Role name',
        type: 'string',
    },
    permission: {
        title: 'Role name',
        type: 'string',
    },
}

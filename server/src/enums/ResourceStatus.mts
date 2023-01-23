import { registerEnumType } from 'type-graphql';

export enum ResourceStatus {
    WAITING     = 'WAITING',
    ACTIVE      = 'ACTIVE',
    INACTIVE    = 'INACTIVE',
    BLOCKED     = 'BLOCKED',
}

registerEnumType(ResourceStatus, {
    name: 'ResourceStatus',
    description: 'Статус объекта (ресурса)',
    valuesConfig: {
        WAITING: { description: 'ОЖИДАНИЕ' },
        ACTIVE: { description: 'АКТИВНО' },
        INACTIVE: { description: 'НЕАКТИВНО' },
        BLOCKED: { description: 'ЗАБЛОКИРОВАНО' },
    },
});
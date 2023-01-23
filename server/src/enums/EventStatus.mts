import { registerEnumType } from 'type-graphql';

export enum EventStatus {
    SCHEDULED   = 'SCHEDULED',
    CANCELLED   = 'CANCELLED',
    CONDUCTED   = 'CONDUCTED',
    BLOCKED     = 'BLOCKED',
}

registerEnumType(EventStatus, {
    name: 'EventStatus',
    description: 'Статус мероприятия',
    valuesConfig: {
        SCHEDULED: { description: 'ЗАПЛАНИРОВАНО' },
        CANCELLED: { description: 'ОТМЕНЕНО' },
        CONDUCTED: { description: 'ПРОВЕДЕНО' },
        BLOCKED: { description: 'ЗАБЛОКИРОВАНО' },
    },
});
import { registerEnumType } from 'type-graphql';

export enum RequestStatus {
    WAITING     = 'WAITING',
    REVISION    = 'REVISION',
    REJECTED    = 'REJECTED',
    ACCEPTED    = 'ACCEPTED',
}

registerEnumType(RequestStatus, {
    name: 'RequestStatus',
    description: 'Статус запроса на добавление тур. продукта',
    valuesConfig: {
        WAITING: { description: 'ОЖИДАНИЕ' },
        REVISION: { description: 'ОТПРАВЛЕНО НА ДОРАБОТКУ' },
        REJECTED: { description: 'ОТКЛОНЕНО' },
        ACCEPTED: { description: 'ПРИНЯТО' },
    },
});
import { registerEnumType } from 'type-graphql';

export enum Role {
    Admin       = 'ADMIN',
    Developer   = 'DEVELOPER',
    Owner       = 'OWNER',
    Client      = 'CLIENT',
    Guide       = 'GUIDE',
}

registerEnumType(Role, {
    name: 'Role',
    description: 'Роль',
    valuesConfig: {
        Admin: { description: 'Администратор' },
        Developer: { description: 'Разработчик' },
        Owner: { description: 'Владелец' },
        Client: { description: 'Клиент' },
        Guide: { description: 'Экскурсовод' },
    },
});
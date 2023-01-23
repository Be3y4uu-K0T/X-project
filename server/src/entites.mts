import type { Ref, DocumentType } from '@typegoose/typegoose';
import { IsInt, Length, MaxLength } from 'class-validator';
import mongoose from 'mongoose';

import {
    prop as Property,
    getModelForClass,
    getDiscriminatorModelForClass,
} from '@typegoose/typegoose';

import {
    InterfaceType,
    FieldResolver,
    ObjectType,
    InputType,
    Mutation,
    Resolver,
    Query,
    Field,
    Float,
    Root,
    Args,
    Arg,
    Int,
    Ctx,
    ID,
} from 'type-graphql';

import {
    EmailAddressScalar,
    PhoneNumberScalar,
    LongitudeScalar,
    LatitudeScalar,
    DateTimeScalar,
    DurationScalar,
    IntervalScalar,
    ObjectIdScalar,
    DateScalar,
    TimeScalar,
    URLScalar,
    DateTime,
    Duration,
    Interval,
    ObjectId,
} from './scalars/scalars.mjs';

import {
    ResourceStatus,
    RequestStatus,
    EventStatus,
    UserType,
    Country,
} from './enums/enums.mjs';

import {
    TouristResource,
} from './unions/unions.mjs';


@ObjectType({ description: 'Вложение' })
export class Attachment {
    @Field()
    readonly _id!: ObjectId;

    @Field({ description: 'Ссылка на вложение' })
    @Property({ required: true})
    url!: string;

    @Field({ description: 'Имя файла вложения', nullable: true })
    @Property()
    filename?: string;

    @Field({ description: 'Тип файла вложения' })
    @Property({ required: true })
    mimetype!: string;

    @Field({ description: 'Размер файла вложения' })
    @Property({ required: true })
    size!: number;

    /* TODO:
    @Field(_type => User, { description: 'Автор загрузки вложения' })
    @Property({ required: true, ref: 'User'})
    author: Ref<User>;
    */
}

@InputType({ description: 'Загружаемое вложение' })
export class AttachmentInput {
    @Field(_type => URLScalar, { description: 'Ссылка на вложение' })
    url!: URL;

    @Field({ description: 'Имя файла вложения', nullable: true })
    @Length(1, 32)
    filename?: string;

    @Field({ description: 'Тип файла вложения' })
    @MaxLength(64)
    mimetype!: string;

    @Field(_type => Int, { description: 'Размер файла вложения' })
    @IsInt()
    size!: number;

    /* TODO:
    @Field(_type => User, { description: 'Автор загрузки вложения' })
    author: Ref<User>;
    */
}

@Resolver(_of => Attachment)
export class AttachmentResolver {
    @Query(_returns => Attachment, { nullable: true })
    async attachment(
        @Arg('id', _type => ObjectIdScalar) id: ObjectId
    ) {
        return await AttachmentModel.findById(id);
    }

    @Query(_returns => Attachment)
    async addAttachment(
        @Arg('input', { validate: true }) input: AttachmentInput
    ) {
        const document = await AttachmentModel.create(input);
        return await document.save();
    }
}

export const AttachmentModel = getModelForClass(Attachment);

@ObjectType({ description: 'Элемент адреса' })
export class AddressElement {
    @Field({ description: 'Вид/Тип' })
    @Property({ required: true })
    type!: string;

    @Field({ description: 'Наименование/Номер' })
    @Property({ required: true })
    designation!: string;
}

@ObjectType({ description: 'Адрес' })
export class Address {
    @Field(_type => Country, { description: 'Страна (наименование)' })
    @Property({ required: true })
    country!: Country;

    @Field({ description: 'Субъект (наименование)' })
    @Property({ required: true })
    subject!: string;

    @Field({ description: 'Городской округ (наименование)' })
    @Property({ required: true })
    district!: string;

    @Field(_type => AddressElement, { description: 'Населенный пункт (вид, наименование)' })
    @Property({ required: true })
    locality!: AddressElement;

    @Field(_type => AddressElement, { description: 'Элемент улично-дорожной сети (вид, наименование)' })
    @Property({ required: true })
    street!: AddressElement;

    @Field(_type => AddressElement, { description: 'Здание/сооружение (тип, номер)' })
    @Property({ required: true })
    building!: AddressElement;

    @Field(_type => AddressElement, { description: 'Здание/сооружение [доп.] (тип, номер)', nullable: true })
    @Property()
    additional?: AddressElement;

    @Field(_type => Int, { description: 'Номер квартири/офиса [доп.]', nullable: true })
    @Property()
    apartament?: number;
}

@ObjectType({ description: 'Геопозиция' })
export class GeoLocation {
    @Field(_type => LatitudeScalar, { description: 'Широта' })
    @Property({ required: true })
    latitude!: number;

    @Field(_type => LongitudeScalar, { description: 'Долгота' })
    @Property({ required: true })
    longitude!: number;
}

@ObjectType({ description: 'Контакные данные' })
export class Contact {
    @Field(_type => Address, { description: 'Адрес', nullable: true })
    @Property()
    address!: Address;

    @Field(_type => GeoLocation, { description: 'Геопозиция (для карты)', nullable: true })
    @Property()
    location!: GeoLocation;

    /* TODO
    @Field(_type => PassportScalar, { description: 'Паспортные данные', nullable: true })
    @Property()
    passport!: string;
    */

    @Field(_type => PhoneNumberScalar, { description: 'Номер контактного телефона', nullable: true })
    @Property()
    phone!: string;

    @Field(_type => EmailAddressScalar, { description: 'Адрес электронной почты', nullable: true })
    @Property()
    email!: string;
}

@ObjectType({ description: 'Рейтинг' })
export class Rating {
    @Field(_type => [Review], { description: 'Отзывы' })
    @Property({ ref: 'Review' })
    reviews!: Ref<Review>[];

    @Field(_type => Float, { description: 'Оценка' })
    @Property({ required: true })
    score!: number;
}

/*
 * Администратор # Admin    (!)
 * Разработчик   # Developer(!)
 * Владелец      # Owner    (!)
 * Клиент        # Client   (!)
 * Никто         # NoBody   (ø) // NotAuth
 * Пользователь  # User     (Admin | Developer | Owner | Client) // Auth
 * Все           # Everyone (AnyBody | NoBody)
*/

@InterfaceType({ description: 'Пользователь' })
export class User {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => DateTimeScalar)
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    created_at!: DateTime;

    @Field(_type => Contact)
    @Property({ required: true })
    contact!: Contact;
}

@Resolver(_of => User)
export class UserResover {
    @Query(_returns => User, { nullable: true })
    async user(
        @Arg('id', _type => ObjectIdScalar) id: ObjectId
    ) {
        return await UserModel.findById(id);
    }
}

export const UserModel = getModelForClass(User);

@ObjectType({ description: 'Администратор', implements: User })
export class Admin extends User {
    /* TODO: Do need extra fields? */
}

export const AdminModel = getDiscriminatorModelForClass(UserModel, Admin, UserType.Admin);

@ObjectType({ description: 'Разработчик', implements: User })
export class Developer extends User {
    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;
}

export const DeveloperModel = getDiscriminatorModelForClass(UserModel, Developer, UserType.Developer);

@ObjectType({ description: 'Владелец', implements: User })
export class Owner extends User {
    @Field({ description: 'Фамилия' })
    @Property({ required: true })
    lastaname!: string;

    @Field({ description: 'Отчество' })
    @Property({ required: true })
    middlename!: string;

    @Field({ description: 'Имя' })
    @Property({ required: true })
    firstname!: string;

    @Field({ description: 'Полное ФИО' })
    @Property({ default: function (this: DocumentType<Guide>) {
        return `${this.lastaname} ${this.firstname} ${this.middlename}`;
    }})
    public fullname?: string;

    @Field(_type => [TouristSite], { description: 'Туристические точки (ресурсы)' })
    @Property({ required: true, ref: 'TouristSite' })
    sites!: Ref<TouristSite>[];

    @Field(_type => [TouristRoute], { description: 'Туристические маршруты (продукты)' })
    @Property({ required: true, ref: 'TouristSite' })
    routes!: Ref<TouristRoute>[];

    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;
}

export const OwnerModel = getDiscriminatorModelForClass(UserModel, Owner, UserType.Owner);


@ObjectType({ description: 'Клиент', implements: User })
export class Client extends User {
    @Field({ description: 'Фамилия', nullable: true })
    @Property()
    lastaname?: string;

    @Field({ description: 'Отчество', nullable: true })
    @Property()
    middlename?: string;

    @Field({ description: 'Имя', nullable: true })
    @Property()
    firstname?: string;

    @Field({ description: 'Полное ФИО' })
    @Property({ default: function (this: DocumentType<Client>) {
        if (this.lastaname && this.firstname && this.middlename)
            return `${this.lastaname} ${this.firstname} ${this.middlename}`;
    }})
    public fullname?: string;

    @Field(_type => DateScalar, { description: 'Дата рождения', nullable: true })
    @Property({ type: mongoose.Schema.Types.DateTimeScalar })
    birthday?: DateTime;
}

export const ClientModel = getDiscriminatorModelForClass(UserModel, Client, UserType.Client);


@ObjectType({ description: 'Экскурсовод', implements: User })
export class Guide extends User {
    @Field({ description: 'Фамилия' })
    @Property({ required: true })
    lastaname!: string;

    @Field({ description: 'Отчество' })
    @Property({ required: true })
    middlename!: string;

    @Field({ description: 'Имя' })
    @Property({ required: true })
    firstname!: string;

    @Field({ description: 'Полное ФИО' })
    @Property({ default: function (this: DocumentType<Guide>) {
        return `${this.lastaname} ${this.firstname} ${this.middlename}`;
    }})
    public fullname?: string;

    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;
}

export const GuideModel = getDiscriminatorModelForClass(UserModel, Guide, UserType.Guide);


@ObjectType({ description: 'Оценка комментария (полезность)' })
export class Usefulness {
    @Field(_type => Int, { description: 'Кол-во отметок "ЗА"' })
    @Property()
    like: number = 0;

    @Field(_type => Int, { description: 'Кол-во отметок "ПРОТИВ"' })
    @Property()
    dislike: number = 0;
}

@ObjectType({ description: 'Отзыв' })
export class Review {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => DateTimeScalar)
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    created_at!: DateTime;

    @Field(_type => DateTimeScalar, { description: 'Временная метка "ИЗМЕНЕННО" (отредактировано)', nullable: true })
    @Property({ type: mongoose.Schema.Types.DateTimeScalar })
    edited_at?: DateTime;

    @Field(_type => Float, { description: 'Оценка' })
    @Property({ required: true })
    score!: number;

    @Field({ description: 'Заголовок', nullable: true })
    @Property()
    title?: string;

    @Field({ description: 'Контент (отзыв)', nullable: true })
    @Property()
    content?: string;

    @Field(_type => User, { description: 'Автор отзыва' })
    @Property({ ref: 'User' })
    author!: Ref<User>;

    @Field(_type => [Attachment], { description: 'Вложения' })
    @Property({ required: true, ref: 'Attachment' })
    attachments!: Ref<Attachment>[];

    @Field(_type => Usefulness)
    @Property({ required: true })
    usefulness!: Usefulness;
}

export const ReviewModel = getModelForClass(Review);

@ObjectType({ description: 'Комментарий' })
export class Comment {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => DateTimeScalar)
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    created_at!: DateTime;

    @Field(_type => DateTimeScalar, { description: 'Временная метка "ИЗМЕНЕННО" (отредактировано)', nullable: true })
    @Property({ type: mongoose.Schema.Types.DateTimeScalar })
    edited_at?: DateTime;

    @Field({ description: 'Контент (комментарий)', nullable: true })
    @Property()
    content?: string;

    @Field(_type => User, { description: 'Автор комментария' })
    @Property({ ref: 'User' })
    author!: Ref<User>;

    @Field(_type => [Attachment], { description: '' })
    @Property({ required: true, ref: 'Attachment' })
    attachments!: Ref<Attachment>[];

    @Field(_type => Int, { description: 'Кол-во отметок "ПОЛЕЗНО"' })
    @Property()
    usefulness: number = 0;

    @Field(_type => [Comment], { description: 'Ответы (комментарие)' })
    @Property({ ref: 'Comment' })
    reply: Ref<Comment>[] = [];
}

export const CommentModel = getModelForClass(Comment);

@ObjectType({ description: 'Время работы' })
export class WorkingHours {
    @Field(_type => TimeScalar, { description: 'Время открытия' })
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    opening!: DateTime;

    @Field(_type => TimeScalar, { description: 'Время закрытия' })
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    closing!: DateTime;
}

@ObjectType({ description: 'Даты работы [для временных «событий»]' })
export class WorkingDays {
    @Field(_type => DateScalar, { description: 'Дата начала' })
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    start!: DateTime;

    @Field(_type => DateScalar, { description: 'Дата окончания' })
    @Property({ required: true, type: mongoose.Schema.Types.DateTimeScalar })
    end!: DateTime;
}

@InterfaceType()
class TouristObject {
    @Field()
    readonly _id!: ObjectId;

    @Property({ required: true })
    __type!: string;
}

@ObjectType({ description: 'Туристический объект (ресурс)' })
export class TouristSite {
    @Field(_type => Owner, { description: 'Владелец' })
    @Property({ required: true, ref: 'Owner' })
    owner!: Ref<Owner>;

    @Field({ description: 'Наименование' })
    @Property({ required: true })
    name!: string;

    @Field({ description: 'Описание', nullable: true })
    @Property()
    description?: string;

    @Field(_type => Contact)
    @Property({ required: true })
    contact!: Contact;

    @Field(_type => WorkingHours, { description: 'Часы работы', nullable: true })
    @Property()
    wokringhours?: WorkingHours;

    @Field(_type => WorkingDays, { description: 'Дата проведения', nullable: true })
    @Property()
    wokringdays?: WorkingDays;

    @Field(_type => [Attachment], { description: 'Вложения' })
    @Property({ required: true, ref: 'Attachment' })
    attachments!: Ref<Attachment>[];

    @Field(_type => DurationScalar, { description: 'Длительность', nullable: true })
    @Property({ type: mongoose.Schema.Types.DurationScalar })
    duration?: Duration;

    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;

    @Field(_type => ResourceStatus, { description: 'Статус объекта (ресурса)' })
    @Property({ enum: RequestStatus })
    status: ResourceStatus = ResourceStatus.WAITING;
}

@ObjectType({ description: 'Туристический маршрут (ресурс)' })
export class TouristRoute {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => Developer, { description: 'Разработчик' })
    @Property({ required: true, ref: 'Developer'})
    developer!: Ref<Developer>;

    @Field({ description: 'Наименование' })
    @Property({ required: true })
    name!: string;

    @Field({ description: 'Описание', nullable: true })
    @Property()
    description?: string;

    @Field(_type => Contact)
    @Property({ required: true })
    contact!: Contact;

    @Field(_type => WorkingHours, { description: 'Часы работы', nullable: true })
    @Property()
    wokringhours?: WorkingHours;

    @Field(_type => WorkingDays, { description: 'Дата проведения' })
    @Property()
    wokringdays?: WorkingDays;

    @Field(_type => [Attachment], { description: 'Вложения' })
    @Property({ required: true, ref: 'Attachment' })
    attachments!: Ref<Attachment>[];

    @Field(_type => [TouristSite], { description: 'уристические точки (ресурсы)' })
    @Property({ required: true, ref: 'TouristSite'})
    sites!: Ref<TouristSite>[];

    @Field(_type => Float, { description: 'Расстояние (в километрах, с точностью до 3 знаков)' })
    @Property()
    distance?: number;

    @Field(_type => DurationScalar, { description: 'Длительность', nullable: true })
    @Property({ type: mongoose.Schema.Types.DurationScalar })
    duration?: Duration;

    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;

    @Field(_type => Int, { description: 'Продаваемость' })
    @Property() // TODO: Roles || Owner
    marketability: number = 0;

    @Field(_type => ResourceStatus, { description: 'Статус объекта (ресурса)' })
    @Property({ enum: RequestStatus })
    status: ResourceStatus = ResourceStatus.WAITING;
}

@ObjectType({ description: 'Туристическое мероприятие (продукт)' })
export class TouristEvent {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => Developer, { description: 'Разработчик' })
    @Property({ required: true, ref: 'Developer'})
    developer!: Ref<Developer>;

    @Field({ description: 'Наименование' })
    @Property({ required: true })
    name!: string;

    @Field({ description: 'Описание', nullable: true })
    @Property()
    description?: string;

    @Field(_type => Contact)
    @Property({ required: true })
    contact!: Contact;

    @Field(_type => TouristRoute, { description: 'Туристический маршрут (ресурс)' })
    @Property({ ref: 'TouristRoute' })
    route!: Ref<TouristRoute>;

    @Field(_type => Guide, { description: 'Экскурсовод' })
    @Property({ ref: 'Guide' })
    guide!: Ref<Guide>;

    @Field(_type => WorkingHours, { description: 'Часы работы' })
    @Property({ required: true })
    wokringhours!: WorkingHours;

    @Field(_type => WorkingDays, { description: 'Дата проведения' })
    @Property({ required: true })
    wokringdays!: WorkingDays;

    @Field(_type => [Attachment], { description: 'Вложения' })
    @Property({ required: true, ref: 'Attachment' })
    attachments!: Ref<Attachment>[];

    @Field(_type => [Comment], { description: 'Комментарии' })
    @Property({ required: true, ref: 'Comment' })
    comments!: Ref<Comment>[];

    @Field(_type => Rating, { description: 'Рейтинг' })
    @Property({ required: true })
    rating!: Rating;

    @Field(_type => ResourceStatus, { description: 'Статус мероприятия' })
    @Property({ enum: RequestStatus })
    status: ResourceStatus = ResourceStatus.WAITING;
}

@ObjectType({ description: 'Ресурс запроса' })
export class RequestAttachment {
    @Field(_type => TouristResource, { description: 'Прикрепленный ресурс' })
    @Property({ required: true, ref: typeof TouristResource })
    resource!: Ref<typeof TouristResource>;

    @Field(_type => RequestStatus, { description: 'Статус ресурса запроса' })
    @Property({ enum: RequestStatus })
    status!: RequestStatus;

    @Field({ description: 'Замечания', nullable: true })
    @Property()
    remark?: string;
}

@ObjectType({ description: 'Запрос на добавление ресурса' })
export class ResourceRequest {
    @Field()
    readonly _id!: ObjectId;

    @Field(_type => [RequestAttachment], { description: 'История ресурса' })
    @Property({ required: true, type: () => [RequestAttachment], default: [] })
    resources!: mongoose.Types.Array<RequestAttachment>;

    @Field(_type => RequestAttachment, { description: 'Текущая/последняя версия ресурса' })
    @Property({ required: true })
    resource!: RequestAttachment;
}

export const ResourceRequestModel = getModelForClass(ResourceRequest);

export const resolvers = [
    AttachmentResolver,
    UserResover,
];
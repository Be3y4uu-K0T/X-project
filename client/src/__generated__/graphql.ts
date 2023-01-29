/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO-8601 encoded date string. */
  Date: any;
  /** An ISO-8601 encoded datetime string. */
  DateTime: any;
  /** An ISO 8601 encoded duration string. */
  Duration: any;
  /** A RFC 1123 encoded email address string. */
  EmailAddress: any;
  /** An ISO 8601 encoded interval string. */
  Interval: any;
  /** A decimal degrees latitude number. */
  Latitude: any;
  /** A decimal degrees latitude number. */
  Longitude: any;
  /** Mongodb object id scalar type */
  ObjectId: any;
  /** A phone number of standard E.164 (example:: +17895551234). */
  PhoneNumber: any;
  /** An ISO-8601 encoded time string. */
  Time: any;
  /** A URL string is specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
};

/** Адрес */
export type Address = {
  __typename?: 'Address';
  /** Здание/сооружение [доп.] (тип, номер) */
  additional?: Maybe<AddressElement>;
  /** Номер квартири/офиса [доп.] */
  apartament?: Maybe<Scalars['Int']>;
  /** Здание/сооружение (тип, номер) */
  building: AddressElement;
  /** Страна (наименование) */
  country: Country;
  /** Городской округ (наименование) */
  district: Scalars['String'];
  /** Населенный пункт (вид, наименование) */
  locality: AddressElement;
  /** Элемент улично-дорожной сети (вид, наименование) */
  street: AddressElement;
  /** Субъект (наименование) */
  subject: Scalars['String'];
};

/** Элемент адреса */
export type AddressElement = {
  __typename?: 'AddressElement';
  /** Наименование/Номер */
  designation: Scalars['String'];
  /** Вид/Тип */
  type: Scalars['String'];
};

/** Элемент адреса */
export type AddressElementInput = {
  /** Наименование/Номер */
  designation: Scalars['String'];
  /** Вид/Тип */
  type: Scalars['String'];
};

/** Адрес */
export type AddressInput = {
  /** Здание/сооружение [доп.] (тип, номер) */
  additional?: InputMaybe<AddressElementInput>;
  /** Номер квартири/офиса [доп.] */
  apartament?: InputMaybe<Scalars['Int']>;
  /** Здание/сооружение (тип, номер) */
  building: AddressElementInput;
  /** Страна (наименование) */
  country: Country;
  /** Городской округ (наименование) */
  district: Scalars['String'];
  /** Населенный пункт (вид, наименование) */
  locality: AddressElementInput;
  /** Элемент улично-дорожной сети (вид, наименование) */
  street: AddressElementInput;
  /** Субъект (наименование) */
  subject: Scalars['String'];
};

/** Администратор */
export type Admin = User & {
  __typename?: 'Admin';
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
};

/** Вложение */
export type Attachment = {
  __typename?: 'Attachment';
  _id: Scalars['ObjectId'];
  /** Имя файла вложения */
  filename?: Maybe<Scalars['String']>;
  /** Тип файла вложения */
  mimetype: Scalars['String'];
  /** Размер файла вложения */
  size: Scalars['Float'];
  /** Ссылка на вложение */
  url: Scalars['String'];
};

/** Загружаемое вложение */
export type AttachmentInput = {
  /** Имя файла вложения */
  filename?: InputMaybe<Scalars['String']>;
  /** Тип файла вложения */
  mimetype: Scalars['String'];
  /** Размер файла вложения */
  size: Scalars['Int'];
  /** Ссылка на вложение */
  url: Scalars['URL'];
};

/** Клиент */
export type Client = User & {
  __typename?: 'Client';
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Дата рождения */
  birthday?: Maybe<Scalars['Date']>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
  /** Имя */
  firstname?: Maybe<Scalars['String']>;
  /** Полное ФИО */
  fullname?: Maybe<Scalars['String']>;
  /** Фамилия */
  lastaname?: Maybe<Scalars['String']>;
  /** Отчество */
  middlename?: Maybe<Scalars['String']>;
};

/** Комментарий */
export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ObjectId'];
  attachments: Array<Attachment>;
  /** Автор комментария */
  author: User;
  /** Контент (комментарий) */
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  /** Временная метка "ИЗМЕНЕННО" (отредактировано) */
  edited_at?: Maybe<Scalars['DateTime']>;
  /** Ответы (комментарие) */
  replies: Array<Comment>;
  /** Оригинальный комментарий */
  reply_to?: Maybe<Comment>;
  /** Кол-во отметок "ПОЛЕЗНО" */
  usefulness: Scalars['Int'];
};

/** Контакные данные */
export type Contact = {
  __typename?: 'Contact';
  /** Адрес */
  address?: Maybe<Address>;
  /** Адрес контакной электронной почты */
  email?: Maybe<Scalars['EmailAddress']>;
  /** Геопозиция (для карты) */
  location?: Maybe<GeoLocation>;
  /** Номер контактного телефона */
  phone?: Maybe<Scalars['PhoneNumber']>;
};

export type ContactInput = {
  /** Адрес */
  address?: InputMaybe<AddressInput>;
  /** Адрес контакной электронной почты */
  email?: InputMaybe<Scalars['EmailAddress']>;
  /** Геопозиция (для карты) */
  location?: InputMaybe<GeoLocationInput>;
  /** Номер контактного телефона */
  phone?: InputMaybe<Scalars['PhoneNumber']>;
};

/** An ISO 3166 Country regional code. */
export enum Country {
  Afghanistan = 'Afghanistan',
  AlandIslands = 'AlandIslands',
  Albania = 'Albania',
  Algeria = 'Algeria',
  AmericanSamoa = 'AmericanSamoa',
  Andorra = 'Andorra',
  Angola = 'Angola',
  Anguilla = 'Anguilla',
  Antarctica = 'Antarctica',
  AntiguaAndBarbuda = 'AntiguaAndBarbuda',
  Argentina = 'Argentina',
  Armenia = 'Armenia',
  Aruba = 'Aruba',
  Australia = 'Australia',
  Austria = 'Austria',
  Azerbaijan = 'Azerbaijan',
  Bahamas = 'Bahamas',
  Bahrain = 'Bahrain',
  Bangladesh = 'Bangladesh',
  Barbados = 'Barbados',
  Belarus = 'Belarus',
  Belgium = 'Belgium',
  Belize = 'Belize',
  Benin = 'Benin',
  Bermuda = 'Bermuda',
  Bhutan = 'Bhutan',
  Bolivia = 'Bolivia',
  BonaireSintEustatiusSaba = 'BonaireSintEustatiusSaba',
  BosniaAndHerzegovina = 'BosniaAndHerzegovina',
  Botswana = 'Botswana',
  BouvetIsland = 'BouvetIsland',
  Brazil = 'Brazil',
  BritishIndianOceanTerritory = 'BritishIndianOceanTerritory',
  BruneiDarussalam = 'BruneiDarussalam',
  Bulgaria = 'Bulgaria',
  BurkinaFaso = 'BurkinaFaso',
  Burundi = 'Burundi',
  Cambodia = 'Cambodia',
  Cameroon = 'Cameroon',
  Canada = 'Canada',
  CapeVerde = 'CapeVerde',
  CaymanIslands = 'CaymanIslands',
  CentralAfricanRepublic = 'CentralAfricanRepublic',
  Chad = 'Chad',
  Chile = 'Chile',
  China = 'China',
  ChristmasIsland = 'ChristmasIsland',
  CocosKeelingIslands = 'CocosKeelingIslands',
  Colombia = 'Colombia',
  Comoros = 'Comoros',
  Congo = 'Congo',
  CongoDemocraticRepublic = 'CongoDemocraticRepublic',
  CookIslands = 'CookIslands',
  CostaRica = 'CostaRica',
  CoteDIvoire = 'CoteDIvoire',
  Croatia = 'Croatia',
  Cuba = 'Cuba',
  Curacao = 'Curacao',
  Cyprus = 'Cyprus',
  CzechRepublic = 'CzechRepublic',
  Denmark = 'Denmark',
  Djibouti = 'Djibouti',
  Dominica = 'Dominica',
  DominicanRepublic = 'DominicanRepublic',
  Ecuador = 'Ecuador',
  Egypt = 'Egypt',
  ElSalvador = 'ElSalvador',
  EquatorialGuinea = 'EquatorialGuinea',
  Eritrea = 'Eritrea',
  Estonia = 'Estonia',
  Ethiopia = 'Ethiopia',
  FalklandIslands = 'FalklandIslands',
  FaroeIslands = 'FaroeIslands',
  Fiji = 'Fiji',
  Finland = 'Finland',
  France = 'France',
  FrenchGuiana = 'FrenchGuiana',
  FrenchPolynesia = 'FrenchPolynesia',
  FrenchSouthernTerritories = 'FrenchSouthernTerritories',
  Gabon = 'Gabon',
  Gambia = 'Gambia',
  Georgia = 'Georgia',
  Germany = 'Germany',
  Ghana = 'Ghana',
  Gibraltar = 'Gibraltar',
  Greece = 'Greece',
  Greenland = 'Greenland',
  Grenada = 'Grenada',
  Guadeloupe = 'Guadeloupe',
  Guam = 'Guam',
  Guatemala = 'Guatemala',
  Guernsey = 'Guernsey',
  Guinea = 'Guinea',
  GuineaBissau = 'GuineaBissau',
  Guyana = 'Guyana',
  Haiti = 'Haiti',
  HeardIslandMcdonaldIslands = 'HeardIslandMcdonaldIslands',
  HolySeeVaticanCityState = 'HolySeeVaticanCityState',
  Honduras = 'Honduras',
  HongKong = 'HongKong',
  Hungary = 'Hungary',
  Iceland = 'Iceland',
  India = 'India',
  Indonesia = 'Indonesia',
  Iran = 'Iran',
  Iraq = 'Iraq',
  Ireland = 'Ireland',
  IsleOfMan = 'IsleOfMan',
  Israel = 'Israel',
  Italy = 'Italy',
  Jamaica = 'Jamaica',
  Japan = 'Japan',
  Jersey = 'Jersey',
  Jordan = 'Jordan',
  Kazakhstan = 'Kazakhstan',
  Kenya = 'Kenya',
  Kiribati = 'Kiribati',
  Korea = 'Korea',
  KoreaDemocraticPeoplesRepublic = 'KoreaDemocraticPeoplesRepublic',
  Kuwait = 'Kuwait',
  Kyrgyzstan = 'Kyrgyzstan',
  LaoPeoplesDemocraticRepublic = 'LaoPeoplesDemocraticRepublic',
  Latvia = 'Latvia',
  Lebanon = 'Lebanon',
  Lesotho = 'Lesotho',
  Liberia = 'Liberia',
  LibyanArabJamahiriya = 'LibyanArabJamahiriya',
  Liechtenstein = 'Liechtenstein',
  Lithuania = 'Lithuania',
  Luxembourg = 'Luxembourg',
  Macao = 'Macao',
  Macedonia = 'Macedonia',
  Madagascar = 'Madagascar',
  Malawi = 'Malawi',
  Malaysia = 'Malaysia',
  Maldives = 'Maldives',
  Mali = 'Mali',
  Malta = 'Malta',
  MarshallIslands = 'MarshallIslands',
  Martinique = 'Martinique',
  Mauritania = 'Mauritania',
  Mauritius = 'Mauritius',
  Mayotte = 'Mayotte',
  Mexico = 'Mexico',
  Micronesia = 'Micronesia',
  Moldova = 'Moldova',
  Monaco = 'Monaco',
  Mongolia = 'Mongolia',
  Montenegro = 'Montenegro',
  Montserrat = 'Montserrat',
  Morocco = 'Morocco',
  Mozambique = 'Mozambique',
  Myanmar = 'Myanmar',
  Namibia = 'Namibia',
  Nauru = 'Nauru',
  Nepal = 'Nepal',
  Netherlands = 'Netherlands',
  NewCaledonia = 'NewCaledonia',
  NewZealand = 'NewZealand',
  Nicaragua = 'Nicaragua',
  Niger = 'Niger',
  Nigeria = 'Nigeria',
  Niue = 'Niue',
  NorfolkIsland = 'NorfolkIsland',
  NorthernMarianaIslands = 'NorthernMarianaIslands',
  Norway = 'Norway',
  Oman = 'Oman',
  Pakistan = 'Pakistan',
  Palau = 'Palau',
  PalestinianTerritory = 'PalestinianTerritory',
  Panama = 'Panama',
  PapuaNewGuinea = 'PapuaNewGuinea',
  Paraguay = 'Paraguay',
  Peru = 'Peru',
  Philippines = 'Philippines',
  Pitcairn = 'Pitcairn',
  Poland = 'Poland',
  Portugal = 'Portugal',
  PuertoRico = 'PuertoRico',
  Qatar = 'Qatar',
  Reunion = 'Reunion',
  Romania = 'Romania',
  RussianFederation = 'RussianFederation',
  Rwanda = 'Rwanda',
  SaintBarthelemy = 'SaintBarthelemy',
  SaintHelena = 'SaintHelena',
  SaintKittsAndNevis = 'SaintKittsAndNevis',
  SaintLucia = 'SaintLucia',
  SaintMartin = 'SaintMartin',
  SaintPierreAndMiquelon = 'SaintPierreAndMiquelon',
  SaintVincentAndGrenadines = 'SaintVincentAndGrenadines',
  Samoa = 'Samoa',
  SanMarino = 'SanMarino',
  SaoTomeAndPrincipe = 'SaoTomeAndPrincipe',
  SaudiArabia = 'SaudiArabia',
  Senegal = 'Senegal',
  Serbia = 'Serbia',
  Seychelles = 'Seychelles',
  SierraLeone = 'SierraLeone',
  Singapore = 'Singapore',
  SintMaarten = 'SintMaarten',
  Slovakia = 'Slovakia',
  Slovenia = 'Slovenia',
  SolomonIslands = 'SolomonIslands',
  Somalia = 'Somalia',
  SouthAfrica = 'SouthAfrica',
  SouthGeorgiaAndSandwichIsl = 'SouthGeorgiaAndSandwichIsl',
  SouthSudan = 'SouthSudan',
  Spain = 'Spain',
  SriLanka = 'SriLanka',
  Sudan = 'Sudan',
  Suriname = 'Suriname',
  SvalbardAndJanMayen = 'SvalbardAndJanMayen',
  Swaziland = 'Swaziland',
  Sweden = 'Sweden',
  Switzerland = 'Switzerland',
  SyrianArabRepublic = 'SyrianArabRepublic',
  Taiwan = 'Taiwan',
  Tajikistan = 'Tajikistan',
  Tanzania = 'Tanzania',
  Thailand = 'Thailand',
  TimorLeste = 'TimorLeste',
  Togo = 'Togo',
  Tokelau = 'Tokelau',
  Tonga = 'Tonga',
  TrinidadAndTobago = 'TrinidadAndTobago',
  Tunisia = 'Tunisia',
  Turkey = 'Turkey',
  Turkmenistan = 'Turkmenistan',
  TurksAndCaicosIslands = 'TurksAndCaicosIslands',
  Tuvalu = 'Tuvalu',
  Uganda = 'Uganda',
  Ukraine = 'Ukraine',
  UnitedArabEmirates = 'UnitedArabEmirates',
  UnitedKingdom = 'UnitedKingdom',
  UnitedStates = 'UnitedStates',
  UnitedStatesOutlyingIslands = 'UnitedStatesOutlyingIslands',
  Uruguay = 'Uruguay',
  Uzbekistan = 'Uzbekistan',
  Vanuatu = 'Vanuatu',
  Venezuela = 'Venezuela',
  Vietnam = 'Vietnam',
  VirginIslandsBritish = 'VirginIslandsBritish',
  VirginIslandsUs = 'VirginIslandsUS',
  WallisAndFutuna = 'WallisAndFutuna',
  WesternSahara = 'WesternSahara',
  Yemen = 'Yemen',
  Zambia = 'Zambia',
  Zimbabwe = 'Zimbabwe'
}

/** Разработчик */
export type Developer = User & {
  __typename?: 'Developer';
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
  /** Туристические мероприятие */
  events: Array<TouristEvent>;
  /** Имя */
  firstname: Scalars['String'];
  /** Полное ФИО */
  fullname?: Maybe<Scalars['String']>;
  /** Фамилия */
  lastaname: Scalars['String'];
  /** Отчество */
  middlename: Scalars['String'];
  /** Рейтинг */
  rating: Rating;
};

/** Статус мероприятия */
export enum EventStatus {
  /** ЗАБЛОКИРОВАНО */
  Blocked = 'BLOCKED',
  /** ОТМЕНЕНО */
  Cancelled = 'CANCELLED',
  /** ПРОВЕДЕНО */
  Conducted = 'CONDUCTED',
  /** ЗАПЛАНИРОВАНО */
  Scheduled = 'SCHEDULED'
}

/** Геопозиция */
export type GeoLocation = {
  __typename?: 'GeoLocation';
  /** Широта */
  latitude: Scalars['Latitude'];
  /** Долгота */
  longitude: Scalars['Longitude'];
};

/** Геопозиция */
export type GeoLocationInput = {
  /** Широта */
  latitude: Scalars['Latitude'];
  /** Долгота */
  longitude: Scalars['Longitude'];
};

/** Экскурсовод */
export type Guide = User & {
  __typename?: 'Guide';
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
  /** Имя */
  firstname: Scalars['String'];
  /** Полное ФИО */
  fullname: Scalars['String'];
  /** Фамилия */
  lastaname: Scalars['String'];
  /** Отчество */
  middlename: Scalars['String'];
  /** Рейтинг */
  rating: Rating;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Вход */
  signin: Session;
  /** Регистрация (как клиент) */
  signup_as_client?: Maybe<Client>;
  /** Регистрация (как разработчика) */
  signup_as_developer?: Maybe<Developer>;
};


export type MutationSigninArgs = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};


export type MutationSignup_As_ClientArgs = {
  avatar?: InputMaybe<AttachmentInput>;
  birthday?: InputMaybe<Scalars['Date']>;
  contact?: InputMaybe<ContactInput>;
  email: Scalars['EmailAddress'];
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  lastaname?: InputMaybe<Scalars['String']>;
  middlename?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};


export type MutationSignup_As_DeveloperArgs = {
  avatar?: InputMaybe<AttachmentInput>;
  birthday?: InputMaybe<Scalars['Date']>;
  contact?: InputMaybe<ContactInput>;
  email: Scalars['EmailAddress'];
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  lastaname?: InputMaybe<Scalars['String']>;
  middlename?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

/** Владелец */
export type Owner = User & {
  __typename?: 'Owner';
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
  /** Имя */
  firstname: Scalars['String'];
  /** Полное ФИО */
  fullname: Scalars['String'];
  /** Фамилия */
  lastaname: Scalars['String'];
  /** Отчество */
  middlename: Scalars['String'];
  /** Рейтинг */
  rating: Rating;
  /** Туристические маршруты (продукты) */
  routes: Array<TouristRoute>;
  /** Туристические точки (ресурсы) */
  sites: Array<TouristSite>;
};

export type Query = {
  __typename?: 'Query';
  addAttachment: Attachment;
  attachment?: Maybe<Attachment>;
  tourist_event?: Maybe<TouristEvent>;
  tourist_events: Array<TouristEvent>;
  tourist_route?: Maybe<TouristRoute>;
  tourist_routes: Array<TouristRoute>;
  tourist_sites: Array<TouristSite>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAddAttachmentArgs = {
  input: AttachmentInput;
};


export type QueryAttachmentArgs = {
  id: Scalars['ObjectId'];
};


export type QueryTourist_EventArgs = {
  id: Scalars['ObjectId'];
};


export type QueryTourist_EventsArgs = {
  after_id?: InputMaybe<Scalars['ObjectId']>;
  before_id?: InputMaybe<Scalars['ObjectId']>;
  page?: Scalars['Int'];
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryTourist_RouteArgs = {
  id: Scalars['ObjectId'];
};


export type QueryTourist_RoutesArgs = {
  after_id?: InputMaybe<Scalars['ObjectId']>;
  before_id?: InputMaybe<Scalars['ObjectId']>;
  page?: Scalars['Int'];
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryTourist_SitesArgs = {
  after_id?: InputMaybe<Scalars['ObjectId']>;
  before_id?: InputMaybe<Scalars['ObjectId']>;
  page?: Scalars['Int'];
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['ObjectId'];
};


export type QueryUsersArgs = {
  after_id?: InputMaybe<Scalars['ObjectId']>;
  before_id?: InputMaybe<Scalars['ObjectId']>;
  page?: Scalars['Int'];
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};

/** Рейтинг */
export type Rating = {
  __typename?: 'Rating';
  /** Отзывы */
  reviews: Array<Review>;
  /** Оценка */
  score: Scalars['Float'];
};

/** Статус объекта (ресурса) */
export enum ResourceStatus {
  /** АКТИВНО */
  Active = 'ACTIVE',
  /** ЗАБЛОКИРОВАНО */
  Blocked = 'BLOCKED',
  /** НЕАКТИВНО */
  Inactive = 'INACTIVE',
  /** ОЖИДАНИЕ */
  Waiting = 'WAITING'
}

/** Отзыв */
export type Review = {
  __typename?: 'Review';
  _id: Scalars['ObjectId'];
  /** Вложения */
  attachments: Array<Attachment>;
  /** Автор отзыва */
  author: User;
  /** Контент (отзыв) */
  content?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  /** Временная метка "ИЗМЕНЕННО" (отредактировано) */
  edited_at?: Maybe<Scalars['DateTime']>;
  /** Оценка */
  score: Scalars['Float'];
  /** Заголовок */
  title?: Maybe<Scalars['String']>;
  usefulness: Usefulness;
};

/** Сеанс */
export type Session = {
  __typename?: 'Session';
  /** Идентификатор сеанса */
  sessionId: Scalars['String'];
  /** JWT токены */
  tokens: Tokens;
};

/** JWT токены */
export type Tokens = {
  __typename?: 'Tokens';
  /** Токен доступа */
  accessToken: Scalars['String'];
  /** Токен обновления */
  refreshToken: Scalars['String'];
};

/** Туристическое мероприятие (продукт) */
export type TouristEvent = {
  __typename?: 'TouristEvent';
  _id: Scalars['ObjectId'];
  /** Вложения */
  attachments: Array<Attachment>;
  /** Комментарии */
  comments: Array<Comment>;
  contact: Contact;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Разработчик */
  developer: Developer;
  /** Экскурсовод */
  guide: Guide;
  /** Наименование */
  name: Scalars['String'];
  /** Цена */
  price?: Maybe<Scalars['Float']>;
  /** Рейтинг */
  rating: Rating;
  /** Туристический маршрут (ресурс) */
  route: TouristRoute;
  /** Статус мероприятия */
  status: EventStatus;
  /** Дата и время проведения */
  timing: Scalars['Interval'];
};

/** Туристический маршрут (ресурс) */
export type TouristRoute = {
  __typename?: 'TouristRoute';
  _id: Scalars['ObjectId'];
  /** Вложения */
  attachments: Array<Attachment>;
  contact: Contact;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Разработчик */
  developer: Developer;
  /** Расстояние (в километрах, с точностью до 3 знаков) */
  distance: Scalars['Float'];
  /** Длительность */
  duration?: Maybe<Scalars['Duration']>;
  /** Продаваемость */
  marketability: Scalars['Int'];
  /** Наименование */
  name: Scalars['String'];
  /** Рейтинг */
  rating: Rating;
  /** уристические точки (ресурсы) */
  sites: Array<TouristSite>;
  /** Статус объекта (ресурса) */
  status: ResourceStatus;
  /** Дата проведения */
  wokringdays: WorkingDays;
  /** Часы работы */
  wokringhours?: Maybe<WorkingHours>;
};

/** Туристический объект (ресурс) */
export type TouristSite = {
  __typename?: 'TouristSite';
  /** Вложения */
  attachments: Array<Attachment>;
  contact: Contact;
  /** Описание */
  description?: Maybe<Scalars['String']>;
  /** Длительность */
  duration?: Maybe<Scalars['Duration']>;
  /** Наименование */
  name: Scalars['String'];
  /** Владелец */
  owner: Owner;
  /** Рейтинг */
  rating: Rating;
  /** Статус объекта (ресурса) */
  status: ResourceStatus;
  /** Дата проведения */
  wokringdays?: Maybe<WorkingDays>;
  /** Часы работы */
  wokringhours?: Maybe<WorkingHours>;
};

/** Оценка комментария (полезность) */
export type Usefulness = {
  __typename?: 'Usefulness';
  /** Кол-во отметок "ПРОТИВ" */
  downvotes: Scalars['Int'];
  /** Кол-во отметок "ЗА" */
  upvotes: Scalars['Int'];
};

/** Пользователь */
export type User = {
  _id: Scalars['ObjectId'];
  /** Изображение профиля */
  avatar?: Maybe<Attachment>;
  /** Контакные данные */
  contact: Contact;
  created_at: Scalars['DateTime'];
  /** Адрес электронной почты */
  email: Scalars['EmailAddress'];
};

/** Даты работы [для временных «событий»] */
export type WorkingDays = {
  __typename?: 'WorkingDays';
  /** Дата окончания */
  end: Scalars['Date'];
  /** Дата начала */
  start: Scalars['Date'];
};

/** Время работы */
export type WorkingHours = {
  __typename?: 'WorkingHours';
  /** Время закрытия */
  closing: Scalars['Time'];
  /** Время открытия */
  opening: Scalars['Time'];
};

export type GetEventsQueryVariables = Exact<{
  take: Scalars['Int'];
  page: Scalars['Int'];
}>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'TouristEvent', _id: any, name: string, description?: string | null, timing: any, price?: number | null, rating: { __typename?: 'Rating', score: number }, guide: { __typename?: 'Guide', _id: any, fullname: string, avatar?: { __typename?: 'Attachment', _id: any, url: string, mimetype: string } | null, rating: { __typename?: 'Rating', score: number } } }> };

export type SignUpAsClientMutationVariables = Exact<{
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
}>;


export type SignUpAsClientMutation = { __typename?: 'Mutation', signup_as_client?: { __typename?: 'Client', _id: any, created_at: any, email: any, lastaname?: string | null, middlename?: string | null, firstname?: string | null, fullname?: string | null, birthday?: any | null, avatar?: { __typename?: 'Attachment', _id: any, url: string, filename?: string | null, mimetype: string, size: number } | null, contact: { __typename?: 'Contact', phone?: any | null, email?: any | null, address?: { __typename?: 'Address', country: Country, subject: string, district: string, apartament?: number | null, locality: { __typename?: 'AddressElement', type: string, designation: string }, street: { __typename?: 'AddressElement', type: string, designation: string }, building: { __typename?: 'AddressElement', type: string, designation: string }, additional?: { __typename?: 'AddressElement', type: string, designation: string } | null } | null, location?: { __typename?: 'GeoLocation', latitude: any, longitude: any } | null } } | null };


export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"events"},"name":{"kind":"Name","value":"tourist_events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"guide"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timing"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const SignUpAsClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpAsClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailAddress"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup_as_client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"district"}},{"kind":"Field","name":{"kind":"Name","value":"locality"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"street"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"building"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"additional"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"apartament"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastaname"}},{"kind":"Field","name":{"kind":"Name","value":"middlename"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}}]}}]} as unknown as DocumentNode<SignUpAsClientMutation, SignUpAsClientMutationVariables>;
import { prop as Property, getModelForClass as createModelFrom } from '@typegoose/typegoose';
import { GraphQLScalarType, ValueNode, Kind, GraphQLError } from 'graphql';
import { ScalarsTypeMap } from 'type-graphql/dist/schema/build-context';
import { DateTime, Interval, Duration } from 'luxon';
import { ObjectId } from 'mongodb';
import {
    registerEnumType,
    createUnionType,
    FieldResolver,
    buildSchema,
    ObjectType,
    InputType,
    Mutation,
    Resolver,
    Query,
    Field,
    Root,
    Arg,
    Ctx,
    ID,
    Args,
    Int
} from 'type-graphql';
import { IsInt, Length, MaxLength } from 'class-validator';

/* SCALARS */

export const ObjectIdScalar = new GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongodb object id scalar type',
    serialize(value: unknown): string {
        if (value instanceof ObjectId)
            return value.toHexString();
        throw new GraphQLError(`Value is not a valid mongodb ObjectId: ${value}`);
    },
    parseValue(value: unknown): ObjectId {
        if (typeof value === 'string')
            return new ObjectId(value);
        throw new GraphQLError(`Value is not a valid mongodb ObjectId: ${value}`);
    },
    parseLiteral(ast: ValueNode): ObjectId {
        if (ast.kind === Kind.STRING)
            return new ObjectId(ast.value);
        throw new GraphQLError(`Can only validate strings as ObjectId but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'An ISO-8601 encoded datetime string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid DateTime: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for DateTime: ${value}`);
    },
    parseLiteral(ast: ValueNode): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as DateTime but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'An ISO-8601 encoded date string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISODate();
        throw new GraphQLError(`Value is not a valid DateTime for Date: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Date: ${value}`);
    },
    parseLiteral(ast: ValueNode): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Date but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const TimeScalar = new GraphQLScalarType({
    name: 'Time',
    description: 'An ISO-8601 encoded time string.',
    serialize(value: unknown): string {
        if (value instanceof DateTime)
            return value.toISOTime();
        throw new GraphQLError(`Value is not a valid DateTime for Time: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            return DateTime.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Time: ${value}`);
    },
    parseLiteral(ast: ValueNode): DateTime {
        if (ast.kind === Kind.STRING)
            return DateTime.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Time but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const IntervalScalar = new GraphQLScalarType({
    name: 'Interval',
    description: 'An ISO 8601 encoded interval string.',
    serialize(value: unknown): string {
        if (value instanceof Interval)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid Interval: ${value}`);
    },
    parseValue(value: unknown): Interval {
        if (typeof value === 'string')
            return Interval.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Interval: ${value}`);
    },
    parseLiteral(ast: ValueNode): Interval {
        if (ast.kind === Kind.STRING)
            return Interval.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Interval but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const DurationScalar = new GraphQLScalarType({
    name: 'Duration',
    description: 'An ISO 8601 encoded duration string.',
    serialize(value: unknown): string {
        if (value instanceof Duration)
            return value.toISO();
        throw new GraphQLError(`Value is not a valid Duration: ${value}`);
    },
    parseValue(value: unknown): Duration {
        if (typeof value === 'string')
            return Duration.fromISO(value);
        throw new GraphQLError(`Value is not a valid string for Duration: ${value}`);
    },
    parseLiteral(ast: ValueNode): Duration {
        if (ast.kind === Kind.STRING)
            return Duration.fromISO(ast.value);
        throw new GraphQLError(`Can only validate strings as Duration but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const TimestampScalar = new GraphQLScalarType({
    name: 'Timestamp',
    description: 'Integer of milliseconds from start of UNIX epoch.',
    serialize(value: unknown): number {
        if (value instanceof DateTime)
            return value.valueOf();
        throw new GraphQLError(`Value is not a valid DateTime: ${value}`);
    },
    parseValue(value: unknown): DateTime {
        if (typeof value === 'string')
            value = Number.parseInt(value, 10);
        if (typeof value === 'number')
            return DateTime.fromMillis(value);
        throw new GraphQLError(`Value is not a valid string or number for DateTime: ${value}`);
    },
    parseLiteral(ast: ValueNode): DateTime {
        if (ast.kind === Kind.INT)
            return DateTime.fromMillis(Number.parseInt(ast.value, 10));
        throw new GraphQLError(`Can only validate integers as Duration but got a: ${ast.kind}`, { nodes: ast });
    },
});

const EMAIL_ADDRESS_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const EmailScalar = new GraphQLScalarType({
    name: 'Email',
    description: 'A RFC 1123 encoded email address string.',
    serialize(value: unknown): string {
        if (typeof value === 'string' && EMAIL_ADDRESS_REGEXP.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid email address: ${value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string' && EMAIL_ADDRESS_REGEXP.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid email address: ${value}`);
    },
    parseLiteral(ast: ValueNode): string {
        if (ast.kind === Kind.STRING && EMAIL_ADDRESS_REGEXP.test(ast.value))
            return ast.value;
        throw new GraphQLError(`Can only validate strings as email addresses but got a: ${ast.kind}`, { nodes: ast });
    },
});

const PHONE_NUMBER_REGEX = /^\+[1-9]\d{6,14}$/;

export const PhoneNumberScalar = new GraphQLScalarType({
    name: 'PhoneNumber',
    description: 'A phone number of standard E.164 (example:: +17895551234).',
    serialize(value: unknown): string {
        if (typeof value === 'string' && PHONE_NUMBER_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid phone number: ${value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string' && PHONE_NUMBER_REGEX.test(value))
            return value;
        throw new GraphQLError(`Value is not a valid phone number: ${value}`);
    },
    parseLiteral(ast: ValueNode): string {
        if (ast.kind === Kind.STRING && PHONE_NUMBER_REGEX.test(ast.value))
            return ast.value;
        throw new GraphQLError(`Can only validate strings as phone numberes but got a: ${ast.kind}`, { nodes: ast });
    },
});

// See https://en.wikipedia.org/wiki/Decimal_degrees#Precision
const MAX_PRECISION = 8;

// Minimum latitude
const MIN_LATITUDE = -90.0;
// Maximum latitude
const MAX_LATITUDE = +90.0;

export const LatitudeScalar = new GraphQLScalarType({
    name: 'Latitude',
    description: 'A decimal degrees latitude number.',
    serialize(value: unknown): string {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value.toFixed(MAX_PRECISION);
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid latitude: ${value}`);
    },
    parseValue(value: unknown): number {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid latitude: ${value}`);
    },
    parseLiteral(ast: ValueNode): number {
        if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
            let value = Number.parseFloat(ast.value);
            if (value >= MIN_LATITUDE && value <= MAX_LATITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LATITUDE} and ${MAX_LATITUDE}: ${value}`);
        }
        throw new GraphQLError(`Can only validate strings or numbers as latitude but got a: ${ast.kind}`, { nodes: ast });
    },
});

// Minimum longitude
const MIN_LONGITUDE = -180.0;
// Maximum longitude
const MAX_LONGITUDE = +180.0;

export const LongitudeScalar = new GraphQLScalarType({
    name: 'Longitude',
    description: 'A decimal degrees latitude number.',
    serialize(value: unknown): string {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value.toFixed(MAX_PRECISION);
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid longitude: ${value}`);
    },
    parseValue(value: unknown): number {
        if (typeof value === 'string')
            value = Number.parseFloat(value);
        if (typeof value === 'number' && !Number.isNaN(value)) {
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Value is not a valid longitude: ${value}`);
    },
    parseLiteral(ast: ValueNode): number {
        if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
            let value = Number.parseFloat(ast.value);
            if (value >= MIN_LONGITUDE && value <= MAX_LONGITUDE)
                return value;
            throw new GraphQLError(`Value must be between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}: ${value}`);
        }
        throw new GraphQLError(`Can only validate strings or numbers as longitude but got a: ${ast.kind}`, { nodes: ast });
    },
});

export const scalarsMap: ScalarsTypeMap[] = [
    { type: ObjectId, scalar: ObjectIdScalar    },
    { type: DateTime, scalar: DateTimeScalar    },
    { type: DateTime, scalar: DateScalar        },
    { type: DateTime, scalar: TimeScalar        },
    { type: Interval, scalar: IntervalScalar    },
    { type: Duration, scalar: DurationScalar    },
    { type: Number,   scalar: TimestampScalar   },
    { type: String,   scalar: EmailScalar       },
    { type: String,   scalar: PhoneNumberScalar },
    { type: Number,   scalar: LatitudeScalar    },
    { type: Number,   scalar: LongitudeScalar   },
];

/* ENUMS */

export enum Country {
    Afghanistan                     = 'AF',
    AlandIslands                    = 'AX',
    Albania                         = 'AL',
    Algeria                         = 'DZ',
    AmericanSamoa                   = 'AS',
    Andorra                         = 'AD',
    Angola                          = 'AO',
    Anguilla                        = 'AI',
    Antarctica                      = 'AQ',
    AntiguaAndBarbuda               = 'AG',
    Argentina                       = 'AR',
    Armenia                         = 'AM',
    Aruba                           = 'AW',
    Australia                       = 'AU',
    Austria                         = 'AT',
    Azerbaijan                      = 'AZ',
    Bahamas                         = 'BS',
    Bahrain                         = 'BH',
    Bangladesh                      = 'BD',
    Barbados                        = 'BB',
    Belarus                         = 'BY',
    Belgium                         = 'BE',
    Belize                          = 'BZ',
    Benin                           = 'BJ',
    Bermuda                         = 'BM',
    Bhutan                          = 'BT',
    Bolivia                         = 'BO',
    BonaireSintEustatiusSaba        = 'BQ',
    BosniaAndHerzegovina            = 'BA',
    Botswana                        = 'BW',
    BouvetIsland                    = 'BV',
    Brazil                          = 'BR',
    BritishIndianOceanTerritory     = 'IO',
    BruneiDarussalam                = 'BN',
    Bulgaria                        = 'BG',
    BurkinaFaso                     = 'BF',
    Burundi                         = 'BI',
    Cambodia                        = 'KH',
    Cameroon                        = 'CM',
    Canada                          = 'CA',
    CapeVerde                       = 'CV',
    CaymanIslands                   = 'KY',
    CentralAfricanRepublic          = 'CF',
    Chad                            = 'TD',
    Chile                           = 'CL',
    China                           = 'CN',
    ChristmasIsland                 = 'CX',
    CocosKeelingIslands             = 'CC',
    Colombia                        = 'CO',
    Comoros                         = 'KM',
    Congo                           = 'CG',
    CongoDemocraticRepublic         = 'CD',
    CookIslands                     = 'CK',
    CostaRica                       = 'CR',
    CoteDIvoire                     = 'CI',
    Croatia                         = 'HR',
    Cuba                            = 'CU',
    Curacao                         = 'CW',
    Cyprus                          = 'CY',
    CzechRepublic                   = 'CZ',
    Denmark                         = 'DK',
    Djibouti                        = 'DJ',
    Dominica                        = 'DM',
    DominicanRepublic               = 'DO',
    Ecuador                         = 'EC',
    Egypt                           = 'EG',
    ElSalvador                      = 'SV',
    EquatorialGuinea                = 'GQ',
    Eritrea                         = 'ER',
    Estonia                         = 'EE',
    Ethiopia                        = 'ET',
    FalklandIslands                 = 'FK',
    FaroeIslands                    = 'FO',
    Fiji                            = 'FJ',
    Finland                         = 'FI',
    France                          = 'FR',
    FrenchGuiana                    = 'GF',
    FrenchPolynesia                 = 'PF',
    FrenchSouthernTerritories       = 'TF',
    Gabon                           = 'GA',
    Gambia                          = 'GM',
    Georgia                         = 'GE',
    Germany                         = 'DE',
    Ghana                           = 'GH',
    Gibraltar                       = 'GI',
    Greece                          = 'GR',
    Greenland                       = 'GL',
    Grenada                         = 'GD',
    Guadeloupe                      = 'GP',
    Guam                            = 'GU',
    Guatemala                       = 'GT',
    Guernsey                        = 'GG',
    Guinea                          = 'GN',
    GuineaBissau                    = 'GW',
    Guyana                          = 'GY',
    Haiti                           = 'HT',
    HeardIslandMcdonaldIslands      = 'HM',
    HolySeeVaticanCityState         = 'VA',
    Honduras                        = 'HN',
    HongKong                        = 'HK',
    Hungary                         = 'HU',
    Iceland                         = 'IS',
    India                           = 'IN',
    Indonesia                       = 'ID',
    Iran                            = 'IR',
    Iraq                            = 'IQ',
    Ireland                         = 'IE',
    IsleOfMan                       = 'IM',
    Israel                          = 'IL',
    Italy                           = 'IT',
    Jamaica                         = 'JM',
    Japan                           = 'JP',
    Jersey                          = 'JE',
    Jordan                          = 'JO',
    Kazakhstan                      = 'KZ',
    Kenya                           = 'KE',
    Kiribati                        = 'KI',
    Korea                           = 'KR',
    KoreaDemocraticPeoplesRepublic  = 'KP',
    Kuwait                          = 'KW',
    Kyrgyzstan                      = 'KG',
    LaoPeoplesDemocraticRepublic    = 'LA',
    Latvia                          = 'LV',
    Lebanon                         = 'LB',
    Lesotho                         = 'LS',
    Liberia                         = 'LR',
    LibyanArabJamahiriya            = 'LY',
    Liechtenstein                   = 'LI',
    Lithuania                       = 'LT',
    Luxembourg                      = 'LU',
    Macao                           = 'MO',
    Macedonia                       = 'MK',
    Madagascar                      = 'MG',
    Malawi                          = 'MW',
    Malaysia                        = 'MY',
    Maldives                        = 'MV',
    Mali                            = 'ML',
    Malta                           = 'MT',
    MarshallIslands                 = 'MH',
    Martinique                      = 'MQ',
    Mauritania                      = 'MR',
    Mauritius                       = 'MU',
    Mayotte                         = 'YT',
    Mexico                          = 'MX',
    Micronesia                      = 'FM',
    Moldova                         = 'MD',
    Monaco                          = 'MC',
    Mongolia                        = 'MN',
    Montenegro                      = 'ME',
    Montserrat                      = 'MS',
    Morocco                         = 'MA',
    Mozambique                      = 'MZ',
    Myanmar                         = 'MM',
    Namibia                         = 'NA',
    Nauru                           = 'NR',
    Nepal                           = 'NP',
    Netherlands                     = 'NL',
    NewCaledonia                    = 'NC',
    NewZealand                      = 'NZ',
    Nicaragua                       = 'NI',
    Niger                           = 'NE',
    Nigeria                         = 'NG',
    Niue                            = 'NU',
    NorfolkIsland                   = 'NF',
    NorthernMarianaIslands          = 'MP',
    Norway                          = 'NO',
    Oman                            = 'OM',
    Pakistan                        = 'PK',
    Palau                           = 'PW',
    PalestinianTerritory            = 'PS',
    Panama                          = 'PA',
    PapuaNewGuinea                  = 'PG',
    Paraguay                        = 'PY',
    Peru                            = 'PE',
    Philippines                     = 'PH',
    Pitcairn                        = 'PN',
    Poland                          = 'PL',
    Portugal                        = 'PT',
    PuertoRico                      = 'PR',
    Qatar                           = 'QA',
    Reunion                         = 'RE',
    Romania                         = 'RO',
    RussianFederation               = 'RU',
    Rwanda                          = 'RW',
    SaintBarthelemy                 = 'BL',
    SaintHelena                     = 'SH',
    SaintKittsAndNevis              = 'KN',
    SaintLucia                      = 'LC',
    SaintMartin                     = 'MF',
    SaintPierreAndMiquelon          = 'PM',
    SaintVincentAndGrenadines       = 'VC',
    Samoa                           = 'WS',
    SanMarino                       = 'SM',
    SaoTomeAndPrincipe              = 'ST',
    SaudiArabia                     = 'SA',
    Senegal                         = 'SN',
    Serbia                          = 'RS',
    Seychelles                      = 'SC',
    SierraLeone                     = 'SL',
    Singapore                       = 'SG',
    SintMaarten                     = 'SX',
    Slovakia                        = 'SK',
    Slovenia                        = 'SI',
    SolomonIslands                  = 'SB',
    Somalia                         = 'SO',
    SouthAfrica                     = 'ZA',
    SouthGeorgiaAndSandwichIsl      = 'GS',
    SouthSudan                      = 'SS',
    Spain                           = 'ES',
    SriLanka                        = 'LK',
    Sudan                           = 'SD',
    Suriname                        = 'SR',
    SvalbardAndJanMayen             = 'SJ',
    Swaziland                       = 'SZ',
    Sweden                          = 'SE',
    Switzerland                     = 'CH',
    SyrianArabRepublic              = 'SY',
    Taiwan                          = 'TW',
    Tajikistan                      = 'TJ',
    Tanzania                        = 'TZ',
    Thailand                        = 'TH',
    TimorLeste                      = 'TL',
    Togo                            = 'TG',
    Tokelau                         = 'TK',
    Tonga                           = 'TO',
    TrinidadAndTobago               = 'TT',
    Tunisia                         = 'TN',
    Turkey                          = 'TR',
    Turkmenistan                    = 'TM',
    TurksAndCaicosIslands           = 'TC',
    Tuvalu                          = 'TV',
    Uganda                          = 'UG',
    Ukraine                         = 'UA',
    UnitedArabEmirates              = 'AE',
    UnitedKingdom                   = 'GB',
    UnitedStates                    = 'US',
    UnitedStatesOutlyingIslands     = 'UM',
    Uruguay                         = 'UY',
    Uzbekistan                      = 'UZ',
    Vanuatu                         = 'VU',
    Venezuela                       = 'VE',
    Vietnam                         = 'VN',
    VirginIslandsBritish            = 'VG',
    VirginIslandsUS                 = 'VI',
    WallisAndFutuna                 = 'WF',
    WesternSahara                   = 'EH',
    Yemen                           = 'YE',
    Zambia                          = 'ZM',
    Zimbabwe                        = 'ZW',
}

registerEnumType(Country, {
    name: 'Country',
    description: 'An ISO 3166 Country regional code.',
});

export enum RequestStatus {
    WAITING,
    REVISION,
    ACCEPTED,
}

registerEnumType(RequestStatus, {
    name: 'RequestStatus',
    description: 'Статус запроса на добавление текущий версии тур. продукта',
    valuesConfig: {
        WAITING: { description: 'ОЖИДАНИЕ' },
        REVISION: { description: 'ОТПРАВЛЕНО НА ДОРАБОТКУ' },
        ACCEPTED: { description: 'ПРИНЯТО' },
    },
});

export enum RequestResourceStatus {
    WAITING,
    REJECTED,
    ACCEPTED,
}

registerEnumType(RequestResourceStatus, {
    name: 'RequestResourceStatus',
    description: 'Статус запроса на добавление тур. продукта',
    valuesConfig: {
        WAITING: { description: 'ОЖИДАНИЕ' },
        REJECTED: { description: 'ОТКЛОНЕНО' },
        ACCEPTED: { description: 'ПРИНЯТО' },
    },
});

export enum ResourceStatus {
    ACTIVE,
    INACTIVE,
}

registerEnumType(ResourceStatus, {
    name: 'ResourceStatus',
    description: 'Статус объекта (ресурса)',
    valuesConfig: {
        ACTIVE: { description: 'АКТИВНО' },
        INACTIVE: { description: 'НЕАКТИВНО' },
    },
});

export enum EventStatus {
    SCHEDULED,
    CANCELLED,
    CONDUCTED,
}

registerEnumType(EventStatus, {
    name: 'EventStatus',
    description: 'Статус мероприятия',
    valuesConfig: {
        SCHEDULED: { description: 'ЗАПЛАНИРОВАНО' },
        CANCELLED: { description: 'ОТМЕНЕНО' },
        CONDUCTED: { description: 'ПРОВЕДЕНО' },
    },
});

/* UNIONS */

// const AttachmentUnion = createUnionType({
//     name: 'Attachment',
//     types: [Photo, Video]
// });

/* TYPES */

@ObjectType()
export class Attachment {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ required: true})
    url: string;

    @Field({ nullable: true })
    @Property()
    filename?: string;

    @Field({ nullable: true })
    @Property()
    mimetype?: string;

    @Field()
    @Property({ required: true })
    size: number;

    /* TODO:
    @Field(_type => User)
    @Property({ required: true, ref: 'User'})
    author: Ref<User>;
    */
}

@InputType()
export class AttachmentInput {
    @Field()
    @Length(1, 255)
    url: string;

    @Field({ nullable: true })
    @Length(1, 32)
    filename?: string;

    @Field()
    @MaxLength(64)
    mimetype: string;

    @Field(_type => Int)
    @IsInt()
    size: number;

    /* TODO:
    @Field(_type => User)
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
        return await AttachmentModel.create(input);
    }
}

export const AttachmentModel = createModelFrom(Attachment);

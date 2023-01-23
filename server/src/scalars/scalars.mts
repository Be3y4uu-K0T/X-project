import { DateTimeScalar, DateScalar, TimeScalar, DateTime } from './DateTime.mjs';
import type { ScalarsTypeMap } from 'type-graphql/dist/schema/build-context';
import { LatitudeScalar, LongitudeScalar } from './GeoLocation.mjs'
import { DurationScalar, Duration } from './Duration.mjs';
import { IntervalScalar, Interval } from './Interval.mjs';
import { ObjectIdScalar, ObjectId } from './ObjectId.mjs';
import { EmailAddressScalar } from './EmailAddress.mjs';
import { PhoneNumberScalar } from './PhoneNumber.mjs'
import { URLScalar } from './URL.mjs';

export {
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
};

export const scalarsMap: ScalarsTypeMap[] = [
    { type: ObjectId, scalar: ObjectIdScalar },
    { type: DateTime, scalar: DateTimeScalar },
    { type: Interval, scalar: IntervalScalar },
    { type: Duration, scalar: DurationScalar },
    { type: URL,      scalar: URLScalar      },
];
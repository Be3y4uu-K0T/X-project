import * as mongoose from 'mongoose';

declare module 'mongoose' {
    namespace Schema {
        namespace Types {
            class DateTimeScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class DateScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class TimeScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class IntervalScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class DurationScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class EmailAddressScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class PhoneNumberScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class LatitudeScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class LongitudeScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
            class URLScalar extends SchemaType {
                constructor(key: string, options?: any);
            }
        }
    }
}
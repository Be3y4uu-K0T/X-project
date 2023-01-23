import { TouristEvent, TouristRoute, TouristSite } from '../entites.mjs';
import { createUnionType } from 'type-graphql';

export const TouristResource = createUnionType({
    name: 'TouristResource',
    types: () => [TouristEvent, TouristRoute, TouristSite] as const
});
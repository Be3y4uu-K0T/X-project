import type { GetEventsQuery } from '../__generated__/graphql';
import { Spinner, VStack } from '@chakra-ui/react';
import { gql } from '../__generated__/gql';
import { useQuery } from '@apollo/client';
import React from 'react';

type GetEvent = GetEventsQuery['events'][number];

export function Event({ name, description,  }: GetEvent) {
    return <div></div>
}

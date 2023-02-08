import { Spinner, VStack } from '@chakra-ui/react';
import { gql } from '../__generated__/gql';
import { useQuery } from '@apollo/client';
import { Event } from './event';
import React from 'react';

const GET_EVENTS = gql(/* GraphQL */ `
  query GetEvents($take: Int!, $page: Int!) {
    events: tourist_events(take: $take, page: $page) {
      _id
      name
      description
      rating {
        score
      }
      guide {
        _id
        avatar {
          _id
          url
          mimetype
        }
        rating {
          score
        }
        fullname
      }
      timing
      price
    }
  }
`);

export default function Events(page: number = 1) {
  const { loading, error, data } = useQuery(GET_EVENTS, { variables: { take: 15, page } });

  if (error) return <h1>Error...</h1>;
  if (loading || !data) return <Spinner />;

  return (
    <VStack spacing={2} mt={4}>
      {data.events.map((event) => {
        return <Event key={event._id} {...event} />
      })}
    </VStack>
  );
}

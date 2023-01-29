import { gql } from '../__generated__/gql';
import { useQuery } from '@apollo/client';
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

export default function Events() {
    const { loading, error, data } = useQuery(GET_EVENTS, { variables: { take: 15, page: 1 } });

    if (error) return `Error: ${error}`;
    if (loading) return <p>Loading...</p>;

    return data && data.events.map((event) => {
      return <div></div>
    });
}
import { useCookies } from 'react-cookie';
import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';



const SIGNUP_AS_CLIENT = gql(/* GraphQL */ `
mutation SignUpAsClient($email: EmailAddress!, $password: String!) {
    signup_as_client(email: $email, password: $password) {
      _id
      avatar {
        _id
        url
        filename
        mimetype
        size
      }
      created_at
      email
      contact {
        address {
          country
          subject
          district
          locality {
            type
            designation
          }
          street {
            type
            designation
          }
          building {
            type
            designation
          }
          additional {
            type
            designation
          }
          apartament
        }
        location {
          latitude
          longitude
        }
        phone
        email
      }
      lastaname
      middlename
      firstname
      fullname
      birthday
    }
}`);

const SIGNIN = gql(/* GraphQL */ `
mutation SignIn($email: EmailAddress!, $password: String!) {
  signin(email: $email, password: $password) {
    sessionId
    tokens {
      accessToken
      refreshToken
    }
  }
}`);

function sign_up() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token']);
  const { loading, error, data } = useQuery(SIGNUP_AS_CLIENT);

  return (
      <div>

      </div>
  );
}

function sign_in() {
  const { loading, error, data } = useQuery(SIGNIN, { variables: { }})

  setCookie

  return (
    <div>

    </div>
  )
}


//     let expires = new Date()
//     expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
//     setCookie('access_token', response.access_token, { path: '/',  expires})
//     setCookie('refresh_token', response.refresh_token, {path: '/', expires})

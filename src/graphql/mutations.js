import { gql } from '@apollo/client';
import { REVIEW_DETAILS } from './fragments';

export const USER_SIGN_IN = gql`
    mutation SignInUser ($username: String!, $password: String!) {
        authenticate(
            credentials: {
                username: $username,
                password: $password
            }
        ) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation CreateReview ($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
        createReview(
            review: {
                ownerName: $ownerName,
                repositoryName: $repositoryName,
                rating: $rating
                text: $text
            }       
        ) {
            repositoryId,
            ...ReviewDetails
        }
    }
    ${REVIEW_DETAILS}
`

export const DELETE_REVIEW = gql`
    mutation DeleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`

export const CREATE_USER = gql`
    mutation CreateUser ($username: String!, $password: String!) {
        createUser(
            user: {
                username: $username,
                password: $password
            }
        ) {
            id,
            username
        }
    }
`
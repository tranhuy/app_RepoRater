import { gql } from '@apollo/client';

import { REPO_DETAILS, REVIEW_DETAILS, PAGE_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
        repositories(
            orderBy: $orderBy,
            orderDirection: $orderDirection,
            searchKeyword: $searchKeyword,
            after: $after,
            first: $first
        ) {
            edges {
                node {
                    ...RepoDetails
                },
                cursor,
            }, 
            pageInfo {
                ...PageInfoDetails
            }
        }
    }
    ${REPO_DETAILS}
    ${PAGE_INFO}
`
export const GET_REPOSITORY = gql`
    query getRep($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            ...RepoDetails,
            url,
            reviews (first: $first, after: $after) {
                edges {
                    node {
                        ...ReviewDetails
                    },
                    cursor,
                },
                pageInfo {
                    ...PageInfoDetails
                }
            }
        }
    }
    ${REPO_DETAILS}
    ${REVIEW_DETAILS}
    ${PAGE_INFO}
`

export const SIGNED_IN_USER = gql`
    query LoggedInUser($includeReviews: Boolean = false) {
        me {
            id,
            username,
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewDetails
                    }
                    cursor
                }
                pageInfo {
                    ...PageInfoDetails
                }
            }
        }
    }
    ${REVIEW_DETAILS}
    ${PAGE_INFO}
`
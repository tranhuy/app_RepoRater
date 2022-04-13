import { gql } from '@apollo/client';

export const REPO_DETAILS = gql`
    fragment RepoDetails on Repository {
        id,
        fullName,
        description,
        language,
        forksCount,
        stargazersCount,
        ratingAverage,
        reviewCount,
        ownerAvatarUrl
    }
`

export const REVIEW_DETAILS = gql`
    fragment ReviewDetails on Review {
        id,
        text,
        rating,
        createdAt,
        repositoryId,
        user {
            id,
            username
        },
        repository {
            id,
            fullName
        }
    }
`

export const PAGE_INFO = gql`
    fragment PageInfoDetails on PageInfo {
        hasPreviousPage,
        hasNextPage,
        startCursor,
        endCursor
    }
`
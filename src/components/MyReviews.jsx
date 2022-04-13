import { View, Pressable, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigate } from 'react-router-native';

import * as Utils from "../utils/utils";

import Text from "./Text";

import useLoggedInUser from "../hooks/useLoggedInUser";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: '#ededed',
    },
    container: {      
        padding: 14
    },
    review: {
        flexDirection: 'row',
    },
    rewiewRating: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: '#3980c7',
        borderWidth: 2,
        justifyContent: 'center',
    },
    reviewText: {
        flexShrink: 1,
        marginLeft: 8,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
  });

const btnStyle = backgroundColor => {
    return {
        backgroundColor: backgroundColor,
        color: '#ffffff',
        width: 180,
        padding: 12,
        borderRadius: 5,
        textAlign: 'center',
    }
}

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, refreshReviewsList }) => {
    const navigate = useNavigate();
    const [ deleteReview ] = useDeleteReview();

    const showDeleteConfirmDialog = () => 
        Alert.alert(
            'Delete Review', 'Are you sure you want to delete this review?',
            [
                {
                    text: 'Delete',
                    onPress: async() => {
                        const { data } = await deleteReview(review.id);

                        if (data.deleteReview) {
                            refreshReviewsList();
                        }
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        );

    return (
        <View style={styles.container}>
            <View style={styles.review}>
                <View style={styles.rewiewRating}>
                    <Text fontSize='subheading' align='center' style={{ color: '#3980c7' }}>{review.rating}</Text>
                </View>
                <View style={styles.reviewText}>
                    <View>
                        <Text fontWeight='bold'>{review.repository.fullName}</Text>
                    </View>
                    <View>
                        <Text color='textSecondary'>{Utils.formatDate(review.createdAt)}</Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <Pressable onPress={() => navigate(`/repo/${review.repositoryId}`, { replace: true })}>
                    <Text fontWeight='bold' fontSize='subheading' style={btnStyle('#0365d0')}>View Repository</Text>
                </Pressable>
                <Pressable onPress={() => showDeleteConfirmDialog()}>
                    <Text fontWeight='bold' fontSize='subheading' style={btnStyle('#ad0728')}>Delete Review</Text>
                </Pressable>
            </View>
        </View>
    );
}

const MyReviews = () => {
    const { user, refetch } = useLoggedInUser(true);   
    const reviews = user?.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} refreshReviewsList={refetch} />}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={({ id }) => id}
        />
    );
}

export default MyReviews;
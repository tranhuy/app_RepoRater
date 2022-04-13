import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number()
                .required('Rating is required')
                .typeError('Rating must be a number')
                .min(0, 'Min value is 0')
                .max(100, 'Max value is 100')
});

const CreateReview = () => {
    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: ''
    }

    const [createReview] = useCreateReview();
    const navigate = useNavigate();

    const addReview = async values => {
        try {
            const { data } = await createReview(values);
            const newReview = data.createReview;
            console.log(newReview);
            navigate(`/repo/${newReview.repositoryId}`, { replace: true });
        } catch (e) {
            console.log(e.message);
            Alert.alert('CREATE REVIEW ERROR', e.message);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={addReview}
            validationSchema={validationSchema}
        >
            {
                ({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />
            }
        </Formik>
    );
}

const CreateReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='ownerName' placeholder='Repository owner name' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='repositoryName' placeholder='Repository name' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='text' placeholder='Review' multiline={true} />
            </View>
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' fontSize='subheading' style={styles.submitBtn}>Create Review</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
    },
    inputWrapper: {
        marginBottom: 12,
    },  
    submitBtn: {
        backgroundColor: '#0365d0',
        color: '#ffffff',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
    }
  });

export default CreateReview;
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

export const LogInContainer = ({ handleLogin }) => {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
        >
            {
                ({ handleSubmit }) => <LogInForm onSubmit={handleSubmit} />
            }
        </Formik>
    )
}

const LogIn = () => {
    const [signInUser] = useSignIn();
    const navigate = useNavigate();

    const loginUser = async credentials => {
        try {
            const { data } = await signInUser(credentials);
            console.log(data);
            navigate('/', { replace: true });
        } catch (e) {
            console.log(e.message);
            Alert.alert('AUTHENTICATION ERROR', e.message);
        }
    }
    
    return <LogInContainer handleLogin={loginUser} />
};

const LogInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='username' placeholder='Username' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
            </View>           
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' fontSize='subheading' style={styles.loginBtn}>Log In</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
    },
    inputWrapper: {
        marginBottom: 12,
    },  
    loginBtn: {
        backgroundColor: '#0365d0',
        color: '#ffffff',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
    }
  });

export default LogIn;
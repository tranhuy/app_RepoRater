import { View, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import useCreateUser from '../hooks/useCreateUser';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

const validationSchema = yup.object().shape({
    username: yup.string()
                    .required('Username is required')
                    .max(30, 'Max length is 30'),
    password: yup.string()
                    .required('Password is required')
                    .min(5, 'Min lenght is 5')
                    .max(50, 'Max length is 50'),
    confirmPassword: yup.string()
                    .required('Password confirmation is required')
                    .oneOf([yup.ref('password')], 'The passwords entered do not match'),
})

const RegisterUser = () => {
    const [ addUser ] = useCreateUser();
    const [ signInUser ] = useSignIn();
    const navigate = useNavigate();
    
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
    };

    const registerUser = async ({ username, password }) => {
        
        try {
            const { data: userData } = await addUser({ username, password });
            console.log('New user created: ', userData.createUser);
            await signInUser({ username, password });
            navigate('/', { replace: true });
        } catch (e) {
            console.log(e.message);
            Alert.alert('CREATE USER ERROR', e.message);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={registerUser}
            validationSchema={validationSchema}
        >
        {
            ({ handleSubmit }) => <RegisterForm onSubmit={handleSubmit}/>
        }
        </Formik>
    );
}

const RegisterForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='username' placeholder='Username' />
            </View>
            <View style={styles.inputWrapper}>
                <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
            </View>   
            <View style={styles.inputWrapper}>
                <FormikTextInput name='confirmPassword' placeholder='Password Confirmation' secureTextEntry={true} />
            </View>        
            <Pressable onPress={onSubmit}>
                <Text fontWeight='bold' fontSize='subheading' style={styles.loginBtn}>Register</Text>
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
    loginBtn: {
        backgroundColor: '#0365d0',
        color: '#ffffff',
        padding: 8,
        borderRadius: 5,
        textAlign: 'center',
    }
  });

export default RegisterUser;
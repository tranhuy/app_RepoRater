import { View, Pressable, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useRef, useEffect } from 'react';

import { useApolloClient } from '@apollo/client';
import useAuthSorage from '../hooks/useAuthStorage';
import useLoggedInUser from '../hooks/useLoggedInUser';

import Constants from 'expo-constants';

import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backColors.appBar,
    height: 90
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.appBar,
    fontSize: theme.fontSizes.header
  },
  tab: {
      padding: 10
  }
});

const Tab = ({ title, action }) => {
    const navigate = useNavigate();
    const { navPath, callback } = action;

    const handleOnPress = () => {
        if (callback) {
            callback();
        }
        navigate(navPath, { replace: true });
    }

    return (
        <Pressable onPress={handleOnPress}>
            <View style={styles.tab}>
                <Text style={styles.text}>{title}</Text>
            </View>                         
        </Pressable>
    );   
};

const AppBar = () => {
  const { user: loggedInUser } = useLoggedInUser();
  const authStorage = useAuthSorage();
  const apolloClient = useApolloClient();
  const scrollViewRef = useRef();

  const logOutUser = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();    
    
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0 });
  }, [ loggedInUser ]);

  return (
    <View style={[styles.container]}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollView} ref={scrollViewRef}>
            <Tab title='Repositories' action={{ navPath: '/' }} />
            {!loggedInUser && <Tab title='Register' action={{ navPath: '/register' }} />}
            {loggedInUser && <Tab title='Create Review' action={{ navPath: '/review/create' }} />}
            {loggedInUser && <Tab title='My Reviews' action={{ navPath: `/user/${loggedInUser.id}/reviews` }} />}
            {loggedInUser ? <Tab title='Log Out' action={{ navPath: '/', callback: logOutUser }} /> : <Tab title='Log In' action={{ navPath: '/login' }} />}            
        </ScrollView>        
    </View>
  );
};

export default AppBar;
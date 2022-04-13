import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from 'react-native-paper';

import theme from "../../styles/theme";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dadcdd',
        padding: 14,
    },
    picker: {      
        backgroundColor: '#dadcdd',
        fontSize: theme.fontSizes.subheading,
        borderWidth: 0
    },
    searchBar: {
        height: 35,
        marginBottom: Platform.select({
            android: 0,
            ios: 0,
            default: 20
        }),
    },
    searchBarText: {
        fontSize: theme.fontSizes.subheading
    }
});

export const lastestRepository = {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC'
}

export const highestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC'
}

export const lowestRated = {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC'
}

const RepositoryListHeader = ({ sortBy, setSortBy, search, setSearch }) => {
    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search by repo or owner name"
                onChangeText={(val) => setSearch({ searchKeyword: val })}
                value={search.searchKeyword}
                style={styles.searchBar}
                inputStyle={styles.searchBarText}
            />
            <Picker
                selectedValue={JSON.stringify(sortBy)}
                onValueChange={val => setSortBy(JSON.parse(val))}
                style={styles.picker}
            >            
                <Picker.Item label='Select an item...' enabled={false} />
                <Picker.Item label='Latest repositories' value={JSON.stringify(lastestRepository)} />
                <Picker.Item label='Highest rated repositories' value={JSON.stringify(highestRated)} />
                <Picker.Item label='Lowest rated repositories' value={JSON.stringify(lowestRated)} />            
            </Picker>
        </View>
    );
}

export default RepositoryListHeader;


import { useState, Component } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce/lib';

import { repositories } from '../../data/repositories';
import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader, { lastestRepository } from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#ededed',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class RepositoryListContainer extends Component {
  
  renderHeader = () => {

    return (
      <RepositoryListHeader {...this.props} />
    );
  };

  render() {
    const baseUrl = '/repo';
    const { repositories, navigate, onEndReach } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (<Pressable onPress={() => navigate(`${baseUrl}/${item.id}`, { replace: true })}><RepositoryItem repo={item} /></Pressable>)}
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
    const navigate = useNavigate();
    const [ sortCriteria, setSortCriteria ] = useState(lastestRepository);
    const [ searchCriteria, setSearchCriteria ] = useState({ searchKeyword: '' });
    const [ debouncedSearch ] = useDebounce(searchCriteria, 400);
    const { repositories, fetchMore } = useRepositories({ ...sortCriteria, ...debouncedSearch, first: 6 });

    const loadMoreRepos = () => {
      console.log('Fetching more repositories');
      fetchMore();
    }

    return <RepositoryListContainer 
                navigate={navigate} 
                repositories={repositories}
                sortBy={sortCriteria} 
                setSortBy={setSortCriteria} 
                search={searchCriteria}
                setSearch={setSearchCriteria}
                onEndReach={loadMoreRepos}
            />
};

export default RepositoryList;
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import LottieView from 'lottie-react-native';
import {
  FONTSIZE,
  FONTFAMILY,
  COLORS,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useGetAllMoviesQuery} from '../store/movieApi';
import RNPickerSelect from 'react-native-picker-select';

const MoviesApi = () => {
  const {data, isError, isLoading, isSuccess, error} = useGetAllMoviesQuery('');
  //console.log(data);

  const [search, setSearch] = useState('');
  const [newData, setNewData] = useState<any>([]);
  const [selectedRating, setSelectedRating] = useState('');
 

  const searchref = React.useRef<TextInput>(null);
  const listFooter = () => <View style={{height: 100}}></View>;

  const onSearch = (text: string) => {
    if (text == '') {
      setNewData(data.results);
    } else {
      let tempList = data?.results?.filter((item: any) => {
        return item.title.toLowerCase().includes(text.toLowerCase());
      });
      setNewData(tempList);
    }
  };

//   const filterByGenre = (genre: string) => {
//     if (genre) {
//       let tempList = data?.result?.filter((item: any) => {
//         return item.genre_ids.includes(genre);
//       });
//       setNewData(tempList);
//     } else {
//       setNewData(data?.result);
//     }
//   };

  const sortByRating = (Rating: string) => {
    let tempList:any[] = [...newData];
    console.log(tempList);
    if (Rating == 'asc') {
      tempList.sort((a, b) => a?.vote_average - b?.vote_average);
    } else if (Rating == 'desc') {
      tempList.sort((a, b) => b?.vote_average - a?.vote_average);
    }
    setNewData(tempList);
  };

  useEffect(() => {
    if (data) {
      setNewData(data.results);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.EmptyCartContainer}>
          <LottieView
            style={styles.LottieStyle}
            source={require('../assets/Loading-Animation.json')}
            autoPlay
            loop
          />
        </View>
      ) : (
        <>
          <View style={{alignItems: 'center'}}>
            <View style={styles.HeaderContainer}>
              <Text style={styles.HeaderText}>Movies List 2024</Text>
            </View>

            <View style={[styles.InputContainer, {gap: 10}]}>
              <TextInput
                style={styles.input}
                ref={searchref}
                placeholder="Search Title here"
                value={search}
                onChangeText={txt => {
                  onSearch(txt);
                  setSearch(txt);
                }}
              />
            </View>
            <RNPickerSelect
              onValueChange={value => {
                setSelectedRating(value);
                sortByRating(value);
              }}
              items={[
                {label: 'Rating Ascending', value: 'asc'},
                {label: 'Rating Descending', value: 'desc'},
              ]}
              value={selectedRating}
              placeholder={{label: 'Sort by Rating', value: ''}}
            />
            {/* <RNPickerSelect
                onValueChange={(value) => {
                  setSelectedGenre(value);
                  filterByGenre(value);
                }}
                items={[
                  { label: 'Action', value: 'Action' },
                  { label: 'Comedy', value: 'Comedy' },
                  { label: 'Drama', value: 'Drama' },
                  // Add more genres as needed
                ]}
                value={selectedGenre}
                placeholder={{ label: 'Select Genre', value: '' }}
           
              /> */}
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.FlatListContainer}
            data={newData}
            keyExtractor={(item: any) => item.id}
            renderItem={({item}: any) => {
              return (
                <>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.itemsContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{justifyContent: 'center'}}>
                        <Text style={styles.CountryNameText}>
                          Title: {item.title.toUpperCase()}
                        </Text>
                        <Text style={styles.CountryCodeText}>
                          Release Date: {item.release_date}
                        </Text>
                        <Text style={styles.CountryCodeText}>
                          Genre: {item.genre_ids}
                        </Text>
                        <Text style={styles.CountryCodeText}>
                          Rating: {item.vote_average}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </>
              );
            }}
            ListFooterComponent={listFooter}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderContainer: {
    justifyContent: 'center',
    padding: wp('5%'),
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    elevation: 20,
    width: wp('96%'),
    top: wp('1%'),
    borderRadius: BORDERRADIUS.radius_4,
  },
  HeaderText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_30,
    textAlign: 'justify',
  },
  FlatListContainer: {
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_4,
  },
  CountryNameText: {
    color: COLORS.secondaryLightGreyHex,
  },
  CountryCodeText: {
    paddingBottom: 10,
    color: COLORS.secondaryLightGreyHex,
    width: wp('70%'),
    fontSize: 11,
    textAlign: 'justify',
  },
  EmptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  LottieStyle: {
    height: hp('15%'),
    width: wp('60%'),
  },
  itemsContainer: {
    padding: 10,
    // borderWidth: 0.5,
    backgroundColor: COLORS.secondaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_4,
    marginBottom: 10,
  },
  input: {
    color: COLORS.primaryWhiteHex,
    borderColor: COLORS.primaryWhiteHex,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    flex: 1,
    fontSize: FONTSIZE.size_14,
    borderWidth: 0.2,
    height: hp('5%'),
  },
  InputContainer: {
    flexDirection: 'row',
    paddingLeft: wp('3%'),
  },
});

export default MoviesApi;

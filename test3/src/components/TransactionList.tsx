import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TransactionCard from './TransactionCard';
import {SPACING, FONTFAMILY, FONTSIZE, COLORS} from '../theme/theme';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RNPickerSelect from 'react-native-picker-select';

const TransactionList = () => {
  const [data, setData] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const Transaction = useSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const filterByCategory = (category: string) => {
    if (category) {
      let tempList = Transaction?.filter((item: any) => {
        return item.category.includes(category);
      });
      if (category === 'All') {
        setData(Transaction);
      } else {
        setData(tempList);
      }
    } else {
      setData(Transaction);
    }
  };

  useEffect(() => {
    if (Transaction) {
      setData(Transaction);
    }
  }, [Transaction]);

  const [temp, setTemp] = useState<any>([]);
  useEffect(() => {
    let tempArr: any[] = [];
    Transaction.map(item =>
      tempArr.push({label: item.category.trim(), value: item.category.trim()}),
    );

    const UniqueArray = Array.from(new Set(tempArr.map(item => item.value))).map((value => {
      return tempArr.find(item => item.value === value)
    }))
    
    setTemp(UniqueArray);
  }, [Transaction]);


  const listFooter = () => <View style={{height: hp('20%')}}></View>;
  return (
    <View>
      <RNPickerSelect
        onValueChange={value => {
          setSelectedCategory(value);
          filterByCategory(value);
        }}
        items={temp}
        value={selectedCategory}
        placeholder={{label: 'Select by Category', value: 'All'}}
      />

      <FlatList
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Posts</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TransactionCard
              id={item.id}
              amount={item.amount}
              description={item.description}
              category={item.category}
              date={item.date}
            />
          );
        }}
        ListFooterComponent={listFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_2,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_4,
  },
  EmptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_30,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
});

export default TransactionList;

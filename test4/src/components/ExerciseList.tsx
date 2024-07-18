import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SPACING, FONTFAMILY, FONTSIZE, COLORS} from '../theme/theme';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import RNPickerSelect from 'react-native-picker-select';
import ExerciseCard from './ExerciseCard';

const ExerciseList = () => {
  const [data, setData] = useState<any>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const Exercise = useSelector((state: RootState) => state.exercise.exercises);

  const temp = [
    {label: 'Waist', value: 'Waist'},
    {label: 'Legs', value: 'Legs'},
    {label: 'Back', value: 'Back'},
    {label: 'Chest', value: 'Chest'},
    {label: 'Biceps', value: 'Biceps'},
    {label: 'Triceps', value: 'Triceps'},
    {label: 'Shoulder', value: 'Shoulder'},
  ];

  const filterByCategory = (type: string) => {
    if (type) {
      let tempList = Exercise?.filter((item: any) => {
        return item.type.includes(type);
      });
      if (type === 'All') {
        setData(Exercise);
      } else {
        setData(tempList);
      }
    } else {
      setData(Exercise);
    }
  };

  useEffect(() => {
    if (Exercise) {
      setData(Exercise);
    }
  }, [Exercise]);

  const sortByDueDate = (date : string) => {
    let tempList = [...data]
    if(date == "asc"){
     tempList.sort((a, b) => a?.date.localeCompare(b?.date));
    } else if (date == "desc"){
    tempList.sort((a, b) => b?.date.localeCompare(a?.date));
    }
      setData(tempList);
}

//   const [temp, setTemp] = useState<any>([]);
//   useEffect(() => {
//     let tempArr: any[] = [];
//     Transaction.map(item =>
//       tempArr.push({label: item.category.trim(), value: item.category.trim()}),
//     );

//     const UniqueArray = Array.from(new Set(tempArr.map(item => item.value))).map((value => {
//       return tempArr.find(item => item.value === value)
//     }))
    
//     setTemp(UniqueArray);
//   }, [Transaction]);


  const listFooter = () => <View style={{height: hp('20%')}}></View>;
  return (
    <View>
         <RNPickerSelect
                onValueChange={(value) => {
                  setSelectedDate(value);
                  sortByDueDate(value);
                }}
                items={[
                  { label: 'Date Ascending', value: 'asc' },
                  { label: 'Date Descending', value: 'desc' },
                ]}
                value={selectedDate}
                placeholder={{ label: 'Sort by Date', value: '' }}
              />
      <RNPickerSelect
        onValueChange={value => {
          setSelectedType(value);
          filterByCategory(value);
        }}
        items={temp}
        value={selectedType}
        placeholder={{label: 'Select by Type', value: 'All'}}
      />

      <FlatList
        ListEmptyComponent={
          <View style={styles.EmptyListContainer}>
            <Text style={styles.CategoryText}>No Record</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <ExerciseCard
              id={item.id}
              type={item.type}
              duration={item.duration}
              caloriesBurned={item.caloriesBurned}
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

export default ExerciseList;

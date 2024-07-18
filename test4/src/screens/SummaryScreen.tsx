import {Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';


const SummaryScreen = () => {
    const exercise = useSelector((state: RootState) => state.exercise.exercises);
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isnewDatePickerVisible, setNewDatePickerVisibility] = useState(false);


    const getSummary = () => {
        const filteredExercises = exercise.filter((exercise) => {
          const exerciseDate = new Date(exercise.date);
          return exerciseDate >= startDate && exerciseDate <= endDate;
        });
    
        const totalWorkouts = filteredExercises.length;
        const totalCaloriesBurned = filteredExercises.reduce(
          (total, exercise) => total + exercise.caloriesBurned,
          0
        );
    
        return { totalWorkouts, totalCaloriesBurned };
      };
    
      const { totalWorkouts, totalCaloriesBurned } = getSummary();

  return (
    <View style={{backgroundColor: COLORS.primaryBlackHex, flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderText}>Exercise Summary </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
        }}>
        <Text style={styles.amount}>Total Workouts: {totalWorkouts} </Text>
        <Text style={styles.amount}>
          Total Calories Burned: {totalCaloriesBurned}
        </Text>
      </View>


      <DatePicker
              modal
              open={isDatePickerVisible}
              date={startDate}
              mode="date"
              onConfirm={startDate => {
                setDatePickerVisibility(false);
                setStartDate(startDate);
              }}
              onCancel={() => {
                setDatePickerVisibility(false);
              }}
            />

            <View style={[styles.InputContainer, {gap: 10}]}>
              <TextInput
                editable={false}
                style={styles.input}
                placeholder="Date"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={startDate.toString().substring(0, 15)}
                onChangeText={startDate.toString().substring(0, 15)}
              />
              <Pressable
                style={{
                  backgroundColor: '#00bfff',
                  width: wp('20%'),
                  height: hp('5%'),
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setDatePickerVisibility(true)}>
                <Text style={{color: COLORS.primaryWhiteHex}}>Set Date</Text>
              </Pressable>
            </View>

            <DatePicker
              modal
              open={isnewDatePickerVisible}
              date={endDate}
              mode="date"
              onConfirm={endDate => {
                setNewDatePickerVisibility(false);
                setEndDate(endDate);
              }}
              onCancel={() => {
                setNewDatePickerVisibility(false);
              }}
            />

            <View style={[styles.InputContainer, {gap: 10}]}>
              <TextInput
                editable={false}
                style={styles.input}
                placeholder="Date"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={endDate.toString().substring(0, 15)}
                onChangeText={endDate.toString().substring(0, 15)}
              />
              <Pressable
                style={{
                  backgroundColor: '#00bfff',
                  width: wp('20%'),
                  height: hp('5%'),
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setNewDatePickerVisibility(true)}>
                <Text style={{color: COLORS.primaryWhiteHex}}>Set Date</Text>
              </Pressable>
            </View>

     
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('5%'),
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    elevation: 20,
    width: wp('96%'),
    top: wp('1%'),
    borderRadius: BORDERRADIUS.radius_4,
  },
  HeaderText: {
    color: 'White',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_30 * 1.2,
  },
  AddIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    right: wp('5%'),
    height: 32,
    width: 32,
    backgroundColor: COLORS.primaryOrangeHex,
    elevation: 20,
    shadowColor: '#fa641e',
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
  },
  InputContainer: {
    flexDirection: 'row',
    paddingLeft: wp('3%'),
  },
  SubmitButton: {
    top: 5,
    height: hp('6%'),
    width: wp('89%'),
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
});

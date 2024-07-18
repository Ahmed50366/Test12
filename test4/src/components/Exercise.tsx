import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addExercise} from '../store/exerciseSlice';
import RNPickerSelect from 'react-native-picker-select';


const Exercise = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState<any>('');
  const [date, setDate] = useState<any>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [caloriesBurned, setcaloriesBurned] = useState('');



  const refInput = React.useRef<TextInput>(null);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const temp = [
    {label: 'Waist', value: 'Waist'},
    {label: 'Legs', value: 'Legs'},
    {label: 'Back', value: 'Back'},
    {label: 'Chest', value: 'Chest'},
    {label: 'Biceps', value: 'Biceps'},
    {label: 'Triceps', value: 'Triceps'},
    {label: 'Shoulder', value: 'Shoulder'},
  ];

  const handleSubmit = () => {
    if (type.trim() !== '' &&duration !=='' && caloriesBurned !== '') {
      const exercise = {
        id: Date.now(),
        type: type,
        duration: Number(duration),
        caloriesBurned: Number(caloriesBurned),
        date: date.toString().substring(0, 15),
      };
      dispatch(addExercise(exercise));
      setType('');
      setDuration('');
      setcaloriesBurned('');
      setDate(new Date());
    } else {
      console.warn('Please enter all the details to keep Record of Exercise');
    }
    Keyboard.dismiss();
    toggleModal();
  };


  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderText}>Add Exercise</Text>

          <TouchableOpacity style={styles.AddIcon} onPress={toggleModal}>
            <Icon name="plus" color={COLORS.primaryWhiteHex} size={18} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <Text>Add New Exercise</Text>
            <TouchableOpacity
              style={{flexDirection: 'row-reverse'}}
              onPress={toggleModal}>
              <Icons name="close" size={25} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
            <Text style={styles.InputText}>Type</Text>

            <View style={{ alignItems: 'center',
          borderColor: '#ffffff',
          borderWidth: 0.2,
          borderRadius: 5,
          backgroundColor: 'transparent',
          marginBottom:10}}>    
            <RNPickerSelect
              onValueChange={value => {
                setType(value);
              }}
              items={temp}
              value={type}
              placeholder={{label: 'Select Exercise Type', value: ''}}
            />
            </View>

            <Text style={styles.InputText}>duration</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                maxLength={3}
                keyboardType="numeric"
                placeholder="Enter Duration(minutes)"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={duration}
                onChangeText={setDuration}
              />
            </View>
            <Text style={styles.InputText}>Calories Burned</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                maxLength={4}
                keyboardType="numeric"
                placeholder="Enter Burned Calories"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={caloriesBurned}
                onChangeText={setcaloriesBurned}
              />
            </View>
            <Text style={styles.InputText}>Date</Text>

            <DatePicker
              modal
              open={isDatePickerVisible}
              date={date}
              minimumDate={new Date()}
              maximumDate={new Date('2030-01-01')}
              mode="date"
              onConfirm={date => {
                setDatePickerVisibility(false);
                setDate(date);
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
                value={date.toString().substring(0, 15)}
                onChangeText={date.toString().substring(0, 15)}
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

            <View style={{paddingBottom: 15}}>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.SubmitButton}>
                <Text
                  style={{
                    color: COLORS.primaryWhiteHex,
                    fontFamily: FONTFAMILY.poppins_extrabold,
                    fontSize: FONTSIZE.size_18,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  ScreenContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  menuContainer: {
    backgroundColor: COLORS.secondaryDarkGreyHex,
    top: wp('10%'),
    borderRadius: BORDERRADIUS.radius_4,
    padding: 15,
    width: wp('98%'),
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 0.2,
    borderColor: 'white',
  },
  menuOptionText: {
    paddingLeft: wp('5%'),
    width: wp('90%'),
    height: wp('11%'),
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
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
  InputText: {
    color: COLORS.primaryWhiteHex,
    paddingLeft: wp('3%'),
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_extrabold,
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
});

export default Exercise;

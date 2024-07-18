import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import Iconss from 'react-native-vector-icons/SimpleLineIcons';
import RNPickerSelect from 'react-native-picker-select';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {deleteExercise, updateExercise} from '../store/exerciseSlice';
import DatePicker from 'react-native-date-picker';
import {RootState} from '../store/store';

interface exerciseProps {
  id: number;
  type: string;
  duration: string;
  caloriesBurned: number;
  date: string;
}

const ExerciseCard: React.FC<exerciseProps> = ({
  id,
  type,
  duration,
  caloriesBurned,
  date,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newtype, setNewType] = useState('');
  const [newDuration, setNewDuration] = useState<any>('');
  const [newDate, setNewDate] = useState<any>(new Date());
  const [IsDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNewDatePickerVisible, setNewDatePickerVisibility] = useState(false);
  const [newcaloriesBurned, setNewcaloriesBurned] = useState('');

  const temp = [
    {label: 'waist', value: 'waist'},
    {label: 'Legs', value: 'Legs'},
    {label: 'back', value: 'back'},
    {label: 'chest', value: 'chest'},
    {label: 'Biceps', value: 'Biceps'},
    {label: 'Triceps', value: 'Triceps'},
    {label: 'Shoulder', value: 'Shoulder'},
  ];

  const dispatch = useDispatch();
  const refInput = React.useRef<TextInput>(null);

  const initializeModalValues = () => {
    setNewType(type);
    setNewDuration(new Date());
    setNewDate(new Date(date));
    setNewcaloriesBurned(caloriesBurned.toString());
  };

  const toggleModal = () => {
    if (!modalVisible) {
      initializeModalValues();
    }
    setModalVisible(!modalVisible);
  };

  const handleDelete = () => {
    const item = id;
    dispatch(deleteExercise(item));
  };

  const handleUpdate = () => {
    dispatch(
      updateExercise({
        id,
        type: newtype,
        duration: newDuration,
        date: newDate.toString().substring(0, 15),
        caloriesBurned: newcaloriesBurned,
      }),
    );
    toggleModal();
  };

  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.CartItemSingleLinearGradient}>
        <View style={styles.CartItemSingleInfoContainer}>
          <View>
            <Text style={styles.CartItemTitle}>Type: {type}</Text>

            <Text numberOfLines={3} style={styles.CartItemSubtitle}>
              Duration: {duration}
            </Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.SizePrice}>
              Calaries Burned: {caloriesBurned}
            </Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.SizePrice}>{date.substring(0, 15)}</Text>
          </View>
        </View>

        <View style={{flexDirection: 'column', gap: 10}}>
          <TouchableOpacity style={styles.AddtoCartIcon} onPress={toggleModal}>
            <Icons name="edit" size={15} color={COLORS.primaryWhiteHex} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.AddtoCartIcon} onPress={handleDelete}>
            <Icon name="delete" size={15} color={COLORS.primaryWhiteHex} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <Text>Edit Exercise</Text>
            <TouchableOpacity
              style={{flexDirection: 'row-reverse'}}
              onPress={toggleModal}>
              <Iconss name="close" size={25} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
            <Text style={styles.InputText}>Type</Text>

            <View
              style={{
                alignItems: 'center',
                borderColor: '#ffffff',
                borderWidth: 0.2,
                borderRadius: 5,
                backgroundColor: 'transparent',
                marginBottom: 10,
              }}>
              <RNPickerSelect
                onValueChange={value => {
                  setNewType(value);
                }}
                items={temp}
                value={newtype}
                placeholder={{label: 'Select Exercise Type', value: ''}}
              />
            </View>

            <Text style={styles.InputText}>Duration</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                maxLength={4}
                keyboardType="numeric"
                placeholder="Enter Duration "
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={newDuration}
                onChangeText={setNewDuration}
              />
            </View>
            <Text style={styles.InputText}>Colories Burned</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                maxLength={4}
                ref={refInput}
                keyboardType="numeric"
                placeholder="Enter Burned Calories"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={newcaloriesBurned}
                onChangeText={setNewcaloriesBurned}
              />
            </View>

            <Text style={styles.InputText}>Date</Text>

            <DatePicker
              modal
              open={IsDatePickerVisible}
              date={newDate}
              minimumDate={new Date()}
              maximumDate={new Date('2030-01-01')}
              mode="date"
              onConfirm={newDate => {
                setDatePickerVisibility(false);
                setNewDate(newDate);
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
                value={newDate.toString().substring(0, 15)}
                onChangeText={setNewDate}
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
                onPress={handleUpdate}
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
  CartItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_10,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CartItemSingleImage: {
    height: hp('10%'),
    width: wp('20%'),
    borderRadius: BORDERRADIUS.radius_10,
    resizeMode: 'contain',
  },
  CartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    gap: SPACING.space_2,
  },
  CartItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CartItemSingleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  CartItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CartItemSubtitle: {
    textAlign: 'justify',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_8,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_2,
  },
  CartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  AddtoCartIcon: {
    width: SPACING.space_15,
    height: SPACING.space_15,
    backgroundColor: COLORS.primaryOrangeHex,
    elevation: 20,
    shadowColor: '#fa641e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_15,
  },
  QuantityText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
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

export default ExerciseCard;

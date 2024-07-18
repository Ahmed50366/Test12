import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import {useDispatch} from 'react-redux';
import React, { useState } from 'react'
import { addTask, deleteTask, updateTask } from '../store/taskSlice';
import DatePicker from 'react-native-date-picker';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string
  }

const TaskItems:React.FC<TaskProps> = ({id,title,description,dueDate,status}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState<any>(new Date());
  const [newIsDatePickerVisible, setNewDatePickerVisibility] = useState(false);
  const [newStatus, setNewStatus] = useState("Todo");

  const refInput = React.useRef<TextInput>(null);

    const dispatch = useDispatch()
    // const handleAddToCart = () => {
    //     const task = {id,title,description,dueDate,status};
    //     dispatch(addTask(task));
    //   };
    
      const handleDelete = () => {
        const task = id;
        dispatch(deleteTask(task));
      };

      const initializeModalValues = () => {
      setNewDescription(description)
      setNewTitle(title)
      setNewStatus(status)
      setNewDueDate(new Date(dueDate))
      };


      const toggleModal = () => {
        if (!modalVisible) {
          initializeModalValues();
        }
        setModalVisible(!modalVisible);
      };

      const handleUpdate =()=>{
        dispatch(updateTask({id,title:newTitle,description:newDescription,dueDate:newDueDate.toString(),status:newStatus}))
        toggleModal()
      }


  return (
    <View>
<LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.CartItemSingleLinearGradient}>
        <View style={styles.CartItemSingleInfoContainer}>
          <View>
            <Text style={styles.CartItemTitle}>{title}</Text>
            <Text numberOfLines={3} style={styles.CartItemSubtitle}>{description}</Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.SizeDate}>{dueDate.substring(0,15)}</Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.SizeDate}>Task: {status}</Text>
          </View>
        </View>

        <View style={{flexDirection:"column",gap:10}}>
        <TouchableOpacity
          style={styles.AddtoTaskIcon}
          onPress={toggleModal}>
          <Icons name="edit" size={13} color={COLORS.primaryWhiteHex} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.AddtoTaskIcon}
          onPress={handleDelete}>
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
                <Text>Edit Task</Text>
            <TouchableOpacity
              style={{flexDirection: 'row-reverse'}}
              onPress={toggleModal}>
              <Iconss name="close" size={25} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
            <Text style={styles.InputText}>Title</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                value={newTitle}
                maxLength={40}
                placeholder="Enter Title"
                placeholderTextColor={COLORS.primaryWhiteHex}
                onChangeText={setNewTitle}
              />
            </View>
            <Text style={styles.InputText}>Description</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                maxLength={1000}
                ref={refInput}
                placeholder="Enter Description"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={newDescription}
                onChangeText={setNewDescription}
              />
            </View>
            <Text style={styles.InputText}>Date</Text>
             
              <DatePicker
                modal
                open={newIsDatePickerVisible}
                date={newDueDate}
                minimumDate={new Date()}
                maximumDate={new Date("2030-01-01")}
                mode="date"
                onConfirm={newDueDate => {
                  setNewDatePickerVisibility(false);
                  setNewDueDate(newDueDate);
                }}
                onCancel={() => {
                    setNewDatePickerVisibility(false);
                }}
              />
              
              <View style={[styles.InputContainer,{gap:10}]}>

            <TextInput
                style={styles.input}
                placeholder="Date"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={newDueDate.toString().substring(0,15)}
                onChangeText={setNewDueDate}
                />
                 <Pressable style={{backgroundColor:"#00bfff",width:wp("20%"),height:hp("5%"),borderRadius:10,justifyContent:"center",alignItems:"center"}}
                onPress={() => setNewDatePickerVisibility(true)}>
               <Text style={{color:COLORS.primaryWhiteHex}}>Set Date</Text>
                </Pressable>
                </View>


                <RNPickerSelect
                onValueChange={(value) => {
                  setNewStatus(value);
                }}
                items={[
                  { label: 'To do', value: 'Todo' },
                  { label: 'InProgress', value: 'InProgress' },
                  { label: 'Completed', value: 'Completed' },
                ]}
                value={newStatus}
                placeholder={{ label: 'Select by Status', value: '' }}
                
                />



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
  )
}

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
        resizeMode:"contain",
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
      SizeDate: {
        color: COLORS.primaryWhiteHex,
      },
      AddtoTaskIcon: {
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
})

export default TaskItems
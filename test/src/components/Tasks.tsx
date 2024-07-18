import { Button, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import Icon from "react-native-vector-icons/Octicons"
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
import { addTask } from '../store/taskSlice';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { RootState } from '../store/store';
import TaskLists from './TaskLists';

const Tasks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<any>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [status, setStatus] = useState('');

  const refInput = React.useRef<TextInput>(null);

  const dispatch = useDispatch();
    
  const Task = useSelector((state: RootState) => state.task.tasks);
  console.log(Task)

  const toggleModal = () => {
    setModalVisible(!modalVisible);

    if(!modalVisible){
        setDescription(description)
        setTitle(title)
        setStatus("Todo")
        setDueDate(dueDate)
    }
  };



  const handleSubmit = () => {
    if (title.trim() !== '' && description !== '') {
      const task = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate.toString(),
        status: status,
      };
      dispatch(addTask(task));
      setTitle('');
      setDescription('');
      setDueDate(new Date());
      setStatus('Todo');
    } else {
      console.warn('Please enter all the details to add task');
    }
    Keyboard.dismiss();
    toggleModal();
  };
 

  return (
    <View style={styles.ScreenContainer}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderText}>Task</Text>

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
            <Text>Add New Task</Text>
            <TouchableOpacity
              style={{flexDirection: 'row-reverse'}}
              onPress={toggleModal}>
              <Icons name="close" size={25} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
            <Text style={styles.InputText}>Title</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                value={title}
                maxLength={40}
                placeholder="Enter Title"
                placeholderTextColor={COLORS.primaryWhiteHex}
                onChangeText={setTitle}
              />
            </View>
            <Text style={styles.InputText}>Description</Text>
            <View style={styles.InputContainer}>
              <TextInput
                style={styles.input}
                ref={refInput}
                maxLength={1000}
                placeholder="Enter Description"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <Text style={styles.InputText}>Date</Text>
             
              <DatePicker
                modal
                open={isDatePickerVisible}
                date={dueDate}
                minimumDate={new Date()}
                maximumDate={new Date("2030-01-01")}
                mode="date"
                onConfirm={(dueDate: any) => {
                  setDatePickerVisibility(false);
                  setDueDate(dueDate);
                }}
                onCancel={() => {
                  setDatePickerVisibility(false);
                }}
              />
              
              <View style={[styles.InputContainer,{gap:10}]}>

            <TextInput
                style={styles.input}
                placeholder="Date"
                placeholderTextColor={COLORS.primaryWhiteHex}
                value={dueDate.toString().substring(0,15)}
                onChangeText={setDueDate}
                />
                 <Pressable style={{backgroundColor:"#00bfff",width:wp("20%"),height:hp("5%"),borderRadius:10,justifyContent:"center",alignItems:"center"}}
                onPress={() => setDatePickerVisibility(true)}>
               <Text style={{color:COLORS.primaryWhiteHex}}>Set Date</Text>
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
      
      <TaskLists/>
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
    color: COLORS.primaryWhiteHex,
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
export default Tasks
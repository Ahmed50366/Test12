import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SPACING, FONTFAMILY, FONTSIZE, COLORS } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import TaskItems from './TaskItems';
import RNPickerSelect from 'react-native-picker-select';


const TaskLists = () => {

    const Task = useSelector((state: RootState) => state.task.tasks)
    const [data,setData]=useState<any>([])
    const [selectedDueDate, setSelectedDueDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    
    const listFooter = () => <View style={{height: hp('58%')}}></View>;
    
    const sortByDueDate = (Rating : string) => {
        let tempList = [...data]
        console.log(tempList);
        if(Rating == "asc"){
         tempList.sort((a:any, b:any) => a?.dueDate.localeCompare(b?.dueDate));
        } else if (Rating == "desc"){
        tempList.sort((a:any, b:any) => b?.dueDate.localeCompare(a?.dueDate));
        }
          setData(tempList);
    }

    const filterByStatus = (status: string) => {
        if (status) {
          let tempList = Task?.filter((item: any) => {
            return item.status.includes(status)
          });
          if(status === "All"){
            setData(Task)
        }else{
        setData(tempList);
        }
        }
         else {
          setData(Task);
        }
      };

   useEffect(() => {
    if (Task) {
      setData(Task);
    }
  }, [Task]);
  
  return (
    <View style={{flex:1}}>
        <RNPickerSelect
                onValueChange={(value) => {
                  setSelectedDueDate(value);
                  sortByDueDate(value);
                }}
                items={[
                  { label: 'Date Ascending', value: 'asc' },
                  { label: 'Date Descending', value: 'desc' },
                ]}
                value={selectedDueDate}
                placeholder={{ label: 'Sort by Date', value: '' }}
              />
     <RNPickerSelect
                onValueChange={(value) => {
                  setSelectedStatus(value);
                  filterByStatus(value);
                }}
                items={[
                  { label: 'To do', value: 'Todo' },
                  { label: 'InProgress', value: 'InProgress' },
                  { label: 'Completed', value: 'Completed' },
                  // Add more genres as needed
                ]}
                value={selectedStatus}
                placeholder={{ label: 'Select by Status', value: 'All' }}
           
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
        keyExtractor={(item :any)  => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TaskItems
              id={item.id}
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
              status={item.status}
              
            />
          );
        }}
        ListFooterComponent={listFooter}
      />
    </View>
  )
}

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
  },})

export default TaskLists
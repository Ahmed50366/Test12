import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateBudget} from '../store/budgetSlice';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {RootState} from '../store/store';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS } from '../theme/theme';

const SetBudget = () => {
  const Transaction = useSelector((state: RootState) => state.transaction.transactions);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();

  const handleSetBudget = () => {
    if (category && amount) {
      dispatch(updateBudget({category, amount: parseFloat(amount)}));
      setCategory('');
      setAmount('');
    }
  };

  const [temp, setTemp] = useState<any>([]);
  useEffect(() => {
    let tempArr: any[] = [];
    Transaction.map(item =>
      tempArr.push({label: item.category.replace(/\s/g,''), value: item.category.replace(/\s/g,'')}),
    );

    const UniqueArray = Array.from(new Set(tempArr.map(item => item.value))).map((value => {
        return tempArr.find(item => item.value === value)
      }))

    setTemp(UniqueArray);
  }, [Transaction]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set Budget</Text>

      <View
        style={{
          alignItems: 'center',
          borderColor: '#ffffff',
          borderWidth: 0.8,
          borderRadius: 5,
          backgroundColor: 'transparent',
          marginBottom:10
        }}>
        <RNPickerSelect
          onValueChange={value => {
            setCategory(value);
          }}
          items={temp}
          value={category}
          placeholder={{label: 'Select the Category', value: ''}}
    
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleSetBudget}>
        <Text style={styles.buttonText}>Set Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SetBudget;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { View, Text, StyleSheet } from 'react-native';

const BudgetSummary = () => {
    const budgets = useSelector((state: RootState) => state.budget.budgets);
    const transactions = useSelector((state: RootState) => state.transaction.transactions);

    const calculateTotalExpenses = (category: string) => {
        return transactions.filter(transaction => transaction.category === category)
            .reduce((total, transaction) => total + transaction.amount, 0);
    };

    const calculateRemainingBudget = (category: string) => {
        const budget = budgets.find(budget => budget.category === category);
        return budget ? budget.amount - calculateTotalExpenses(category) : 0;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Budget Summary</Text>
            {budgets.map(budget => (
                <View key={budget.category} style={styles.budgetItem}>
                    <Text style={styles.category}>{budget.category}</Text>
                   <View style={{flexDirection:"column"}}>
                    <Text style={styles.amount}>Total Budget: {budget.amount} Rs</Text>
                    <Text style={styles.amount}>Remaining: {calculateRemainingBudget(budget.category)} Rs</Text>
                   </View>
                </View>
            ))}
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
    budgetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems:"center",
    
    },
    category: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
    },
});

export default BudgetSummary;

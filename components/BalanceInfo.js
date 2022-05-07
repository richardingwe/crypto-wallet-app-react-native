import { View, Text, Image } from 'react-native';
import React from 'react';

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    );
};

export default BalanceInfo;
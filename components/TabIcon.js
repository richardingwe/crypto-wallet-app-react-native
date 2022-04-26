import { View, Text, Image } from 'react-native';
import React from 'react';

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
    if (isTrade) {
        return (
            <View>
                <Text>Trade</Text>
            </View>
        );
    } else {
        return (
            <View>
                <Text>Tab</Text>
            </View>
        );
    }
};

export default TabIcon;
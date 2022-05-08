import React, { useCallback } from 'react';
import {
    View,
    Text
} from 'react-native';
import MainLayout from "./MainLayout";

import { connect } from 'react-redux';
import { COLORS, dummyData, SIZES } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldings } from "../stores/market/marketActions";

const Portfolio = ({ getHoldings, myHoldings }) => {
    useFocusEffect(
        useCallback(() => {
            getHoldings(holdings = dummyData.holdings);
        }, [])
    );

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    let perChange = valueChange / (totalWallet - valueChange) * 100;

    const renderCurrentBalanceSection = () => {
        return (
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>

            </View>
        );
    };

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header section */}
                {renderCurrentBalanceSection()}

                {/* Chart */}


                {/* your assets */}
            </View>
        </MainLayout>
    );
};


function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getHoldings:
            (holdings, currency, coinList, orderBy, sparkline, priceChangePerc,
                perPage, page) => {
                return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePerc,
                    perPage, page));
            },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
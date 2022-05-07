import React, { useCallback } from 'react';
import {
    View,
    Text
} from 'react-native';

import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/market/marketActions";
import { useFocusEffect } from "@react-navigation/native";

import MainLayout from "./MainLayout";
import { COLORS, dummyData, SIZES } from "../constants";
import { BalanceInfo } from "../components";

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {

    useFocusEffect(
        useCallback(() => {
            getHoldings(holdings = dummyData.holdings);
            getCoinMarket();
        }, [])
    );

    let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
    let valueChange = myHoldings.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0);
    let perChange = valueChange / (totalWallet - valueChange) * 100;

    function renderWalletInfoSection() {
        return (
            <View style={{
                paddingHorizontal: SIZES.padding,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: COLORS.gray
            }}>
                {/* Balance Info */}
                <BalanceInfo
                    title='Your Wallet'
                    displayAmount={totalWallet}
                    changePct={perChange}
                    containerStyle={{
                        marginTop: 50
                    }}
                />

                {/* Buttons */}
            </View>
        );
    }

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header - Wallet Info */}
                {renderWalletInfoSection()}
                {/* Chart */}

                {/* Top Cryptocurrency */}
            </View>
        </MainLayout>
    );
};


function mapStateToProps(state) {
    return {
        myHoldings: state.marketReducer.myHoldings,
        coins: state.marketReducer.coins
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
        getCoinMarket:
            (currency, coinList, orderBy, sparkline,
                priceChangePerc, perPage, page) => {
                return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline,
                    priceChangePerc, perPage, page));
            }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
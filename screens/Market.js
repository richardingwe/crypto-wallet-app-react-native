import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Image
} from 'react-native';
import { connect } from "react-redux";
import { COLORS } from "../constants";
import { getCoinMarket } from "../stores/market/marketActions";
import MainLayout from "./MainLayout";


const Market = ({ getCoinMarket, coins }) => {
    useEffect(() => {
        getCoinMarket();
    }, []);

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header */}

                {/* Tab bar */}

                {/* Buttons */}

                {/* MarketList */}
            </View>
        </MainLayout>
    );
};



function mapStateToProps(state) {
    return {
        coins: state.marketReducer.coins
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCoinMarket:
            (currency, coinList, orderBy, sparkline,
                priceChangePerc, perPage, page) => {
                return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline,
                    priceChangePerc, perPage, page));
            }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
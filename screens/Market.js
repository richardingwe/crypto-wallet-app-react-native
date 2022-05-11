import React, { createRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Image
} from 'react-native';
import { connect } from "react-redux";
import { HeaderBar, TextButton } from "../components";
import { COLORS, constants, FONTS, SIZES } from "../constants";
import { getCoinMarket } from "../stores/market/marketActions";
import MainLayout from "./MainLayout";

const marketTabs = constants.marketTabs.map((marketTab) => ({
    ...marketTab,
    ref: createRef
}));

const Tabs = () => {
    return (
        <View style={{
            flexDirection: 'row'
        }}>

            {/* Tabs */}
            {marketTabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`MarketTab-${index}`}
                        style={{ flex: 1 }}
                    // onPress
                    >
                        <View
                            ref={item.ref}
                            style={{
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 40
                            }}
                        >
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h3
                            }}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};


const Market = ({ getCoinMarket, coins }) => {
    useEffect(() => {
        getCoinMarket();
    }, []);

    const renderTabBar = () => (
        <View style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray
        }}>
            <Tabs />
        </View>
    );

    const renderButtons = () => (
        <View style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius
        }}>
            <TextButton label='USD' />

            <TextButton
                label='% (7d)'
                containerStyle={{
                    marginLeft: SIZES.base
                }}
            />

            <TextButton
                label='Top'
                containerStyle={{
                    marginLeft: SIZES.base
                }}
            />
        </View>
    );

    return (
        <MainLayout>
            <View style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}>
                {/* Header */}
                <HeaderBar title='Market' />

                {/* Tab bar */}
                {renderTabBar()}

                {/* Buttons */}
                {renderButtons()}

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
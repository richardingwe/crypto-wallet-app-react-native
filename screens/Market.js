import React, { createRef, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Image
} from 'react-native';
import { LineChart } from "react-native-chart-kit";
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

    const scrollX = useRef(new Animated.Value(0)).current;

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

    const renderList = () => {
        return (
            <Animated.FlatList
                data={marketTabs}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                onScroll={
                    Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })
                }
                renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            flex: 1,
                            width: SIZES.width
                        }}>
                            <FlatList
                                data={coins}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => {
                                    let priceColor = (item.price_change_percentage_7d_in_currency == 0) ?
                                        COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ?
                                            COLORS.lightGreen : COLORS.red;

                                    return (
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: SIZES.padding,
                                            marginBottom: SIZES.radius
                                        }}>
                                            {/* coins section */}
                                            <View style={{
                                                flex: 1.5,
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <Image
                                                    source={{
                                                        uri: item.image
                                                    }}
                                                    style={{
                                                        height: 20,
                                                        width: 20
                                                    }}
                                                />

                                                <Text style={{
                                                    marginLeft: SIZES.radius,
                                                    color: COLORS.white,
                                                    ...FONTS.h3
                                                }}>
                                                    {item.name}
                                                </Text>
                                            </View>

                                            {/* lineChart section */}
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                            }}>
                                                <LineChart
                                                    withVerticalLabels={false}
                                                    withHorizontalLabels={false}
                                                    withDots={false}
                                                    withInnerLines={false}
                                                    withVerticalLines={false}
                                                    withOuterLines={false}
                                                    data={{
                                                        datasets: [
                                                            {
                                                                data: item.sparkline_in_7d.price
                                                            }
                                                        ]
                                                    }}
                                                    width={100}
                                                    height={60}
                                                    chartConfig={{
                                                        color: () => priceColor
                                                    }}
                                                    bezier
                                                    style={{
                                                        paddingRight: 0
                                                    }}
                                                />
                                            </View>

                                            {/* figures section */}
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    );
                }}
            />

        );
    };

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
                {renderList()}
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
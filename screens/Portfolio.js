import React, { useCallback, useState } from 'react';
import {
    View,
    Text, FlatList, TouchableOpacity, Image
} from 'react-native';
import MainLayout from "./MainLayout";

import { connect } from 'react-redux';
import { COLORS, dummyData, FONTS, icons, SIZES } from "../constants";
import { useFocusEffect } from "@react-navigation/native";
import { getHoldings } from "../stores/market/marketActions";
import { BalanceInfo, Chart } from "../components";

const Portfolio = ({ getHoldings, myHoldings }) => {
    const [selectedCoin, setSelectedCoin] = useState(null);

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
                <Text style={{
                    marginTop: 30,
                    color: COLORS.white,
                    ...FONTS.largeTitle
                }}>Portolio</Text>

                <BalanceInfo
                    title='Current Balance'
                    displayAmount={totalWallet}
                    changePct={perChange}
                    containerStyle={{
                        marginTop: SIZES.radius,
                        marginBottom: SIZES.padding
                    }}
                />
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
                <Chart
                    containerStyle={{
                        marginTop: SIZES.radius
                    }}
                    chartPrices={selectedCoin ? selectedCoin.sparkline_in_7d?.value : myHoldings[0]?.sparkline_in_7d?.value}
                />

                {/* your assets */}
                <FlatList
                    data={myHoldings}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                    }}
                    ListHeaderComponent={
                        <View style={{
                            marginBottom: SIZES.radius
                        }}>
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.h2,
                            }}>Your Assets</Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius
                            }}>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                }}>Assets</Text>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                    textAlign: 'right'
                                }}>Price</Text>
                                <Text style={{
                                    flex: 1,
                                    color: COLORS.lightGray3,
                                    textAlign: 'right'
                                }}>Holdings</Text>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) => {
                        let priceColor = (item.price_change_percentage_7d_in_currency == 0) ?
                            COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0) ?
                                COLORS.lightGreen : COLORS.red;

                        return (
                            <TouchableOpacity
                                style={{
                                    height: 55,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center'
                                }}
                                onPress={() => setSelectedCoin(item)}
                            >
                                {/* Asset */}
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }}
                                    />
                                    {/* name */}
                                    <View style={{
                                        flex: 1
                                    }}>
                                        <Text style={{
                                            color: COLORS.white,
                                            ...FONTS.h4,
                                            marginLeft: SIZES.radius
                                        }}>{item.name}</Text>
                                    </View>
                                </View>

                                {/* price */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4,
                                        lineHeight: 15
                                    }}>$ {item.current_price.toLocaleString()}
                                    </Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}>
                                        {
                                            item.price_change_percentage_7d_in_currency != 0 &&
                                            <Image
                                                source={icons.upArrow}
                                                style={{
                                                    height: 10,
                                                    width: 10,
                                                    tintColor: priceColor,
                                                    transform: (item.price_change_percentage_7d_in_currency > 0) ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }],
                                                }}
                                            />
                                        }

                                        <Text style={{
                                            marginLeft: 5,
                                            color: priceColor,
                                            ...FONTS.body5,
                                            lineHeight: 15
                                        }}>
                                            {(item.price_change_percentage_7d_in_currency || 0).toFixed(2)}%
                                        </Text>
                                    </View>
                                </View>

                                {/* holdings */}
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.white,
                                        ...FONTS.h4,
                                        lineHeight: 15
                                    }}
                                    >$
                                        {item.total.toFixed(2).toLocaleString()}
                                    </Text>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: COLORS.lightGray3,
                                        ...FONTS.body5,
                                        lineHeight: 15
                                    }}>
                                        {item.qty} {item.symbol.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListFooterComponent={
                        <View style={{
                            marginBottom: 50
                        }} />
                    }
                />
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
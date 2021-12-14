import React from 'react'
import { View, Text } from 'react-native'

export default function Doctor(props) {
    return (
        <View>
            <Text>my name is {props.name}</Text>
            <Text>this is home page</Text>
        </View>
    )
}

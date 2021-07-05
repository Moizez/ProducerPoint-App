import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import LottieView from 'lottie-react-native'

const LoadScreen = ({ msg }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.image}
            />
            <Text style={{
                fontSize: 25,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: 0.5,
                marginBottom: 5
            }}>producer point
            </Text>
            <Text style={styles.text}>{msg}</Text>
            <LottieView style={{ height: 80 }} source={require('../../assets/lottie/loading3.json')} autoPlay loop />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#FFF', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' },
    image: { height: 225, width: 225, marginBottom: 10 },
    text: {
        fontSize: 14,
        letterSpacing: 0.5,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: -15
    }

})

export default LoadScreen
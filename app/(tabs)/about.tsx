import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
    return (
        <View style={style.container}>
            <Text style={style.text}>About This App</Text>
            <Text style={style.paragraph}>
                About Screen
            </Text>
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    paragraph: {
        color: 'gray',
        fontSize: 16,
    }
});
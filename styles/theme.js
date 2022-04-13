import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#55585b',
        primary: '#0366d6',
        appBar: '#ffffff'
    },
    backColors: {
        appBar: '#24292e',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        header: 24
    },
    fonts: {
        main: Platform.select({
            ios: 'Arial',
            android: 'Roboto',
            default: 'System'
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;
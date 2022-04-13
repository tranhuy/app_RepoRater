import { useState } from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const [ inputHeight, setInputHeight ] = useState(40);
  const textInputStyle = [styles.input, style, { height: inputHeight } ];


  return <NativeTextInput style={textInputStyle} {...props} onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)} />;
};

export default TextInput;
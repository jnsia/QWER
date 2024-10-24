import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '@/constants/Theme'

export default function SubmitButton({
  text,
  onPressEvent,
}: {
  text: string
  onPressEvent: () => void
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPressEvent}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.tint
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '@/constants/Theme'

export default function QuestCreateButton({
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
    justifyContent: 'center',
    backgroundColor: theme.colors.tint,
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import theme from '@/constants/Theme'

export default function Badge({ type }: { type: string }) {
  return (
    <View style={styles.badge}>
      {type == 'normal' && <Text style={styles.badgeText}>일반</Text>}
      {type == 'epic' && <Text style={styles.badgeText}>에픽</Text>}
      {type == 'daily' && <Text style={styles.badgeText}>일일</Text>}
      {type == 'emergency' && <Text style={styles.badgeText}>긴급</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    justifyContent: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 8,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: theme.colors.text,
  },
})

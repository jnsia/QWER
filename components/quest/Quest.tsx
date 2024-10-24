import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import theme from '@/constants/Theme'
import Badge from '../common/Badge'
import { colors } from '@/constants/Colors'

export default function Quest({
  quest,
  clickEvent,
}: {
  quest: quest
  clickEvent: (quest: quest) => void
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => clickEvent(quest)}
    >
      <Badge type={quest.type} />
      <Text
        style={styles.itemText}
        numberOfLines={1}
      >
        {quest.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    flex: 1,
    color: theme.colors.text,
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    marginBottom: 8,
  },
  completedItemText: {
    fontSize: 14,
    color: 'white',
  },
})

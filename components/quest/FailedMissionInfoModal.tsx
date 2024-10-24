import { View, Text, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import theme from '@/constants/Theme'
import CancelButton from '../common/CancelButton'

export default function FailedMissionInfoModal({
  failedQuestsVisible,
  closeFailedQuestsModal,
  failedQuests,
}: {
  failedQuestsVisible: boolean
  closeFailedQuestsModal: () => void
  failedQuests: quest[]
}) {
  // const [totalLostPoint, setTotalLostPoint] = useState(0)

  // const calcTotalLostPoint = () => {
  //   setTotalLostPoint(failedQuests.reduce((total, { point }) => total + point, 0))
  // }

  // useEffect(() => {
  //   calcTotalLostPoint()
  // }, [failedQuests])

  return (
    <Modal animationType="fade" visible={failedQuestsVisible} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>실패한 미션 목록</Text>
          <ScrollView>
            {failedQuests.map((failedMission) => (
              <View key={failedMission.id} style={styles.missionInfo}>
                <View style={styles.badge}>
                  {failedMission.type == 'daily' && <Text style={styles.badgeText}>일일</Text>}
                  {failedMission.type == 'emergency' && <Text style={styles.badgeText}>긴급</Text>}
                </View>
                <Text style={styles.missionInfoText}>{failedMission.title}</Text>
              </View>
            ))}
          </ScrollView>
          {/* <View style={styles.lostCoinInfo}>
            <Text style={styles.lostCoinInfoText}>전체 잃은 코인</Text>
          </View> */}
          <CancelButton text="확인" onPressEvent={closeFailedQuestsModal} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    position: 'absolute',
    width: '90%',
    padding: 16,
    marginTop: 60,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalTextStyle: {
    color: '#17191c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  missionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  missionInfoText: {
    fontSize: 12,
    color: theme.colors.text,
  },
  lostCoinInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  lostCoinInfoText: {
    fontSize: 14,
  },
  missionInfoSubText: {
    fontSize: 12,
  },
  badge: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 8,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: theme.colors.text,
  },
})

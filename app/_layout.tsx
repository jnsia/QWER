import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { setNotificationListeners } from '@/lib/pushNotification'
import theme from '@/constants/Theme'

export default function RootLayout() {
  useEffect(() => {
    // setNotificationListeners()
  }, [])

  return (
    <>
      <StatusBar
        barStyle="light-content" // 상태바 아이콘을 밝게 표시
        translucent={true} // 상태바를 투명하게 설정
        backgroundColor="transparent" // 상태바의 배경을 투명하게 설정
      />
      <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // 상태바 높이만큼 패딩 추가 (모든 화면에 적용)
    backgroundColor: theme.colors.background,
  },
})

import Header from "@/components/common/Header";
import { colors } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <>
      <StatusBar
        barStyle="light-content" // 상태바 아이콘을 밝게 표시 (아이콘 색상: 하얀색)
        backgroundColor="#1c1f2a" // 상태바 배경색
        // translucent={true}
      />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === "(index)") {
              iconName = "list";
            } else if (route.name === "schedule") {
              iconName = "clipboard"
            } else if (route.name === "calendar") {
              iconName = "calendar"
            } else if (route.name === "inventory") {
              iconName = "square"
            }

            // @ts-expect-error
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: colors.accent,
          // tabBarInactiveTintColor: colors.lightGray,
          tabBarStyle: {
            // backgroundColor: colors.darkGray,
            borderTopWidth: 0,
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
          },
          tabBarItemStyle: {
            borderRadius: 10,
            margin: 10,
          },
        })}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Quest",
            headerShown: true,
            // header: () => <Header />,
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            headerShown: true,
            // header: () => <Header />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: true,
            // header: () => <Header />,
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: "Inventory",
            headerShown: true,
            // header: () => <Header />,
          }}
        />
      </Tabs>
    </>
  );
}

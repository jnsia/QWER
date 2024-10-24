import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import FailedMissionInfoModal from "@/components/quest/FailedMissionInfoModal";
import { supabase } from "@/lib/supabase";
import theme from "@/constants/Theme";
import Quest from "@/components/quest/Quest";
import QuestCreateButton from "@/components/quest/QuestCreateButton";
import QuestCreateModal from "@/components/quest/QuestCreateModal";

export default function HomeScreen() {
  const [quests, setQuests] = useState<quest[]>([]);
  const [failedQuests, setFailedQuests] = useState<quest[]>([]);
  const [createQuestModalVisible, setCreateQuestModalVisible] = useState(false);
  const [failedQuestsVisible, setFailedQuestsVisible] = useState(false);

  const openCreateQuestModal = () => {
    setCreateQuestModalVisible(true);
  };

  const closeCreateQuestModal = () => {
    setCreateQuestModalVisible(false);
  };

  const closeFailedQuestsModal = () => {
    try {
      failedQuests.forEach(async (failedMission) => {
        await supabase.from("failedQuests").delete().eq("id", failedMission.id);
      });
    } catch (error) {
      console.error(error);
      return;
    }

    setFailedQuests([]);
    setFailedQuestsVisible(false);
  };

  const getQuests = async () => {
    try {
      const { data, error } = await supabase.from("quests").select();

      if (error) {
        console.error("index mission fetching fail:", error.message);
        return;
      }

      setQuests(data);
    } catch (error: any) {
      console.error("index mission fetching fail:", error.message);
    }
  };

  const getFailedQuests = async () => {
    const { data, error } = await supabase.from("failedQuests").select();

    if (error) {
      console.error(error);
      return;
    }

    if (data.length > 0) {
      setFailedQuests(data);
      setFailedQuestsVisible(true);
    }
  };

  const clearQuest = async (quest: quest) => {
    const offset = new Date().getTimezoneOffset() * 60000
    const today = new Date(Date.now() - offset).toISOString().substring(0, 10)

    const { error } = await supabase.from('histories').insert({
      title: quest.title,
      date: today,
      type: quest.type,
      completed: true
    })

    if (error) {
      console.error(error)
      return
    }

    await supabase.from('quests').delete().eq('id', quest.id)

    getQuests()
  }

  const clickQuest = (quest: quest) => {
    Alert.alert(
      '퀘스트 완료 여부',
      `${quest.title} 퀘스트 완료하셨나요?`,
      [
        {
          text: '아니요.',
        },
        {
          text: '네!',
          onPress: () => {
            clearQuest(quest)
          },
        },
      ],
      { cancelable: false },
    )
  }

  useFocusEffect(
    useCallback(() => {
      getQuests();
      getFailedQuests();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {quests.map((quest) => (
            <View key={quest.id}>
              <Quest quest={quest} clickEvent={() => clickQuest(quest)} />
            </View>
          ))}
        </View>
      </ScrollView>
      <QuestCreateButton text="퀘스트 생성" onPressEvent={openCreateQuestModal} />
      <QuestCreateModal 
        getQuests={getQuests}
        createQuestModalVisible={createQuestModalVisible}
        closeCreateQuestModal={closeCreateQuestModal}
      />
      <FailedMissionInfoModal
        failedQuests={failedQuests}
        failedQuestsVisible={failedQuestsVisible}
        closeFailedQuestsModal={closeFailedQuestsModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF6347",
  },
});

import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import SubmitButton from "../common/SubmitButton";
import CancelButton from "../common/CancelButton";
import theme from "@/constants/Theme";
import { supabase } from "@/lib/supabase";

export default function QuestCreateModal({
  getQuests,
  createQuestModalVisible,
  closeCreateQuestModal,
}: {
  getQuests: () => void;
  createQuestModalVisible: boolean;
  closeCreateQuestModal: () => void;
}) {
  const [type, setType] = useState("normal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rewardType, setRewardType] = useState("item");
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");

  const createQuest = async () => {
    if (title == "") return;

    const { error } = await supabase.from("quests").insert({
      title,
      type,
      reward,
    });

    if (error) {
      console.error(error);
      return;
    }

    setType("normal");
    setTitle("");
    setReward("");

    getQuests();
    closeCreateQuestModal();
  };

  const selectType = (type: string) => {
    setType(type);
  };

  const selectRewardType = (type: string) => {
    setRewardType(type);
  };

  return (
    <Modal
      animationType="fade"
      visible={createQuestModalVisible}
      transparent={true}
      onRequestClose={closeCreateQuestModal}
    >
      <TouchableWithoutFeedback onPress={closeCreateQuestModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={styles.modalView}
            >
              <ScrollView>
                <Text style={styles.label}>퀘스트 종류</Text>
                <View style={styles.typeSelectBox}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === "normal" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectType("normal")}
                  >
                    <Text style={styles.typeText}>일반</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === "epic" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectType("epic")}
                  >
                    <Text style={styles.typeText}>에픽</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === "daily" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectType("daily")}
                  >
                    <Text style={styles.typeText}>일일</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === "emergency" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectQuestType("emergency")}
                  >
                    <Text style={styles.typeText}>긴급</Text>
                  </TouchableOpacity> */}
                </View>

                <Text style={styles.label}>퀘스트 이름</Text>
                <TextInput
                  style={styles.input}
                  placeholder="퀘스트 이름을 입력해주세요."
                  value={title}
                  onChangeText={setTitle}
                />

                {/* <Text style={styles.label}>퀘스트 내용</Text>
                <TextInput
                  style={styles.input}
                  placeholder="퀘스트에 대한 설명을 입력해주세요."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                /> */}

                {/* <Text style={styles.label}>보상 종류</Text>
                <View style={styles.typeSelectBox}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      rewardType === "item" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectRewardType("item")}
                  >
                    <Text style={styles.typeText}>아이템</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      rewardType === "gold" && styles.selectedTypeButton,
                    ]}
                    onPress={() => selectRewardType("gold")}
                  >
                    <Text style={styles.typeText}>골드</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.label}>보상</Text>
                {rewardType === "gold" ? (
                  <TextInput
                    style={styles.input}
                    placeholder="100"
                    value={reward}
                    onChangeText={setReward}
                  />
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder="아이템 이름을 입력해주세요."
                    value={reward}
                    onChangeText={setReward}
                  />
                )}

                <View>
                  <Text style={styles.label}>제한시간</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={deadline}
                    onChangeText={setDeadline}
                  />
                </View> */}

                <View style={{ flexDirection: "row", gap: 16, marginTop: 8 }}>
                  <CancelButton
                    text="취소하기"
                    onPressEvent={closeCreateQuestModal}
                  />
                  <SubmitButton text="저장하기" onPressEvent={createQuest} />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경을 반투명하게 설정
  },
  modalView: {
    flex: 1,
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 16,
    marginTop: 60,
    backgroundColor: "white",
  },
  typeSelectBox: {
    flex: 1,
    gap: 16,
    flexDirection: "row",
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  selectedTypeButton: {
    borderColor: theme.colors.tint, // 선택된 버튼의 border 색상
  },
  typeText: {
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

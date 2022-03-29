import React, { memo, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddItem {
  onPressAdd: (value: string) => void;
}

export default memo(function AddItem({ onPressAdd }: AddItem) {
  const [inputItem, setInputItem] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={inputItem}
        onChangeText={(val) => setInputItem(val)}
        onSubmitEditing={(val) => {
          onPressAdd(inputItem);
          setInputItem("");
        }}
        style={styles.inputWrap}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={!inputItem}
        onPress={() => {
          onPressAdd(inputItem);
          setInputItem("");
        }}
        style={[styles.addBtn, !inputItem && { backgroundColor: "#b3b3b3" }]}
      >
        <Image
          source={require("../../assets/add-icon.png")}
          resizeMode="contain"
          style={styles.addImg}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: "#dadada",
  },
  inputWrap: {
    flex: 1,
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
    padding: 8,
    fontSize: 16,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#279bc9",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  addImg: {
    width: 20,
    height: 20,
  },
});

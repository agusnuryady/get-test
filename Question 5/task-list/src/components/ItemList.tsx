import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, memo, SetStateAction, useCallback } from "react";

type Data = {
  title: string;
  isCheck: boolean;
};

interface ItemTask {
  data: Data[];
  setData: Dispatch<SetStateAction<Data[]>>;
  itemTask: Data;
  indexTask: number;
}

export default memo(function ItemList({
  data,
  setData,
  itemTask,
  indexTask,
}: ItemTask) {
  const handleCheckItem = useCallback(
    (indexItem: number) => {
      let newItem = [...data];
      newItem[indexItem].isCheck = !newItem[indexItem].isCheck;
      setData(newItem);
    },
    [data]
  );

  const handleEditTitleItem = useCallback(
    (value: string, indexItem: number) => {
      let newItem = [...data];
      newItem[indexItem].title = value;
      setData(newItem);
    },
    [data]
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.checkBox}
        onPress={() => handleCheckItem(indexTask)}
      >
        {itemTask.isCheck && (
          <Image
            source={require("../../assets/check-icon.png")}
            resizeMode="contain"
            style={styles.checkImg}
          />
        )}
      </TouchableOpacity>
      <TextInput
        value={itemTask.title}
        onChangeText={(val) => handleEditTitleItem(val, indexTask)}
        style={[
          styles.title,
          itemTask.isCheck && { textDecorationLine: "line-through" },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ebebeb",
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkImg: {
    width: 14,
    height: 14,
  },
  title: {
    width: "100%",
    fontSize: 16,
    color: "#303030",
  },
});

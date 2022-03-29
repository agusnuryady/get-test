import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import AddItem from "../components/AddItem";

import Header from "../components/Header";
import List from "../components/List";

interface Data {
  title: string;
  isCheck: boolean;
}

export default function App() {
  const [data, setData] = useState<Data[]>([]);

  const handleAddItem = useCallback(
    (value: string) => {
      setData((prevState) => [...prevState, { title: value, isCheck: false }]);
    },
    [data]
  );

  const handleDeleteItem = useCallback(() => {
    setData(data.filter((item) => !item.isCheck));
  }, [data]);

  const handleSelectAll = useCallback(
    (type: boolean) => {
      const newArr: Data[] = [];
      data.forEach((item) => {
        const body = {
          ...item,
          isCheck: type,
        };
        newArr.push(body);
      });
      setData(newArr);
    },
    [data]
  );

  return (
    <View style={styles.container}>
      <Header
        title="Task List"
        isOptionVisible={data.length !== 0}
        isDeleteVisible={data.filter((item) => item.isCheck).length !== 0}
        isSelectAll={data.filter((item) => item.isCheck).length === data.length}
        onPressDelete={handleDeleteItem}
        onSelectAll={handleSelectAll}
      />
      <List data={data} setData={setData} />
      <AddItem onPressAdd={handleAddItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
});

import React, { Dispatch, memo, SetStateAction } from "react";
import { Text, FlatList, StyleSheet } from "react-native";

import ItemList from "./ItemList";

type Data = {
  title: string;
  isCheck: boolean;
};

interface List {
  setData: Dispatch<SetStateAction<Data[]>>;
  itemTask: {
    itemTask: Data;
    indexTask: number;
  };
  data: Data[];
}

export default memo(function List({ data, setData }: Omit<List, "itemTask">) {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => `item ${index + 1}`}
      maxToRenderPerBatch={15}
      updateCellsBatchingPeriod={30}
      windowSize={15}
      renderItem={({ item, index }) => (
        <ItemList
          itemTask={item}
          indexTask={index}
          data={data}
          setData={setData}
        />
      )}
      ListEmptyComponent={<Text>Your item is still empty</Text>}
      style={{ flex: 1 }}
      contentContainerStyle={data.length === 0 && styles.emptyContainer}
    />
  );
});

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

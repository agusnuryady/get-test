import React, { memo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  StatusBar,
} from "react-native";

interface header {
  title: string;
  style?: ViewStyle;
  isOptionVisible: boolean;
  isDeleteVisible: boolean;
  isSelectAll: boolean;
  onPressDelete: () => void;
  onSelectAll: (type: boolean) => void;
}

export default memo(function Header({
  title,
  style,
  isOptionVisible,
  isDeleteVisible,
  isSelectAll,
  onPressDelete,
  onSelectAll,
}: header) {
  return (
    <View style={[styles.container, style]}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <Text style={styles.title}>{title}</Text>
      {isOptionVisible && (
        <View style={styles.optionWrap}>
          <View style={styles.rowCenter}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.checkBox}
              onPress={() => onSelectAll(!isSelectAll)}
            >
              {isSelectAll && (
                <Image
                  source={require("../../assets/check-icon.png")}
                  resizeMode="contain"
                  style={styles.checkImg}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.smallTxt}>Select All</Text>
          </View>
          {isDeleteVisible && (
            <TouchableOpacity activeOpacity={0.5} onPress={onPressDelete}>
              <Text style={styles.deleteTxt}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 0.5,
    borderBottomColor: "#dadada",
  },
  optionWrap: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    textAlign: "center",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallTxt: {
    fontSize: 12,
    color: "#1e7bf5",
    marginLeft: 8,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteTxt: {
    fontSize: 12,
    color: "#dd2020",
  },
  checkImg: {
    width: 14,
    height: 14,
  },
});

import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";
import ModalAnimated, { ModalProps } from "react-native-modal";
import { useRef, useState } from "react";

interface IModal extends Partial<ModalProps> {
  title: string;
  onRequestClose: () => void;
  children: React.ReactNode;
  scrollViewProps?: ScrollViewProps;
}

export default function Modal({ title, ...props }: IModal) {
  const theme = useTheme();
  const refScrollView = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const styles = StyleSheet.create({
    modalWrapper: {
      justifyContent: "flex-end",
      margin: 0,
      flex: 1,
      height: "100%",
    },
    modal: {
      minHeight: 400,
      maxHeight: "85%",
      justifyContent: "flex-end",
      backgroundColor: theme.colors.background,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
    },
    titleContainer: {
      paddingVertical: 10,
      alignItems: "center",
      gap: 15,
    },
    divider: {
      backgroundColor: "#333",
      width: "45%",
      height: 5,
      borderRadius: 5,
    },
    title: {
      fontSize: 20,
      textAlign: "center",
      fontFamily: "bold",
    },
    modalContent: {
      paddingTop: 0,
      marginBottom: 35,
      paddingHorizontal: 20,
    },
  });

  const handleScrollTo = (p: { x: number; y: number }) => {
    if (refScrollView.current) {
      refScrollView.current.scrollTo(p);
    }
  };

  return (
    <ModalAnimated
      swipeDirection={["down"]}
      style={styles.modalWrapper}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={400 - 300}
      propagateSwipe={true}
      swipeThreshold={200}
      useNativeDriverForBackdrop
      onBackdropPress={() => props.onRequestClose()}
      avoidKeyboard
      onSwipeComplete={props.onRequestClose}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      {...props}
    >
      <View style={styles.modal}>
        <View style={styles.titleContainer}>
          <Divider style={styles.divider} />

          <Text style={styles.title}>{title}</Text>
        </View>

        <ScrollView
          bounces={false}
          ref={refScrollView}
          style={styles.modalContent}
          onScroll={(event) => setScrollOffset(event.nativeEvent.contentOffset.y)}
          {...props.scrollViewProps}
        >
          {props.children}
        </ScrollView>
      </View>
    </ModalAnimated>
  );
}

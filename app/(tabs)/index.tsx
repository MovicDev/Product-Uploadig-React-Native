import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import { ProductProvider } from "@/context/productContext";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <ProductProvider>
      <SafeAreaView style={{ flex: 1,
    backgroundColor: "#F8FAFC" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <KeyboardAvoidingView
          style={{flex:1}}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <ScrollView>
          <ProductForm />
          <ProductList />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ProductProvider>
  );
};

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default HomeScreen;

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import { ProductContext } from "../context/productContext";

export default function ProductForm() {
  const { state, dispatch } = useContext(ProductContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addProduct = () => {
    if (state.products.length >= 5) {
      Alert.alert("Limit reached", "You can only add up to 5 products.");
      return;
    }

    if (!name || !price || !image) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        id: String(uuid.v4()),
        name,
        price,
        image,
      },
    });

    setName("");
    setPrice("");
    setImage(null);
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#F8FAFC" }}>
      <View className="bg-red-500  p-2 mb-6 rounded">

      <Text  style={{ fontSize: 24, fontWeight: "bold", color: "#1E293B", marginBottom: 25, textAlign: "center" }}>
        Add New Product 
      </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Ionicons name="pricetag-outline" size={16} color="#64748B" />
          <Text style={{ marginLeft: 8, color: "#64748B", fontWeight: "600", fontSize: 14 }}>
            Product Name
          </Text>
        </View>
        <TextInput
          placeholder="Enter product name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={setName}
          style={{
            height: 52,
            borderColor: "#E2E8F0",
            borderWidth: 2,
            borderRadius: 12,
            paddingHorizontal: 16,
            backgroundColor: "white",
            fontSize: 16,
            color: "#1E293B",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Ionicons name="cash-outline" size={16} color="#64748B" />
          <Text style={{ marginLeft: 8, color: "#64748B", fontWeight: "600", fontSize: 14 }}>
            Price
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ 
            height: 52, 
            backgroundColor: "#3B82F6", 
            borderTopLeftRadius: 12, 
            borderBottomLeftRadius: 12,
            justifyContent: "center",
            paddingHorizontal: 16,
            minWidth: 60
          }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>₦</Text>
          </View>
          <TextInput
            placeholder="0.00"
            placeholderTextColor="#94A3B8"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{
              flex: 1,
              height: 52,
              borderColor: "#E2E8F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
              paddingHorizontal: 16,
              backgroundColor: "white",
              fontSize: 16,
              color: "#1E293B",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 2,
              elevation: 2,
            }}
          />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Ionicons name="image-outline" size={16} color="#64748B" />
          <Text style={{ marginLeft: 8, color: "#64748B", fontWeight: "600", fontSize: 14 }}>
            Product Image
          </Text>
        </View>
        <TouchableOpacity 
          onPress={pickImage} 
          style={{ 
            height: 140,
            borderWidth: 2,
            borderColor: "#E2E8F0",
            borderStyle: image ? "solid" : "dashed",
            borderRadius: 16,
            backgroundColor: image ? "#F1F5F9" : "white",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          {image ? (
            <Image 
              source={{ uri: image }} 
              style={{ 
                width: "100%", 
                height: "100%",
                borderRadius: 14
              }} 
              resizeMode="cover"
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <View style={{ 
                width: 50, 
                height: 50, 
                borderRadius: 25, 
                backgroundColor: "#3B82F6",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12
              }}>
                <Ionicons name="cloud-upload-outline" size={24} color="white" />
              </View>
              <Text style={{ color: "#64748B", fontSize: 16, fontWeight: "500" }}>
                Tap to upload image
              </Text>
              <Text style={{ color: "#94A3B8", fontSize: 12, marginTop: 4 }}>
                JPG, PNG, GIF supported
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={addProduct}
        disabled={!name || !price || !image}
        style={{
          height: 56,
          backgroundColor: (!name || !price || !image) ? "#CBD5E1" : "#3B82F6",
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          shadowColor: "#3B82F6",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <Ionicons name="add-circle-outline" size={22} color="white" />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
          Add Product
        </Text>
      </TouchableOpacity>

      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        marginTop: 20,
        padding: 12,
        backgroundColor: "#FEF3C7",
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#F59E0B"
      }}>
        <Ionicons name="information-circle-outline" size={20} color="#D97706" />
        <Text style={{ color: "#92400E", marginLeft: 10, fontSize: 12, flex: 1 }}>
          {`You have added ${state.products.length} of 5 products`}
        </Text>
      </View>
    </View>
  );
}
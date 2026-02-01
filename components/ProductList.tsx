import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ProductContext } from "../context/productContext";

const ProductList = () => {
  const { state } = useContext(ProductContext);

  const renderEmptyList = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
        paddingHorizontal: 40,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#F1F5F9",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons name="cube-outline" size={50} color="#CBD5E1" />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#1E293B",
          marginBottom: 8,
        }}
      >
        No Products Yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#64748B",
          textAlign: "center",
          lineHeight: 20,
        }}
      >
        Add your first product to see it appear here
      </Text>
    </View>
  );

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return "₦0";
    return `₦${numPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={{ flex: 1 }}>
      {state.products.length === 0 ? (
        renderEmptyList()
      ) : (
        <FlatList
          data={state.products}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
                borderWidth: 1,
                borderColor: "#F1F5F9",
                marginHorizontal: 16,
              }}
              activeOpacity={0.7}
            >
              {/* Serial Number */}
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#3B82F6",
                  }}
                >
                  {index + 1}
                </Text>
              </View>

              {/* The  Product Image */}
              <View
                style={{
                  position: "relative",
                  width: 70,
                  height: 70,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  contentFit="cover"
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.02)",
                  }}
                />
              </View>

              {/* Product Info */}
              <View
                style={{
                  flex: 1,
                  marginLeft: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#1E293B",
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#3B82F6",
                    marginBottom: 6,
                  }}
                >
                  {formatPrice(item.price)}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ProductList;

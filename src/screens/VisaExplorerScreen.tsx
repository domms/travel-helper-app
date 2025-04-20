import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import AuthenticatedLayout from '../layout/AuthenticatedLayout';

const VisaExplorerScreen = () => {
  const [searchDestinationQuery, setSearchDestinationQuery] = useState('');
  const [searchPassportQuery, setSearchPassportQuery] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [passportCountry, setPassportCountry] = useState('United States');
  const [visaData, setVisaData] = useState<any>(null);
  const [passportOptions, setPassportOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPassportCountries = async () => {
    const snapshot = await getDocs(collection(db, 'visa_rules'));
    const countries = snapshot.docs.map((doc) => doc.id);
    setPassportOptions(countries);
  };

  const fetchVisaData = async (country: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'visa_rules', country);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVisaData(docSnap.data());
      } else {
        setVisaData({});
      }
    } catch (err) {
      console.error('Error fetching visa data:', err);
      setVisaData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassportCountries();
  }, []);

  useEffect(() => {
    fetchVisaData(passportCountry);
  }, [passportCountry]);

  const filteredOptions = passportOptions.filter((country) =>
    country.toLowerCase().includes(searchPassportQuery.toLowerCase()),
  );

  return (
    <AuthenticatedLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white px-4 py-6">
          <Text className="text-primary text-2xl font-bold mb-4">
            Visa Explorer
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="border border-gray-400 bg-white px-4 py-3 rounded mb-2 shadow-sm active:scale-95 transition-transform duration-150"
          >
            <Text className="text-black text-center font-semibold text-lg tracking-wide">
              Passport: {passportCountry}
            </Text>
          </TouchableOpacity>
          <Text className="text-xs text-muted-foreground text-center mb-2">
            Tap above to change your passport country
          </Text>
          <TextInput
            placeholder="Search destination countries"
            placeholderTextColor="#aaa"
            value={searchDestinationQuery}
            onChangeText={setSearchDestinationQuery}
            className="border border-gray-300 px-3 py-2 mb-4 rounded text-black"
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="flex-1 bg-white justify-center px-4">
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  className="w-full flex-1"
                >
                  <SafeAreaView className="bg-white rounded-lg p-4 h-[90%]">
                    <TextInput
                      placeholder="Search for your passport country"
                      placeholderTextColor="#aaa"
                      value={searchPassportQuery}
                      onChangeText={setSearchPassportQuery}
                      className="border border-gray-300 px-3 py-2 mb-4 rounded text-black"
                    />
                    <ScrollView
                      className="space-y-2"
                      keyboardShouldPersistTaps="handled"
                    >
                      {filteredOptions.map((country) => (
                        <TouchableOpacity
                          key={country}
                          onPress={() => {
                            setPassportCountry(country);
                            setSearchPassportQuery('');
                            setModalVisible(false);
                          }}
                          className="bg-gray-100 px-4 py-3 rounded shadow-sm hover:bg-gray-200"
                        >
                          <Text className="text-black font-medium text-base">
                            {country}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      className="mt-4"
                    >
                      <Text className="text-center text-blue-500 font-medium">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={
                visaData
                  ? Object.entries(visaData).filter(([country]) =>
                      country
                        .toLowerCase()
                        .includes(searchDestinationQuery.toLowerCase()),
                    )
                  : []
              }
              keyExtractor={([country]) => country}
              renderItem={({ item }) => {
                const [country, info] = item as [string, { visa_type: string }];
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCountry(country);
                      setDetailModalVisible(true);
                    }}
                    className="bg-gray-100 p-4 rounded-lg mb-2 shadow-sm flex-row items-center"
                  >
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-black mb-1">
                        {country}
                      </Text>
                      <Text className="text-gray-600 mb-1">
                        {typeof info.visa_type === 'number' ||
                        (!isNaN(Number(info.visa_type)) &&
                          info.visa_type !== '')
                          ? `Visa Type: Visa free for ${info.visa_type} days`
                          : `Visa Type: ${info.visa_type}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>

      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-white rounded-t-2xl p-6 h-[50%]">
            <Text className="text-xl font-bold mb-2">{selectedCountry}</Text>
            <Text className="text-gray-700 mb-2">
              Live Weather Info (Coming Soon)
            </Text>
            <View className="mb-4">
              <Text className="text-sm text-gray-500">
                🌤️ Current: -- °C, Clear
              </Text>
              <Text className="text-sm text-gray-500">
                🌦️ Forecast: Mon - Rainy, Tue - Cloudy, Wed - Sunny
              </Text>
            </View>
            {/* Future details like internet speed, weather, etc. */}
            <TouchableOpacity
              onPress={() => setDetailModalVisible(false)}
              className="mt-auto bg-blue-500 p-3 rounded"
            >
              <Text className="text-white text-center font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AuthenticatedLayout>
  );
};

export default VisaExplorerScreen;

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  SectionList,
  Switch,
  TextInput,
  VirtualizedList,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';

export default function App() {
  const [expandedSections, setExpandedSections] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [timesPressed, setTimesPressed] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, onChangeText] = useState('');
  const [touchHighlight, setTouchHighlight] = useState(0);
  const [touchOpacity, setTouchOpacity] = useState(0);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const flatListData = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
  ];

  const sectionListData = [
    { title: 'Main dishes', data: ['Pizza', 'Burger', 'Risotto'] },
    { title: 'Sides', data: ['French Fries', 'Onion Rings'] },
    { title: 'Drinks', data: ['Water', 'Coke', 'Beer'] },
  ];

  const getItem = (_data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: Item ${index + 1},
  });

  const getItemCount = (_data) => 20;

  const AccordionSection = ({ title, children }) => (
    <View style={styles.accordion}>
      <Pressable
        style={styles.accordionHeader}
        onPress={() => toggleSection(title)}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={styles.accordionIcon}>
          {expandedSections[title] ? '−' : '+'}
        </Text>
      </Pressable>
      {expandedSections[title] && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.mainTitle}>React Native</Text>
        <Text style={styles.subtitle}>Component Explorer</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <AccordionSection title="ActivityIndicator">
          <View style={styles.rowSpaced}>
            <ActivityIndicator size="small" />
            <ActivityIndicator size="large" />
            <ActivityIndicator size="small" color="#ec4899" />
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
        </AccordionSection>

        <AccordionSection title="Button">
          <Button title="Primary Button" onPress={() => Alert.alert('Pressed')} />
          <View style={{ height: 12 }} />
          <Button title="Colored Button" color="#ec4899" onPress={() => Alert.alert('Pressed')} />
          <View style={{ height: 12 }} />
          <Button title="Disabled" disabled />
          <View style={{ height: 12 }} />
          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Button title="Left" onPress={() => Alert.alert('Left')} />
            </View>
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Button title="Right" onPress={() => Alert.alert('Right')} />
            </View>
          </View>
        </AccordionSection>

        <AccordionSection title="FlatList">
          <FlatList
            data={flatListData}
            renderItem={({ item }) => (
              <View style={styles.flatItem}>
                <Text style={styles.flatText}>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </AccordionSection>

        <AccordionSection title="Modal">
          <Pressable
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.actionButtonText}>Show Modal</Text>
          </Pressable>
        </AccordionSection>

        <AccordionSection title="Pressable">
          <Pressable
            onPress={() => setTimesPressed(current => current + 1)}
            style={({ pressed }) => [
              styles.pressableArea,
              { backgroundColor: pressed ? '#fce7f3' : '#ffffff' }
            ]}>
            {({ pressed }) => (
              <Text style={styles.pressableLabel}>
                {pressed ? 'Currently Pressed' : 'Press This Area'}
              </Text>
            )}
          </Pressable>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>Pressed {timesPressed} times</Text>
          </View>
        </AccordionSection>

        <AccordionSection title="SectionList">
          <SectionList
            sections={sectionListData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.sectionItem}>
                <Text>{item}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeaderText}>{title}</Text>
            )}
            scrollEnabled={false}
          />
        </AccordionSection>

        <AccordionSection title="Switch">
          <View style={styles.switchRow}>
            <Text style={styles.label}>Toggle Switch:</Text>
            <Switch
              trackColor={{ false: '#d1d5db', true: '#ec4899' }}
              thumbColor={isEnabled ? '#ffffff' : '#f3f4f6'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.switchStatus}>{isEnabled ? 'ON' : 'OFF'}</Text>
          </View>
        </AccordionSection>

        <AccordionSection title="TextInput">
          <TextInput
            style={styles.inputField}
            onChangeText={onChangeText}
            value={text}
            placeholder="Type something..."
            placeholderTextColor="#9ca3af"
          />
        </AccordionSection>

        <AccordionSection title="Touchable Components">
          <TouchableHighlight
            style={styles.touchableItem}
            onPress={() => setTouchHighlight(touchHighlight + 1)}
            underlayColor="#fef3c7">
            <Text>TouchableHighlight: {touchHighlight}x</Text>
          </TouchableHighlight>

          <TouchableOpacity
            style={[styles.touchableItem, { marginTop: 10 }]}
            onPress={() => setTouchOpacity(touchOpacity + 1)}>
            <Text>TouchableOpacity: {touchOpacity}x</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={() => Alert.alert('Touched!')}>
            <View style={[styles.touchableItem, { marginTop: 10 }]}>
              <Text>TouchableWithoutFeedback</Text>
            </View>
          </TouchableWithoutFeedback>
        </AccordionSection>

        <AccordionSection title="View & Flex">
          <View style={styles.flexDemo}>
            <View style={[styles.flexItem, { backgroundColor: '#ec4899' }]} />
            <View style={[styles.flexItem, { backgroundColor: '#8b5cf6' }]} />
            <View style={[styles.flexItem, { backgroundColor: '#06b6d4' }]} />
          </View>
        </AccordionSection>

        <AccordionSection title="VirtualizedList">
          <VirtualizedList
            data={null}
            initialNumToRender={3}
            renderItem={({ item }) => (
              <View style={styles.virtualItem}>
                <Text>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
            style={{ height: 220 }}
          />
        </AccordionSection>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Modal Dialog</Text>
            <Text style={styles.modalMessage}>This is a modal window example</Text>
            <Pressable
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  topSection: {
    backgroundColor: '#ec4899',
    paddingTop: StatusBar.currentHeight + 25 || 45,
    paddingBottom: 25,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#fce7f3',
    marginTop: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  accordion: {
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 10,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#4b5563',
  },
  accordionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'white',
  },
  accordionIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 18,
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  flatItem: {
    backgroundColor: '#4b5563',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  flatText: {
    color: 'white',
    fontSize: 15,
  },
  actionButton: {
    backgroundColor: '#8b5cf6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressableArea: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ec4899',
  },
  pressableLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ec4899',
    fontWeight: '600',
  },
  infoPanel: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#4b5563',
    borderRadius: 6,
  },
  infoText: {
    color: 'white',
    textAlign: 'center',
  },
  sectionItem: {
    backgroundColor: '#4b5563',
    padding: 12,
    marginVertical: 4,
    borderRadius: 6,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ec4899',
    marginTop: 10,
    marginBottom: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    fontSize: 15,
  },
  switchStatus: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  inputField: {
    backgroundColor: '#4b5563',
    borderWidth: 2,
    borderColor: '#6b7280',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: 'white',
  },
  touchableItem: {
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 8,
  },
  flexDemo: {
    flexDirection: 'row',
    height: 100,
    gap: 10,
  },
  flexItem: {
    flex: 1,
    borderRadius: 8,
  },
  virtualItem: {
    backgroundColor: '#4b5563',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.😎',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#374151',
    borderRadius: 16,
    padding: 30,
    width: '85%',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalCloseBtn: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalCloseBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

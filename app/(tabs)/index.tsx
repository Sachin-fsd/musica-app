import Navbar from '@/components/navbar/Navbar';
import { SafeAreaView, StyleSheet } from 'react-native';


export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{ marginTop: 40 , backgroundColor:"#8682", flex: 1 }}
    // headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    // headerImage={
    //   <Image
    //     source={require('@/assets/images/partial-react-logo.png')}
    //     style={styles.reactLogo}
    //   />
    // }
    >
      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

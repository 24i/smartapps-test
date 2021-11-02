import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackEnum, RootStackParamList } from './types';
import { Colors } from '../utils';

/* Pages */
import HomePage from '../pages/Home';
import DetailsPage from '../pages/DetailsPage';
import SearchPage from '../pages/SearchPage';
import MediaByGenrePage from '../pages/MediaByGenrePage ';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = DefaultTheme;
navTheme.colors.background = Colors.background;

export default function Routes() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName={AppStackEnum.Home}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={AppStackEnum.Home} component={HomePage} />
        <Stack.Screen name={AppStackEnum.DetailsPage} component={DetailsPage} />
        <Stack.Screen name={AppStackEnum.SearchPage} component={SearchPage} />
        <Stack.Screen name={AppStackEnum.MediaByGenrePage} component={MediaByGenrePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

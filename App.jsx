import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from '@rneui/themed';


//import AppProvider and ContextHandler
import {AppProvider} from './src/utils/AppContext';
import {initialState, reducer} from './src/utils/ContextHandler';


//import screens
import HomeMonthView from './src/screens/HomeMonthView';
import HomeAllTime from './src/screens/HomeAllTime';
import CategoryOverview from './src/screens/CategoryOverview';
import CategoryMange from './src/screens/CategoryManage';
import AccountOverView from './src/screens/AccountOverview';
import AccountManage from './src/screens/AccountManage';
import BudgetExpense from './src/screens/BudgetExpense';
import BudgetManage from './src/screens/BudgetManage';
import SettingApp from './src/screens/SettingApp';
import SettingAccount from './src/screens/SettingAccount';


const HomeTab = createMaterialTopTabNavigator();
function HomeTabScreen() {
  return (
    <HomeTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#164863",
      tabBarInactiveTintColor: "#DDF2FD",
      tabBarLabelStyle: {fontSize: 12},
      tabBarStyle: {backgroundColor: "#427D9D"},
      tabBarIndicatorStyle: {
        backgroundColor: "#164863",
        height: 5,
      },
    }}>
      <HomeTab.Screen 
      name="HomeMonthView" 
      component={HomeMonthView} 
      options={{title:"Monthly"}}
      />
      <HomeTab.Screen 
      name="HomeAllTime" 
      component={HomeAllTime}
      options={{title:"All Time"}} />
    </HomeTab.Navigator>
  );
}

const CategoryTab = createMaterialTopTabNavigator();
function CategoryTabScreen() {
  return (
    <CategoryTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#164863",
      tabBarInactiveTintColor: "#DDF2FD",
      tabBarLabelStyle: {fontSize: 12},
      tabBarStyle: {backgroundColor: "#427D9D"},
      tabBarIndicatorStyle: {
        backgroundColor: "#164863",
        height: 5,
      },
    }}>
      <CategoryTab.Screen 
      name="CategoryOverview" 
      component={CategoryOverview} 
      options={{title:"Overview"}}
      />
      <CategoryTab.Screen 
      name="CategoryMange" 
      component={CategoryMange}
      options={{title:"Manage"}} />
    </CategoryTab.Navigator>
  );
}


const AccountTab = createMaterialTopTabNavigator();
function AccountTabScreen() {
  return (
    <AccountTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#164863",
      tabBarInactiveTintColor: "#DDF2FD",
      tabBarLabelStyle: {fontSize: 12},
      tabBarStyle: {backgroundColor: "#427D9D"},
      tabBarIndicatorStyle: {
        backgroundColor: "#164863",
        height: 5,
      },
    }}>
      <AccountTab.Screen 
      name="AccountOverView" 
      component={AccountOverView} 
      options={{title:"Overview"}}
      />
      <AccountTab.Screen 
      name="AccountManage" 
      component={AccountManage}
      options={{title:"Manage"}} />
    </AccountTab.Navigator>
  );
}


const BudgetTab = createMaterialTopTabNavigator();
function BudgetTabScreen() {
  return (
    <BudgetTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#164863",
      tabBarInactiveTintColor: "#DDF2FD",
      tabBarLabelStyle: {fontSize: 12},
      tabBarStyle: {backgroundColor: "#427D9D"},
      tabBarIndicatorStyle: {
        backgroundColor: "#164863",
      }
    }}>
      <BudgetTab.Screen 
      name="BudgetExpense" 
      component={BudgetExpense} 
      options={{title:"Expense/Saving"}}
      />
      <BudgetTab.Screen 
      name="BudgetManage" 
      component={BudgetManage}
      options={{title:"Manage"}} />
    </BudgetTab.Navigator>
  );
} 


const SettingTab = createMaterialTopTabNavigator();
function SettingTabScreen() {
  return (
    <SettingTab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#164863",
      tabBarInactiveTintColor: "#DDF2FD",
      tabBarLabelStyle: {fontSize: 12},
      tabBarStyle: {backgroundColor: "#427D9D"},
      tabBarIndicatorStyle: {
        backgroundColor: "#164863",
        height: 5,
      },
    }}>
      <SettingTab.Screen 
      name="SettingApp" 
      component={SettingApp} 
      options={{title:"App"}}
      />
      <SettingTab.Screen 
      name="SettingAccount" 
      component={SettingAccount}
      options={{title:"Account"}} />
    </SettingTab.Navigator>
  );
} 


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'dashboard';
            } else if (route.name === 'Category') {
              iconName = 'category';
            } else if (route.name === 'Account') {
              iconName = 'account-balance';
            } else if (route.name === 'Budget') {
              iconName = 'savings';
            } else if (route.name === 'Setting') {
              iconName = 'tune';
            }
      
            return <Icon name={iconName} type="material" size={size} color={color} />;
          },
            tabBarActiveTintColor: "#9BBEC8",
            tabBarInactiveTintColor: "#DDF2FD",
            tabBarLabelStyle: {fontSize: 12},
            tabBarStyle: {height: 80},
            tabBarActiveBackgroundColor: "#164863",
            tabBarInactiveBackgroundColor: "#427D9D",
          
        })}>
          <Tab.Screen 
          name="Home" 
          component={HomeTabScreen}
          options={{
            title: "Dash Board", 
            headerShown: false,
          }}
            />
          <Tab.Screen 
          name="Category"
          component={CategoryTabScreen}
          options={{
            title: "Category", 
            headerShown: false,
            }} />
          <Tab.Screen name="Account"
          component={AccountTabScreen}
          options={{
            title: "Account", 
            headerShown: false
            }} />
          <Tab.Screen 
          name="Budget" 
          component={BudgetTabScreen}
          options={{
            title:"Budget", 
            headerShown: false
            }} />
          <Tab.Screen 
          name="Setting" 
          component={SettingTabScreen}
          options={{
            title:"Settings", 
            headerShown:false
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}


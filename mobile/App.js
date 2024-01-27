import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { FontProvider } from "./frontend/constants/fonts/FontContext";
import RootStack from "./frontend/navigation/RootStack";
import store from "./frontend/redux/Store";

export default function App() {
  return (
    <StripeProvider 
      publishableKey="pk_test_51O4FYADW2E7orgGC3g90wLz9NG9KFLYFWIwCKuyAGe7wVudSCJViGFNNbutvB21d5sTLI2Ju0ywXYVKsNdWdxIRD00CwurK05B"
      
    >
      <Provider store={store}>
        <FontProvider>
          <RootStack />
          <StatusBar barStyle="default" />
        </FontProvider>
      </Provider>
    </StripeProvider>
  );
}

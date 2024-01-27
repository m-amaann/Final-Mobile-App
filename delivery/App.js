// App.js
import React from 'react';
import { FontProvider } from './src/constant/fonts/FontContext';
import MainStack from './src/navigation/MainStack';

const App = () => {
    return (
        <FontProvider>
            <MainStack />
        </FontProvider>
    );
};

export default App;

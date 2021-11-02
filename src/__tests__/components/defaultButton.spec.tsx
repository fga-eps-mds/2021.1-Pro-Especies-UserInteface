import React from "react";
import { render } from '@testing-library/react-native';

import { DefaultButton } from "../../components/Button";
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
);

describe('Default Button', () => {
    it('Should Render Default Button if props are correct', () => {
        const result = render(<DefaultButton text="oi" buttonFunction={()=>{}} />, {
            wrapper: Providers
        });
        expect(result).toBeTruthy();
    });
});
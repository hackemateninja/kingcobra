import React, { useContext } from 'react';
import { Provider } from 'react-redux'
import store from '../store'

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider, ThemeContext } from 'styled-components';

import Header from '../src/components/header';

import PrimaryTheme from '../src/themes/primary';
import { IPlainObject } from '../src/definitions/IPlainObject';

const Theme = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  return children;
};

export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {

  },
  decorators: [
    storyFn => <ThemeProvider theme={PrimaryTheme}>{storyFn()}</ThemeProvider>
  ]
} as Meta;

const Template: Story<IPlainObject> = (args) => <Provider><Header {...args}>Check local prices</Header></Provider>;

export const Default = Template.bind({});

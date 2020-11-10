import React, { useContext } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { ThemeProvider, ThemeContext } from 'styled-components';

import { IButton } from '../src/definitions/IButton';
import Button from '../src/components/button';

import PrimaryTheme from '../src/themes/primary';

const Theme = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  // The theme context is available here.
  console.log(themeContext);
  return children;
};

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    storyFn => <ThemeProvider theme={PrimaryTheme}>{storyFn()}</ThemeProvider>
  ]
} as Meta;

const Template: Story<IButton> = (args) => <Button {...args}>Check local prices</Button>;

export const Default = Template.bind({});

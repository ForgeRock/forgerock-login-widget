import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';

import Select from './stacked-label.story.svelte';

export default {
  argTypes: {},
  component: Select,
  parameters: {
    layout: 'centered',
  },
  title: 'Compositions/Select: Stacked',
};

export const Base = {
  args: {
    checkValidity: jest.fn((e) => {
      const el = e.target;
      console.log(el.value);
      return !!el.value;
    }),
    key: 'uniqueId',
    label: 'Select your option',
    onChange: (e) => console.log(e.target.value),
    options: [
      { value: null, text: 'Choose Color' },
      { value: 0, text: 'Red' },
      { value: 1, text: 'Green' },
      { value: 2, text: 'Blue' },
    ],
  },
};

export const LongLabel = {
  args: {
    checkValidity: (e) => {
      const el = e.target;
      console.log(el.value);
      return !!el.value;
    },
    key: 'uniqueId',
    label: 'This is a very long label for testing purposes',
    onChange: (e) => console.log(e.target.value),
    options: [
      { value: null, text: 'This is a very long label for testing purposes' },
      { value: 0, text: 'Red' },
      { value: 1, text: 'Green' },
      { value: 2, text: 'Blue' },
    ],
  },
};

export const Error = {
  args: {
    ...Base.args,
    onChange: jest.fn(),
    errorMessage: 'Please select an option',
    isRequired: true,
  },
};

const Template = (args) => ({
  Component: Select,
  props: args,
});

export const Interaction = Template.bind({});

Interaction.args = { ...Error.args, errorMessage: '', withForm: true };

Interaction.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await userEvent.tab();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await userEvent.tab();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const submitButton = canvas.getByText('Trigger Error');
  await userEvent.click(submitButton);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const inputEl = canvas.getByLabelText('Select your option', {
    selector: 'select',
  });
  await userEvent.selectOptions(inputEl, '1');
  expect(Error.args.onChange).toHaveBeenCalled();
  expect(Error.args.checkValidity).toHaveBeenCalled();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await userEvent.tab();
};

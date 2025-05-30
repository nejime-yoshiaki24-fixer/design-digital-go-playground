import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'focus', 'disabled'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'ラベル',
    variant: 'solid',
    size: 'large',
  },
};

export const WithLeadIcon: Story = {
  args: {
    label: 'ラベル',
    variant: 'solid',
    size: 'large',
    showLeadIcon: true,
  },
};

export const WithTailIcon: Story = {
  args: {
    label: 'ラベル',
    variant: 'solid',
    size: 'large',
    showTailIcon: true,
  },
};

export const Outline: Story = {
  args: {
    label: 'ラベル',
    variant: 'outline',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'ラベル',
    variant: 'solid',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    label: 'ラベル',
    variant: 'solid',
    size: 'large',
    disabled: true,
  },
};
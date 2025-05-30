import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'dashed'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    thickness: {
      control: 'select',
      options: ['thin', 'medium', 'thick', 'extra-thick'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['gray-420', 'gray-536', 'black'],
    },
  },
  decorators: [
    (Story, context) => {
      const isVertical = context.args.orientation === 'vertical';
      return (
        <div style={{ 
          display: isVertical ? 'flex' : 'block',
          alignItems: 'center',
          height: isVertical ? '100px' : 'auto',
          padding: '20px'
        }}>
          {isVertical && <div>Content</div>}
          <Story />
          {isVertical && <div>Content</div>}
        </div>
      );
    },
  ],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    thickness: 'thin',
  },
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
    orientation: 'horizontal',
    thickness: 'thin',
  },
};

export const Thick: Story = {
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    thickness: 'thick',
  },
};

export const Vertical: Story = {
  args: {
    variant: 'solid',
    orientation: 'vertical',
    thickness: 'thin',
  },
};

export const ColoredDivider: Story = {
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    thickness: 'medium',
    color: 'black',
  },
};

export const LargeSpacing: Story = {
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    thickness: 'thin',
    spacing: 'large',
  },
};
import * as React from 'react';
import {useUID} from 'react-uid';
import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {Absolute} from '@twilio-paste/absolute';
import {Box} from '@twilio-paste/box';
import {Button} from '@twilio-paste/button';
import {InformationIcon} from '@twilio-paste/icons/esm/InformationIcon';
import {Text} from '@twilio-paste/text';
import {Tooltip} from '../src';

const Example: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Tooltip baseId={id} text="Welcome to Paste!">
      <Button variant="primary">Open Tooltip</Button>
    </Tooltip>
  );
};

const IconButtonExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Tooltip baseId={id} text="Welcome to Paste!">
      <Button variant="secondary" size="icon">
        <InformationIcon decorative={false} title="Open Tooltip" />
      </Button>
    </Tooltip>
  );
};

const CustomExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Box display="flex">
      <Text as="span">Tooltip should appear from the icon.</Text>
      <Tooltip baseId={id} text="Welcome to Paste!">
        <Box as="span">
          <InformationIcon decorative={false} title="Open Tooltip" />
        </Box>
      </Tooltip>
    </Box>
  );
};

const BottomExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Tooltip baseId={id} text="Welcome to Paste!" placement="bottom">
      <Button variant="primary">Open Tooltip</Button>
    </Tooltip>
  );
};

const TopExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Absolute preset="bottom" bottom={12}>
      <Tooltip baseId={id} text="Welcome to Paste!" placement="top-start">
        <Button variant="primary">Open Tooltip</Button>
      </Tooltip>
    </Absolute>
  );
};

const RightExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Tooltip baseId={id} text="Welcome to Paste!" placement="right-start">
      <Button variant="primary">Open Tooltip</Button>
    </Tooltip>
  );
};

const LeftExample: React.FC<{}> = () => {
  const id = useUID();
  return (
    <Absolute preset="right" top={12} right={12}>
      <Tooltip baseId={id} text="Welcome to Paste!" placement="left-start">
        <Button variant="primary">Open Tooltip</Button>
      </Tooltip>
    </Absolute>
  );
};

storiesOf('Components|Tooltip', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return <Example />;
  })
  .add('Tooltip Top', () => {
    return <TopExample />;
  })
  .add('Tooltip Left', () => {
    return <LeftExample />;
  })
  .add('Tooltip Right', () => {
    return <RightExample />;
  })
  .add('Tooltip Bottom', () => {
    return <BottomExample />;
  })
  .add('Icon Button Tooltip', () => {
    return <IconButtonExample />;
  })
  .add('Custom Tooltip', () => {
    return <CustomExample />;
  });

import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {Button} from '@twilio-paste/button';
import {Tooltip} from '../src';

const Example: React.FC<{}> = () => {
  return (
    <Tooltip baseId="test-tooltip" text="Tooltip" placement="right">
      <Button variant="primary">Reference</Button>
    </Tooltip>
  );
};

storiesOf('Components|Tooltip', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return <Example />;
  });

import * as React from 'react';
import {axe} from 'jest-axe';
import {render, screen} from '@testing-library/react';
import {Button} from '@twilio-paste/button';
import {Theme} from '@twilio-paste/theme';
import {Tooltip} from '../src';

const TooltipMock: React.FC<{}> = () => {
  return (
    <Theme.Provider theme="console">
      <Tooltip baseId="tooltip-example" text="Welcome to Paste!" data-testid="tooltip-example">
        <Button variant="primary">Open Tooltip</Button>
      </Tooltip>
    </Theme.Provider>
  );
};

describe('Tooltip', () => {
  describe('Render', () => {
    it('should render', () => {
      const {asFragment} = render(<TooltipMock />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render a tooltip button with aria attributes', () => {
      render(<TooltipMock />);
      const renderedTooltipButton = screen.getByRole('button');
      expect(renderedTooltipButton.getAttribute('aria-describedby')).toEqual('tooltip-example');
    });

    it('should render a tooltip with the tooltip role', () => {
      render(<TooltipMock />);
      const renderedTooltip = screen.getByTestId('tooltip-example');
      expect(renderedTooltip.getAttribute('role')).toEqual('tooltip');
    });
  });

  describe('Accessibility', () => {
    it('Should have no accessibility violations', async () => {
      const {container} = render(<TooltipMock />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

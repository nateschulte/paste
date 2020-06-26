import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Box, BoxProps, safelySpreadBoxProps} from '@twilio-paste/box';
import {StyledBase} from '@twilio-paste/theme';
import {Text} from '@twilio-paste/text';
import {
  TooltipPrimitiveInitialState,
  useTooltipPrimitiveState,
  TooltipPrimitive,
  TooltipPrimitiveReference,
} from '@twilio-paste/tooltip-primitive';
import {TooltipArrow} from './TooltipArrow';

const StyledTooltip = React.forwardRef<HTMLDivElement, BoxProps>(({style, ...props}, ref) => {
  return (
    <Box
      {...safelySpreadBoxProps(props)}
      backgroundColor="colorBackgroundBody"
      borderStyle="solid"
      borderWidth="borderWidth10"
      borderColor="colorBorderLight"
      borderRadius="borderRadius20"
      boxShadow="shadowCard"
      maxWidth="size30"
      minWidth="size30"
      zIndex="zIndex10"
      _focus={{outline: 'none'}}
      style={style}
      ref={ref}
    />
  );
});

export interface TooltipProps extends TooltipPrimitiveInitialState {
  children: NonNullable<React.ReactElement>;
  text: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({children, text, ...props}, ref) => {
  const tooltip = useTooltipPrimitiveState({...props});
  return (
    <>
      {React.Children.only(
        <TooltipPrimitiveReference {...tooltip} ref={ref} {...children.props}>
          {referenceProps => React.cloneElement(children, referenceProps)}
        </TooltipPrimitiveReference>
      )}
      <TooltipPrimitive {...tooltip} {...props} as={StyledTooltip}>
        <TooltipArrow {...tooltip} />
        {/* import Paste Theme Based Styles due to portal positioning. */}
        <StyledBase>
          <Box padding="space50" paddingLeft="space70" paddingRight="space70">
            <Text as="span">{text}</Text>
          </Box>
        </StyledBase>
      </TooltipPrimitive>
    </>
  );
});

if (process.env.NODE_ENV === 'development') {
  Tooltip.propTypes = {
    children: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
  };
}

Tooltip.displayName = 'Tooltip';
export {Tooltip};

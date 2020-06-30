import * as React from 'react';
import {Text} from '@twilio-paste/text';
import {Box, safelySpreadBoxProps} from '@twilio-paste/box';
import {IconSize} from '@twilio-paste/style-props';
import {getComputedTokenNames} from './utils';

export interface AvatarProps {
  size: IconSize;
}
export interface AvatarImageProps {
  src: string;
  alt: string;
}

const AvatarContext = React.createContext<AvatarProps>({size: 'sizeIcon10'});

export const AvatarImg: React.FC<AvatarImageProps> = ({src, alt, ...props}) => {
  const {size} = React.useContext(AvatarContext);
  return <Box {...safelySpreadBoxProps(props)} as="img" alt={alt} maxWidth="100%" src={src} size={size} />;
};

const Avatar: React.FC<AvatarProps> = ({children, size = 'sizeIcon70'}) => {
  const computedTokenNames = getComputedTokenNames(size);
  return (
    <AvatarContext.Provider value={{size}}>
      <Box
        as="div"
        backgroundColor="colorBackgroundPrimaryLight"
        borderRadius="borderRadiusCircle"
        overflow="hidden"
        size={size}
      >
        <Text
          as="div"
          fontSize={computedTokenNames.fontSize}
          fontWeight="fontWeightSemibold"
          lineHeight={computedTokenNames.lineHeight}
          textAlign="center"
        >
          {children}
        </Text>
      </Box>
    </AvatarContext.Provider>
  );
};

Avatar.displayName = 'Avatar';

export {Avatar};

import {
  IconSizeOptions,
  LineHeightOptions,
  FontSizeOptions,
  IconSize,
  LineHeight,
  FontSize,
} from '@twilio-paste/style-props';

export const getCorrespondingLineHeightFromSizeToken = (size: IconSizeOptions): LineHeightOptions =>
  `lineHeight${size.replace('sizeIcon', '')}` as LineHeightOptions;

export const getCorrespondingFontSizeFromSizeToken = (size: IconSizeOptions): FontSizeOptions => {
  switch (size) {
    case 'sizeIcon10':
    default:
      return 'fontSize10';
    case 'sizeIcon20':
      return 'fontSize20';
    case 'sizeIcon30':
      return 'fontSize30';
    case 'sizeIcon40':
    case 'sizeIcon50':
    case 'sizeIcon60':
      return 'fontSize40';
    case 'sizeIcon70':
      return 'fontSize50';
    case 'sizeIcon80':
    case 'sizeIcon90':
      return 'fontSize60';
    case 'sizeIcon100':
      return 'fontSize80';
    case 'sizeIcon110':
      return 'fontSize90';
  }
};

export const getComputedTokenNames = (size: IconSize): {lineHeight: LineHeight; fontSize: FontSize} => {
  if (Array.isArray(size)) {
    return {
      lineHeight: size.map(s => {
        if (s != null) {
          return getCorrespondingLineHeightFromSizeToken(s);
        }
        return null;
      }),
      fontSize: size.map(s => {
        if (s != null) {
          return getCorrespondingFontSizeFromSizeToken(s);
        }
        return null;
      }),
    };
  }
  return {
    lineHeight: getCorrespondingLineHeightFromSizeToken(size as IconSizeOptions),
    fontSize: getCorrespondingFontSizeFromSizeToken(size as IconSizeOptions),
  };
};

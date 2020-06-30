import * as React from 'react';
import {render, screen} from '@testing-library/react';
import {axe} from 'jest-axe';
import {Avatar, AvatarImg} from '../src';
import {
  getCorrespondingLineHeightFromSizeToken,
  getCorrespondingFontSizeFromSizeToken,
  getComputedTokenNames,
} from '../src/utils';

describe('Avatar', () => {
  describe('Utils', () => {
    describe('getCorrespondingLineHeightFromSizeToken', () => {
      it('should return a line height to match icon size', () => {
        expect(getCorrespondingLineHeightFromSizeToken('sizeIcon20')).toEqual('lineHeight20');
      });
    });

    describe('getCorrespondingFontSizeFromSizeToken', () => {
      it('should return a font size to match icon size', () => {
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon10')).toEqual('fontSize10');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon20')).toEqual('fontSize20');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon30')).toEqual('fontSize30');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon40')).toEqual('fontSize40');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon50')).toEqual('fontSize40');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon60')).toEqual('fontSize40');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon70')).toEqual('fontSize50');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon80')).toEqual('fontSize60');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon90')).toEqual('fontSize60');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon100')).toEqual('fontSize80');
        expect(getCorrespondingFontSizeFromSizeToken('sizeIcon110')).toEqual('fontSize90');
      });
    });

    describe('getComputedTokenNames', () => {
      it('should handle singe size values', () => {
        expect(getComputedTokenNames('sizeIcon50')).toEqual({fontSize: 'fontSize40', lineHeight: 'lineHeight50'});
      });
      it('should handle responsive size values', () => {
        expect(getComputedTokenNames(['sizeIcon50', 'sizeIcon100'])).toEqual({
          fontSize: ['fontSize40', 'fontSize80'],
          lineHeight: ['lineHeight50', 'lineHeight100'],
        });
      });
    });
  });

  describe('intials', () => {
    it('should render responsive css', (): void => {
      const {asFragment} = render(<Avatar size={['sizeIcon10', 'sizeIcon60', 'sizeIcon100']}>ST</Avatar>);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('image', () => {
    it('should render alt and src attributes', (): void => {
      render(
        <Avatar size="sizeIcon10">
          <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
        </Avatar>
      );
      expect(screen.getByRole('img').getAttribute('src')).toEqual('/avatars/avatar2.png');
      expect(screen.getByRole('img').getAttribute('alt')).toEqual('avatar example');
    });
    it('should render responsive css with an image', (): void => {
      const {asFragment} = render(
        <Avatar size={['sizeIcon30', 'sizeIcon40', 'sizeIcon90']}>
          <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
        </Avatar>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should have no accessibility violations', async () => {
      const {container} = render(
        <>
          <Avatar size="sizeIcon10">ST</Avatar>
          <Avatar size="sizeIcon10">
            <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
          </Avatar>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

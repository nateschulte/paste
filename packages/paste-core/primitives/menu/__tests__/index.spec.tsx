import * as React from 'react';
import {axe} from 'jest-axe';
import {render, fireEvent, screen} from '@testing-library/react';
import {
  useMenuPrimitiveState,
  MenuPrimitive,
  MenuPrimitiveItem,
  MenuPrimitiveButton,
  MenuPrimitiveButtonProps,
  MenuPrimitiveSeparator,
} from '../src';

const PreferencesMenu = React.forwardRef<HTMLButtonElement, MenuPrimitiveButtonProps>((props, ref) => {
  const menu = useMenuPrimitiveState({baseId: 'sub-menu'});
  return (
    <>
      <MenuPrimitiveButton ref={ref} {...menu} {...props} data-testid="example-submenu-trigger">
        Preferences
      </MenuPrimitiveButton>
      <MenuPrimitive {...menu} aria-label="Preferences" data-testid="example-submenu">
        <MenuPrimitiveItem {...menu} data-testid="example-submenu-item">
          Settings
        </MenuPrimitiveItem>
        <MenuPrimitiveItem {...menu} disabled data-testid="example-disabled-submenu-item">
          Extensions
        </MenuPrimitiveItem>
        <MenuPrimitiveSeparator {...menu} />
        <MenuPrimitiveItem {...menu}>Keyboard shortcuts</MenuPrimitiveItem>
      </MenuPrimitive>
    </>
  );
});

const MenuMock: React.FC<{}> = () => {
  const menu = useMenuPrimitiveState({baseId: 'menu-example'});
  return (
    <>
      <MenuPrimitiveButton {...menu}>Code</MenuPrimitiveButton>
      <MenuPrimitive {...menu} aria-label="Code">
        <MenuPrimitiveItem {...menu} data-testid="example-menu-item">
          About Visual Studio Code
        </MenuPrimitiveItem>
        <MenuPrimitiveItem {...menu}>Check for Updates...</MenuPrimitiveItem>
        <MenuPrimitiveSeparator {...menu} data-testid="example-menu-separator" />
        <MenuPrimitiveItem {...menu} as={PreferencesMenu} />
      </MenuPrimitive>
    </>
  );
};

describe('Menu Primitive', () => {
  describe('Render', () => {
    it('should render', () => {
      const {asFragment} = render(<MenuMock />);
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render a menu button with aria attributes', () => {
      render(<MenuMock />);
      const renderedMenuButton = screen.getByRole('button');
      expect(renderedMenuButton.getAttribute('aria-haspopup')).toEqual('menu');
      expect(renderedMenuButton.getAttribute('aria-controls')).toEqual('menu-example');
    });

    it('should render a menu', () => {
      render(<MenuMock />);
      const renderedMenu = screen.getByLabelText('Code');
      expect(renderedMenu.getAttribute('role')).toEqual('menu');
      expect(renderedMenu.getAttribute('aria-orientation')).toEqual('vertical');
    });

    it('should render a menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-menu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
    });

    it('should render a menu separator', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-menu-separator');
      expect(renderedMenuItem.getAttribute('aria-orientation')).toEqual('horizontal');
      expect(renderedMenuItem.tagName).toEqual('HR');
    });

    it('should render a sub menu trigger', () => {
      render(<MenuMock />);
      const renderedSubMenuTrigger = screen.getByTestId('example-submenu-trigger');
      expect(renderedSubMenuTrigger.getAttribute('role')).toEqual('menuitem');
      expect(renderedSubMenuTrigger.getAttribute('aria-haspopup')).toEqual('menu');
      expect(renderedSubMenuTrigger.getAttribute('aria-expanded')).toEqual('false');
    });

    it('should render a submenu', () => {
      render(<MenuMock />);
      const renderedMenu = screen.getByTestId('example-submenu');
      expect(renderedMenu.getAttribute('role')).toEqual('menu');
      expect(renderedMenu.getAttribute('aria-orientation')).toEqual('vertical');
    });

    it('should render a sub menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-submenu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
    });

    it('should render a disabled sub menu item', () => {
      render(<MenuMock />);
      const renderedMenuItem = screen.getByTestId('example-disabled-submenu-item');
      expect(renderedMenuItem.getAttribute('role')).toEqual('menuitem');
      expect(renderedMenuItem.getAttribute('aria-disabled')).toEqual('true');
    });
  });

  describe('interaction', () => {
    it('should control expanded attribute on the button', () => {
      render(<MenuMock />);
      const renderedMenuButton = screen.getByRole('button');
      expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('false');
      fireEvent.click(renderedMenuButton);
      expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('true');
      if (document.activeElement != null) {
        fireEvent.keyDown(document.activeElement, {key: 'Escape', code: 'Escape'});
        expect(renderedMenuButton.getAttribute('aria-expanded')).toEqual('false');
      }
    });

    it('should focus first menu item in the menu when open', () => {
      render(<MenuMock />);
      fireEvent.click(screen.getByRole('button'));
      if (document.activeElement != null) {
        expect(screen.getAllByRole('menuitem')[0]).toEqual(document.activeElement);
      }
    });

    it('should move focus to the second menu item in the menu when down arrow pressed', () => {
      render(<MenuMock />);
      fireEvent.click(screen.getByRole('button'));
      if (document.activeElement != null) {
        fireEvent.keyDown(document.activeElement, {key: 'ArrowDown', code: 'ArrowDown'});
        expect(screen.getByText('Check for Updates...')).toEqual(document.activeElement);
      }
    });

    it('should move focus to the first menu item in the menu when down up pressed', () => {
      render(<MenuMock />);
      fireEvent.click(screen.getByRole('button'));
      if (document.activeElement != null) {
        fireEvent.keyDown(document.activeElement, {key: 'ArrowDown', code: 'ArrowDown'});
        fireEvent.keyDown(document.activeElement, {key: 'ArrowUp', code: 'ArrowUp'});
        expect(screen.getByText('About Visual Studio Code')).toEqual(document.activeElement);
      }
    });
  });

  describe('Accessibility', () => {
    it('Should have no accessibility violations', async () => {
      const {container} = render(<MenuMock />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

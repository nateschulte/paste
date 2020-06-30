import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {Stack} from '@twilio-paste/stack';
import {Avatar, AvatarImg} from '../src';

storiesOf('Components|Avatar', module)
  .addDecorator(withKnobs)
  .add('Initials', () => {
    return (
      <Stack orientation="horizontal" spacing="space40">
        <Avatar size="sizeIcon10">ST</Avatar>
        <Avatar size="sizeIcon20">ST</Avatar>
        <Avatar size="sizeIcon30">ST</Avatar>
        <Avatar size="sizeIcon40">ST</Avatar>
        <Avatar size="sizeIcon50">ST</Avatar>
        <Avatar size="sizeIcon60">ST</Avatar>
        <Avatar size="sizeIcon70">ST</Avatar>
        <Avatar size="sizeIcon80">ST</Avatar>
        <Avatar size="sizeIcon90">ST</Avatar>
        <Avatar size="sizeIcon100">ST</Avatar>
        <Avatar size="sizeIcon110">ST</Avatar>
      </Stack>
    );
  })
  .add('Image', () => {
    return (
      <Stack orientation="horizontal" spacing="space40">
        <Avatar size="sizeIcon10">
          <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
        </Avatar>
        <Avatar size="sizeIcon20">
          <AvatarImg alt="avatar example" src="/avatars/avatar3.png" />
        </Avatar>
        <Avatar size="sizeIcon30">
          <AvatarImg alt="avatar example" src="/avatars/avatar4.png" />
        </Avatar>
        <Avatar size="sizeIcon40">
          <AvatarImg alt="avatar example" src="/avatars/avatar1.png" />
        </Avatar>
        <Avatar size="sizeIcon50">
          <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
        </Avatar>
        <Avatar size="sizeIcon60">
          <AvatarImg alt="avatar example" src="/avatars/avatar3.png" />
        </Avatar>
        <Avatar size="sizeIcon70">
          <AvatarImg alt="avatar example" src="/avatars/avatar4.png" />
        </Avatar>
        <Avatar size="sizeIcon80">
          <AvatarImg alt="avatar example" src="/avatars/avatar1.png" />
        </Avatar>
        <Avatar size="sizeIcon90">
          <AvatarImg alt="avatar example" src="/avatars/avatar2.png" />
        </Avatar>
        <Avatar size="sizeIcon100">
          <AvatarImg alt="avatar example" src="/avatars/avatar3.png" />
        </Avatar>
        <Avatar size="sizeIcon110">
          <AvatarImg alt="avatar example" src="/avatars/avatar4.png" />
        </Avatar>
      </Stack>
    );
  })
  .add('Responsive Initials', () => {
    return (
      <Stack orientation="horizontal" spacing="space40">
        <Avatar size={['sizeIcon10', 'sizeIcon50', 'sizeIcon110']}>ST</Avatar>
      </Stack>
    );
  })
  .add('Responsive Image', () => {
    return (
      <Stack orientation="horizontal" spacing="space40">
        <Avatar size={['sizeIcon10', 'sizeIcon50', 'sizeIcon110']}>
          <AvatarImg alt="avatar example" src="/avatars/avatar3.png" />
        </Avatar>
      </Stack>
    );
  });

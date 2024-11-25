import { useRef, useState } from 'react';

import logo from './assets/M-logo.svg';
import { MenuItem } from './components/AsideMenu';
import AsideMenu from './components/AsideMenu/components/AsideMenu';
import Heading from './components/Heading';
import { AppIcon, FoldersIcon, InboxIcon, UserIcon } from './components/Icons';
import { useTitle } from './hooks/useTitle';

import { Dropdown, DropdownOption, Input, Checkbox, Button } from '@/components';

const defaultOptions = [
  { label: 'Default Option 1', value: 1 },
  { label: 'Default Option 2', value: 2 },
  { label: 'Default Option 3', value: 3 },
];

const menuItems: MenuItem[] = [
  {
    label: 'Profile',
    link: '/profile',
    icon: <UserIcon />,
    roles: ['admin'],
    submenu: [
      { label: 'Submenu 1', link: '/profile/submenu1' },
      { label: 'Submenu 2', link: '/profile/submenu2', roles: ['admin'] },
    ],
  },
  {
    label: 'Inbox',
    link: '/inbox',
    icon: <InboxIcon />,
    roles: ['admin'],
  },
  {
    label: 'Tools',
    link: '/tools',
    icon: <AppIcon />,
    roles: ['admin'],
  },
  { label: 'Classes', link: '/classes', icon: <FoldersIcon />, roles: ['admin'] },
];

function App() {
  const [selected, setSelected] = useState<DropdownOption[]>([]);
  const [string, setString] = useState<string>('');
  const [number, setNumber] = useState<number | undefined>();
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <aside>
        <AsideMenu
          isOpen={isOpen}
          items={menuItems}
          logo={<img src={logo} alt="logo" width={40} height="auto" />}
          setIsOpen={setIsOpen}
        />
      </aside>
      <main
        style={{
          width: '34rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          padding: '2rem',
        }}
      >
        <Heading size="large" label={useTitle()} />
        <Dropdown
          label="Select an option"
          options={defaultOptions}
          onChange={setSelected}
          value={selected}
          searchable
          multiple
        />
        <Input label="Input string" type="text" value={string} onChange={setString} error="Error" />
        <Input label="Input number" type="number" value={number} onChange={setNumber} />
        <Input label="Input password" type="password" value={password} onChange={setPassword} />
        <Input label="Input date" type="date" value={date} onChange={setDate} />
        <Input label="Input ref" ref={inputRef} />
        <Checkbox label="Checkbox" padding="2rem 1.5rem" />
        <Checkbox
          label="Switch"
          padding="2rem 1.5rem"
          mode="switch"
          value={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <Button onClick={() => {}} label="Button with label" pending />
        <Button onClick={() => console.log(inputRef.current?.value)}>
          <span>Button with children</span>
        </Button>
      </main>
    </>
  );
}

export default App;

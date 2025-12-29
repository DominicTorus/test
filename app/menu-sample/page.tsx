'use client';

import { useState } from 'react';
import { Menu } from '@/components/Menu';
import { useTheme } from '@/hooks/useTheme';

type SettingTabs = 'appearance' | 'preferences' | 'security' | 'notifications' | 'profile' | 'billing';

export default function MenuSamplePage() {
  const { isDark, bgStyle, textStyle } = useTheme();
  const [selectedMenuItem, setSelectedMenuItem] = useState<SettingTabs>('appearance');
  const [selectedNavItem, setSelectedNavItem] = useState('home');
  const [selectedAction, setSelectedAction] = useState('edit');

  // Example 1: Settings Menu (like setup.tsx)
  const settingsMenuItems = [
    {
      code: 'appearance' as SettingTabs,
      name: 'Appearance',
      svg: 'PaintBrush',
    },
    {
      code: 'preferences' as SettingTabs,
      name: 'Preferences',
      svg: 'Gear',
    },
    {
      code: 'security' as SettingTabs,
      name: 'Security',
      svg: 'LockClosed',
    },
    {
      code: 'notifications' as SettingTabs,
      name: 'Notifications',
      svg: 'Bell',
    },
    {
      code: 'profile' as SettingTabs,
      name: 'Profile',
      svg: 'User',
    },
    {
      code: 'billing' as SettingTabs,
      name: 'Billing',
      svg: 'CreditCard',
    },
  ];

  // Example 2: Navigation Menu
  const navMenuItems = [
    { id: 'home', label: 'Home', icon: 'House' },
    { id: 'dashboard', label: 'Dashboard', icon: 'ChartBar' },
    { id: 'reports', label: 'Reports', icon: 'DocumentText' },
    { id: 'settings', label: 'Settings', icon: 'Gear' },
  ];

  // Example 3: Actions Menu
  const actionMenuItems = [
    { id: 'edit', label: 'Edit', icon: 'Pencil' },
    { id: 'copy', label: 'Copy', icon: 'DocumentDuplicate' },
    { id: 'share', label: 'Share', icon: 'Share' },
    { id: 'delete', label: 'Delete', icon: 'TrashBin' },
  ];

  const handleMenuClick = (code: SettingTabs) => {
    setSelectedMenuItem(code);
    console.log('Menu item clicked:', code);
  };

  return (
    <div
      className="min-h-screen w-full p-8"
      style={{
        backgroundColor: bgStyle,
        color: textStyle,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Menu Component Examples</h1>

        <div className="space-y-12">
          {/* Example 1: Vertical Settings Menu (like setup.tsx) */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Vertical Settings Menu</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Menu with brand color active state (like setup.tsx)
            </p>

            <div className="flex gap-8">
              <div className="w-64">
                <Menu size='xl' className='h-full'>
                  {settingsMenuItems.map(item => (
                    <Menu.Item
                      iconStart={item.svg}
                      key={item.code}
                      className='text-nowrap'
                      active={selectedMenuItem === item.code}
                      onClick={() => handleMenuClick(item.code)}
                    >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              <div className={`flex-1 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h3 className="text-xl font-semibold mb-2">
                  {settingsMenuItems.find(item => item.code === selectedMenuItem)?.name} Settings
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  Content for {selectedMenuItem} would go here...
                </p>
              </div>
            </div>

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<Menu size='xl' className='h-full'>
  {menuItems.map(item => (
    <Menu.Item
      iconStart={item.svg}
      key={item.code}
      className='text-nowrap'
      active={selectedMenuItem === item.code}
      onClick={() => handleMenuClick(item.code)}
    >
      {item.name}
    </Menu.Item>
  ))}
</Menu>`}
              </pre>
            </div>
          </section>

          {/* Example 2: Horizontal Navigation Menu */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Horizontal Navigation Menu</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Top navigation with brand color highlights
            </p>

            <Menu size='m' orientation='horizontal' className='p-2'>
              {navMenuItems.map(item => (
                <Menu.Item
                  key={item.id}
                  iconStart={item.icon}
                  active={selectedNavItem === item.id}
                  onClick={() => setSelectedNavItem(item.id)}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<Menu size='m' orientation='horizontal' className='p-2'>
  {navItems.map(item => (
    <Menu.Item
      key={item.id}
      iconStart={item.icon}
      active={selectedNavItem === item.id}
      onClick={() => setSelectedNavItem(item.id)}
    >
      {item.label}
    </Menu.Item>
  ))}
</Menu>`}
              </pre>
            </div>
          </section>

          {/* Example 3: Different Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Different Sizes</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Menu component with various sizes
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Extra Small (xs)</h4>
                <Menu size='xs' className='w-48'>
                  {actionMenuItems.slice(0, 3).map(item => (
                    <Menu.Item
                      key={item.id}
                      iconStart={item.icon}
                      active={selectedAction === item.id}
                      onClick={() => setSelectedAction(item.id)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Small (s)</h4>
                <Menu size='s' className='w-52'>
                  {actionMenuItems.slice(0, 3).map(item => (
                    <Menu.Item
                      key={item.id}
                      iconStart={item.icon}
                      active={selectedAction === item.id}
                      onClick={() => setSelectedAction(item.id)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Medium (m) - Default</h4>
                <Menu size='m' className='w-56'>
                  {actionMenuItems.slice(0, 3).map(item => (
                    <Menu.Item
                      key={item.id}
                      iconStart={item.icon}
                      active={selectedAction === item.id}
                      onClick={() => setSelectedAction(item.id)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Large (l)</h4>
                <Menu size='l' className='w-60'>
                  {actionMenuItems.slice(0, 3).map(item => (
                    <Menu.Item
                      key={item.id}
                      iconStart={item.icon}
                      active={selectedAction === item.id}
                      onClick={() => setSelectedAction(item.id)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Extra Large (xl)</h4>
                <Menu size='xl' className='w-64'>
                  {actionMenuItems.slice(0, 3).map(item => (
                    <Menu.Item
                      key={item.id}
                      iconStart={item.icon}
                      active={selectedAction === item.id}
                      onClick={() => setSelectedAction(item.id)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
            </div>
          </section>

          {/* Example 4: Icons on Both Sides */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Icons on Both Sides</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Menu items with icons on start and end
            </p>

            <Menu size='m' className='w-64'>
              <Menu.Item
                iconStart='Folder'
                iconEnd='ChevronRight'
                active={false}
                onClick={() => console.log('Documents')}
              >
                Documents
              </Menu.Item>
              <Menu.Item
                iconStart='Photo'
                iconEnd='ChevronRight'
                active={false}
                onClick={() => console.log('Images')}
              >
                Images
              </Menu.Item>
              <Menu.Item
                iconStart='MusicalNote'
                iconEnd='ChevronRight'
                active={true}
                onClick={() => console.log('Music')}
              >
                Music
              </Menu.Item>
            </Menu>

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<Menu size='m' className='w-64'>
  <Menu.Item
    iconStart='Folder'
    iconEnd='ChevronRight'
    active={false}
    onClick={() => console.log('Documents')}
  >
    Documents
  </Menu.Item>
</Menu>`}
              </pre>
            </div>
          </section>

          {/* Example 5: Without Brand Color */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Without Brand Color</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Menu with brand color disabled (uses theme colors only)
            </p>

            <Menu size='m' className='w-64' useBrandColor={false}>
              {actionMenuItems.map(item => (
                <Menu.Item
                  key={item.id}
                  iconStart={item.icon}
                  active={selectedAction === item.id}
                  onClick={() => setSelectedAction(item.id)}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </section>

          {/* Props Documentation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Props Documentation</h2>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-xl font-semibold mb-3">Menu Props</h3>
              <table className="w-full text-left mb-6">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="py-2 pr-4">Prop</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Default</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">size</td>
                    <td className="py-2 pr-4">ComponentSize</td>
                    <td className="py-2 pr-4">"m"</td>
                    <td className="py-2">Size of menu items</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">orientation</td>
                    <td className="py-2 pr-4">"vertical" | "horizontal"</td>
                    <td className="py-2 pr-4">"vertical"</td>
                    <td className="py-2">Layout direction</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">useBrandColor</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2 pr-4">true</td>
                    <td className="py-2">Use brand color for active items</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">className</td>
                    <td className="py-2 pr-4">string</td>
                    <td className="py-2 pr-4">""</td>
                    <td className="py-2">Additional CSS classes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">events</td>
                    <td className="py-2 pr-4">ComponentEvents[]</td>
                    <td className="py-2 pr-4">[]</td>
                    <td className="py-2">Event handlers</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-semibold mb-3">Menu.Item Props</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="py-2 pr-4">Prop</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2 pr-4">Default</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">iconStart</td>
                    <td className="py-2 pr-4">string | ReactNode</td>
                    <td className="py-2 pr-4">-</td>
                    <td className="py-2">Icon at the start</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">iconEnd</td>
                    <td className="py-2 pr-4">string | ReactNode</td>
                    <td className="py-2 pr-4">-</td>
                    <td className="py-2">Icon at the end</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">active</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2 pr-4">false</td>
                    <td className="py-2">Active/selected state</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">disabled</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2 pr-4">false</td>
                    <td className="py-2">Disable menu item</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">onClick</td>
                    <td className="py-2 pr-4">Function</td>
                    <td className="py-2 pr-4">-</td>
                    <td className="py-2">Click handler</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">className</td>
                    <td className="py-2 pr-4">string</td>
                    <td className="py-2 pr-4">""</td>
                    <td className="py-2">Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

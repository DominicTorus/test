'use client';

import { useState } from 'react';
import { DropdownMenu, DropdownMenuItem } from '@/components/DropdownMenu';
import { Button } from '@/components/Button';
import { useTheme } from '@/hooks/useTheme';

export default function DropdownSamplePage() {
  const { isDark, bgStyle, textStyle } = useTheme();
  const [selectedOption, setSelectedOption] = useState('Select Action');
  const [selectedTheme, setSelectedTheme] = useState('Select Theme');
  const [selectedLanguage, setSelectedLanguage] = useState('Select Language');

  // Example 1: Simple Dropdown Menu
  const simpleMenuItems: DropdownMenuItem[] = [
    {
      text: 'Edit',
      icon: 'Pencil',
      action: () => {
        console.log('Edit clicked');
        setSelectedOption('Edit');
      },
    },
    {
      text: 'Delete',
      icon: 'TrashBin',
      action: () => {
        console.log('Delete clicked');
        setSelectedOption('Delete');
      },
    },
    {
      divider: true,
      text: '', // Required but not used for dividers
    },
    {
      text: 'Archive',
      icon: 'FolderArrowDown',
      action: () => {
        console.log('Archive clicked');
        setSelectedOption('Archive');
      },
    },
  ];

  // Example 2: Nested Dropdown Menu (like TopNav)
  const nestedMenuItems: DropdownMenuItem[] = [
    {
      text: 'File',
      icon: 'Folder',
      items: [
        {
          text: 'New File',
          icon: 'FilePlus',
          action: () => console.log('New File'),
        },
        {
          text: 'Open',
          icon: 'FolderOpen',
          action: () => console.log('Open'),
        },
        {
          divider: true,
          text: '',
        },
        {
          text: 'Save',
          icon: 'FloppyDisk',
          action: () => console.log('Save'),
        },
      ],
    },
    {
      text: 'Edit',
      icon: 'Pencil',
      items: [
        {
          text: 'Undo',
          icon: 'ArrowUturnCcwLeft',
          action: () => console.log('Undo'),
        },
        {
          text: 'Redo',
          icon: 'ArrowUturnCwRight',
          action: () => console.log('Redo'),
        },
      ],
    },
    {
      text: 'View',
      icon: 'Eye',
      disabled: true,
    },
  ];

  // Example 3: Theme Selector
  const themeMenuItems: DropdownMenuItem[] = [
    {
      text: 'Light',
      action: () => setSelectedTheme('Light'),
    },
    {
      text: 'Dark',
      action: () => setSelectedTheme('Dark'),
    },
    {
      text: 'Light High Contrast',
      action: () => setSelectedTheme('Light HC'),
    },
    {
      text: 'Dark High Contrast',
      action: () => setSelectedTheme('Dark HC'),
    },
  ];

  // Example 4: Language Selector
  const languageMenuItems: DropdownMenuItem[] = [
    {
      text: 'English',
      icon: 'Globe',
      action: () => setSelectedLanguage('English'),
    },
    {
      text: 'Tamil',
      icon: 'Globe',
      action: () => setSelectedLanguage('Tamil'),
    },
    {
      text: 'Arabic',
      icon: 'Globe',
      action: () => setSelectedLanguage('Arabic'),
    },
    {
      text: 'French',
      icon: 'Globe',
      action: () => setSelectedLanguage('French'),
    },
    {
      text: 'Russian',
      icon: 'Globe',
      action: () => setSelectedLanguage('Russian'),
    },
  ];

  return (
    <div
      className="min-h-screen w-full p-8"
      style={{
        backgroundColor: bgStyle,
        color: textStyle,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">DropdownMenu Component Examples</h1>

        <div className="space-y-12">
          {/* Example 1: Simple Dropdown */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Simple Dropdown Menu</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Basic dropdown with actions and icons
            </p>
            <div className="flex gap-4 items-center">
              <DropdownMenu
                items={simpleMenuItems}
                renderSwitcher={(props) => (
                  <Button view="action" size="m" {...props}>
                    {selectedOption}
                  </Button>
                )}
              />
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Selected: {selectedOption}
              </span>
            </div>

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<DropdownMenu
  items={[
    {
      text: 'Edit',
      icon: 'Pencil',
      action: () => console.log('Edit clicked'),
    },
    {
      text: 'Delete',
      icon: 'TrashBin',
      action: () => console.log('Delete clicked'),
    },
    { divider: true, text: '' },
    {
      text: 'Archive',
      icon: 'FolderArrowDown',
      action: () => console.log('Archive clicked'),
    },
  ]}
  renderSwitcher={(props) => (
    <Button view="action" size="m" {...props}>
      Actions
    </Button>
  )}
/>`}
              </pre>
            </div>
          </section>

          {/* Example 2: Nested Dropdown */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Nested Dropdown Menu</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Multi-level dropdown with submenus (like TopNav)
            </p>
            <DropdownMenu
              items={nestedMenuItems}
              renderSwitcher={(props) => (
                <Button view="outlined" size="m" {...props}>
                  Menu
                </Button>
              )}
            />

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<DropdownMenu
  items={[
    {
      text: 'File',
      icon: 'Folder',
      items: [
        {
          text: 'New File',
          icon: 'FilePlus',
          action: () => console.log('New File'),
        },
        {
          text: 'Save',
          icon: 'FloppyDisk',
          action: () => console.log('Save'),
        },
      ],
    },
  ]}
  renderSwitcher={(props) => (
    <Button view="outlined" size="m" {...props}>
      Menu
    </Button>
  )}
/>`}
              </pre>
            </div>
          </section>

          {/* Example 3: Theme Selector */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Theme Selector</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dropdown for selecting themes
            </p>
            <div className="flex gap-4 items-center">
              <DropdownMenu
                items={themeMenuItems}
                renderSwitcher={(props) => (
                  <Button view="flat" size="m" {...props}>
                    {selectedTheme}
                  </Button>
                )}
              />
            </div>
          </section>

          {/* Example 4: Language Selector */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Language Selector</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dropdown for selecting language with icons
            </p>
            <div className="flex gap-4 items-center">
              <DropdownMenu
                items={languageMenuItems}
                renderSwitcher={(props) => (
                  <Button
                    view="normal"
                    size="m"
                    icon="Globe"
                    iconDisplay="Start with Icon"
                    {...props}
                  >
                    {selectedLanguage}
                  </Button>
                )}
              />
            </div>
          </section>

          {/* Example 5: Custom Styled Dropdown */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Custom Styled Dropdown</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dropdown with custom popup styling (like TopNav with brandColor)
            </p>
            <DropdownMenu
              items={simpleMenuItems}
              popupProps={{
                style: {
                  backgroundColor: '#00BFFF',
                  color: '#ffffff',
                },
                className: 'shadow-2xl',
              }}
              renderSwitcher={(props) => (
                <Button
                  view="normal"
                  size="l"
                  {...props}
                  className="min-w-[150px]"
                >
                  Custom Styled
                </Button>
              )}
            />

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`<DropdownMenu
  items={menuItems}
  popupProps={{
    style: {
      backgroundColor: brandColor,
      color: '#ffffff',
    },
    className: 'shadow-2xl',
  }}
  renderSwitcher={(props) => (
    <Button view="normal" size="l" {...props}>
      Custom Styled
    </Button>
  )}
/>`}
              </pre>
            </div>
          </section>

          {/* Example 6: With Brand Color Hover */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Brand Color Hover</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Dropdown with brand color on hover (useBrandColor=true)
            </p>

            <div className="flex gap-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">With Brand Color (default)</h4>
                <DropdownMenu
                  items={simpleMenuItems}
                  useBrandColor={true}
                  renderSwitcher={(props) => (
                    <Button view="outlined" size="m" {...props}>
                      Brand Color Hover
                    </Button>
                  )}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Without Brand Color</h4>
                <DropdownMenu
                  items={simpleMenuItems}
                  useBrandColor={false}
                  renderSwitcher={(props) => (
                    <Button view="outlined" size="m" {...props}>
                      Default Hover
                    </Button>
                  )}
                />
              </div>
            </div>

            {/* Code Example */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <pre className="text-sm overflow-x-auto">
{`// With brand color (items turn brand color on hover)
<DropdownMenu
  items={menuItems}
  useBrandColor={true}  // default
  renderSwitcher={(props) => <Button {...props}>Menu</Button>}
/>

// Without brand color (uses theme hover color)
<DropdownMenu
  items={menuItems}
  useBrandColor={false}
  renderSwitcher={(props) => <Button {...props}>Menu</Button>}
/>`}
              </pre>
            </div>
          </section>

          {/* Props Documentation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Props Documentation</h2>
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="text-xl font-semibold mb-3">DropdownMenu Props</h3>
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
                    <td className="py-2 pr-4 font-mono">renderSwitcher</td>
                    <td className="py-2 pr-4">Function</td>
                    <td className="py-2 pr-4">Required</td>
                    <td className="py-2">Render function for trigger button</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">items</td>
                    <td className="py-2 pr-4">DropdownMenuItem[]</td>
                    <td className="py-2 pr-4">Required</td>
                    <td className="py-2">Menu items array</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">popupProps</td>
                    <td className="py-2 pr-4">Object</td>
                    <td className="py-2 pr-4">{'{}'}</td>
                    <td className="py-2">Custom styles/classes for popup</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">size</td>
                    <td className="py-2 pr-4">ComponentSize</td>
                    <td className="py-2 pr-4">"m"</td>
                    <td className="py-2">Size of dropdown</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">disabled</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2 pr-4">false</td>
                    <td className="py-2">Disable dropdown</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">events</td>
                    <td className="py-2 pr-4">ComponentEvents[]</td>
                    <td className="py-2 pr-4">[]</td>
                    <td className="py-2">Event handlers</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">onOpenChange</td>
                    <td className="py-2 pr-4">Function</td>
                    <td className="py-2 pr-4">undefined</td>
                    <td className="py-2">Callback when open state changes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">useBrandColor</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2 pr-4">true</td>
                    <td className="py-2">Use brand color for hover states</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xl font-semibold mb-3 mt-6">DropdownMenuItem Interface</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
                    <th className="py-2 pr-4">Property</th>
                    <th className="py-2 pr-4">Type</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">text</td>
                    <td className="py-2 pr-4">string</td>
                    <td className="py-2">Menu item label</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">action</td>
                    <td className="py-2 pr-4">Function</td>
                    <td className="py-2">Function to call on click</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">icon</td>
                    <td className="py-2 pr-4">string</td>
                    <td className="py-2">Icon name</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">disabled</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2">Disable menu item</td>
                  </tr>
                  <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className="py-2 pr-4 font-mono">items</td>
                    <td className="py-2 pr-4">DropdownMenuItem[]</td>
                    <td className="py-2">Nested submenu items</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono">divider</td>
                    <td className="py-2 pr-4">boolean</td>
                    <td className="py-2">Show divider line</td>
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

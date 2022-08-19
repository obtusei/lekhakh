import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';
import { ReactNode } from 'react';



export default function Content({children}:{children:ReactNode}) {
  return (
    <Tabs defaultValue="blogs">
      <Tabs.List>
        <Tabs.Tab value="blogs" icon={<IconPhoto size={14} />}>Blogs</Tabs.Tab>
        <Tabs.Tab value="category" icon={<IconMessageCircle size={14} />}>Category</Tabs.Tab>
        <Tabs.Tab value="saved" icon={<IconSettings size={14} />}>Dates</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        Settings tab content
      </Tabs.Panel>
    </Tabs>
  );
}
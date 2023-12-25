import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

function CustomTabs({galleryContent,messageContent,settingContent}) {
    return (
        <Tabs defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>Gallery</Tabs.Tab>
                <Tabs.Tab value="messages" icon={<IconMessageCircle size="0.8rem" />}>Messages</Tabs.Tab>
                <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>Settings</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery" pt="xs">
                {galleryContent}
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
                {messageContent}
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xs">
                {settingContent}
            </Tabs.Panel>
        </Tabs>
    );
}

export default CustomTabs
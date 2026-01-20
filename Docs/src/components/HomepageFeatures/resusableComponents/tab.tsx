import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

interface TabsProps {
    items: {
        label: string;
        value: string;
        content: React.ReactNode;
    }[];
    defaultValue?: string;
}

const Tab: React.FC<TabsProps> = ({ items, defaultValue }) => {
    return (
        <Tabs defaultValue={defaultValue || items[0]?.value}>
            {items.map((item) => (
                <TabItem key={item.value} value={item.value} label={item.label}>
                    {item.content}
                </TabItem>
            ))}
        </Tabs>
    );
};

export default Tab;

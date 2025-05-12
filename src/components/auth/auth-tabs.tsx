import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthTabsProps = {
  defaultValue: string;
  tabs: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
};

export const AuthTabs = ({ defaultValue, tabs }: AuthTabsProps) => (
  <Tabs defaultValue={defaultValue}>
    <TabsList className="grid w-full grid-cols-2">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>

    {tabs.map((tab) => (
      <TabsContent key={tab.value} value={tab.value}>
        {tab.content}
      </TabsContent>
    ))}
  </Tabs>
);

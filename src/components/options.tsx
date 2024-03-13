import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OptionProps = {
  options: string[];
};

const Options: React.FC<OptionProps> = ({ options }) => {
  return (
    <>
      <Tabs defaultValue="account" className="w-[70em]">
        <TabsList className="grid w-full grid-flow-col justify-start">
          {options.map((op) => (
            <TabsTrigger className="mr-14" value={op}>
              {op}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </>
  );
};

export default Options;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TableCard: React.FC = ({ children, ...props }) => {
  return (
    <Card className={cn("w-[80em]")} {...props}>
      <CardHeader className="text-left">
        <CardTitle>Notifications</CardTitle>
        {children[0]}
      </CardHeader>
      <CardContent className="grid gap-4">{children[1]}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default TableCard;

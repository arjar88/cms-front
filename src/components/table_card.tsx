import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TableCard({ children, ...props }) {
  return (
    <Card className={cn("w-[80em]")} {...props}>
      <CardHeader className="text-left">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">{children}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

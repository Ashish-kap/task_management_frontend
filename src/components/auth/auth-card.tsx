import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

export const AuthCard = ({ title, children }: AuthCardProps) => (
  <div className="flex h-screen items-center justify-center">
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </div>
);

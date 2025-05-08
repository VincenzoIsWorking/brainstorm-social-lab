
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SocialPlatformCardProps {
  platform: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  count: number;
}

const SocialPlatformCard: React.FC<SocialPlatformCardProps> = ({
  platform,
  icon,
  color,
  description,
  count,
}) => {
  return (
    <Card className="card-hover-effect">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: `${color}20` }}
          >
            <div className="text-2xl" style={{ color }}>{icon}</div>
          </div>
          <span className="text-2xl font-bold">{count}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg mb-1">{platform}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default SocialPlatformCard;

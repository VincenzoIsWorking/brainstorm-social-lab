
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export interface Idea {
  id: string;
  title: string;
  description: string;
  platform: "linkedin" | "facebook" | "twitter" | "youtube" | "tiktok" | "instagram";
  tags: string[];
  createdAt: Date;
  score?: number;
}

interface IdeasListProps {
  ideas: Idea[];
}

const platformColors = {
  linkedin: "text-social-linkedin",
  facebook: "text-social-facebook",
  twitter: "text-social-twitter",
  youtube: "text-social-youtube",
  tiktok: "text-social-tiktok",
  instagram: "text-social-instagram",
};

const platformBg = {
  linkedin: "bg-social-linkedin/10",
  facebook: "bg-social-facebook/10",
  twitter: "bg-social-twitter/10",
  youtube: "bg-social-youtube/10",
  tiktok: "bg-social-tiktok/10 dark:bg-social-tiktok/20",
  instagram: "bg-social-instagram/10",
};

const IdeasList: React.FC<IdeasListProps> = ({ ideas }) => {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Nessuna idea trovata</h3>
        <p className="text-gray-500 dark:text-gray-400">Crea la tua prima idea cliccando su "Nuova idea"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map((idea) => (
        <Card key={idea.id} className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <Badge className={`${platformBg[idea.platform]} ${platformColors[idea.platform]} mb-2`}>
                  {idea.platform.charAt(0).toUpperCase() + idea.platform.slice(1)}
                </Badge>
                <CardTitle>{idea.title}</CardTitle>
              </div>
              {idea.score !== undefined && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${idea.score >= 70 ? 'bg-green-100 text-green-700' : 
                    idea.score >= 40 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}`}
                >
                  <span className="font-bold text-sm">{idea.score}</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3 mb-3">
              {idea.description}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-xs text-gray-500">
            <span>{format(idea.createdAt, "d MMMM yyyy", { locale: it })}</span>
            <Button size="sm" variant="ghost">Dettagli</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default IdeasList;

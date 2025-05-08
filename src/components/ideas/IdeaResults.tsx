
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";

interface IdeaEvaluation {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    hashtags: string[];
    duration?: string;
    hook: string;
    visualStyle: string;
  };
}

interface IdeaResultsProps {
  title: string;
  platform: "linkedin" | "facebook" | "twitter" | "youtube" | "tiktok" | "instagram";
  evaluation: IdeaEvaluation;
  onSave: () => void;
  onDiscard: () => void;
}

const scoreColors = [
  { min: 0, max: 40, bg: "bg-red-100", text: "text-red-700", label: "Basso potenziale" },
  { min: 41, max: 69, bg: "bg-yellow-100", text: "text-yellow-700", label: "Potenziale medio" },
  { min: 70, max: 100, bg: "bg-green-100", text: "text-green-700", label: "Alto potenziale" },
];

const getScoreColor = (score: number) => {
  const colorRange = scoreColors.find(range => score >= range.min && score <= range.max);
  return colorRange || scoreColors[0];
};

const platformLabels = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  twitter: "Twitter",
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};

const IdeaResults: React.FC<IdeaResultsProps> = ({
  title,
  platform,
  evaluation,
  onSave,
  onDiscard,
}) => {
  const { score, strengths, weaknesses, recommendations } = evaluation;
  const scoreColor = getScoreColor(score);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div>
              <Badge className="mb-2">
                {platformLabels[platform]}
              </Badge>
              <div>{title}</div>
            </div>
            <div className={`w-16 h-16 ${scoreColor.bg} ${scoreColor.text} rounded-full flex flex-col items-center justify-center`}>
              <span className="font-bold text-xl">{score}</span>
              <span className="text-xs">/ 100</span>
            </div>
          </CardTitle>
          <CardDescription className="text-center mt-2">
            {scoreColor.label}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 text-lg">Punti di forza</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 text-lg">Aree di miglioramento</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <XIcon className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Raccomandazioni</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Hashtags consigliati</h4>
            <div className="flex flex-wrap gap-2">
              {recommendations.hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          {recommendations.duration && (
            <div>
              <h4 className="font-medium mb-1">Durata ideale</h4>
              <p>{recommendations.duration}</p>
            </div>
          )}

          <div>
            <h4 className="font-medium mb-1">Hook d'apertura</h4>
            <p className="text-sm">{recommendations.hook}</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">Stile visuale</h4>
            <p className="text-sm">{recommendations.visualStyle}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" className="w-1/2" onClick={onDiscard}>
          Scarta idea
        </Button>
        <Button className="w-1/2" onClick={onSave}>
          Salva idea
        </Button>
      </div>
    </div>
  );
};

export default IdeaResults;

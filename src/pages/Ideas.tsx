
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import FilterBar from "@/components/dashboard/FilterBar";
import IdeasList, { Idea } from "@/components/ideas/IdeasList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb } from "lucide-react";

// Mock data per le idee
const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "Webinar sul lavoro remoto",
    description: "Serie di webinar sui vantaggi e le sfide del lavoro remoto nel settore IT. Condivisione di best practices e strumenti utili.",
    platform: "linkedin",
    tags: ["formazione", "remote-work", "webinar"],
    createdAt: new Date("2023-12-01"),
    score: 82,
  },
  {
    id: "2",
    title: "Tutorial sullo sviluppo mobile",
    description: "Video corso passo-passo sullo sviluppo di app mobile con React Native. Concetti fondamentali e esempi pratici.",
    platform: "youtube",
    tags: ["tutorials", "sviluppo", "mobile"],
    createdAt: new Date("2023-11-15"),
    score: 76,
  },
  {
    id: "3",
    title: "Reel sui consigli SEO",
    description: "Serie di brevi video con consigli pratici per migliorare il posizionamento SEO di un sito web.",
    platform: "instagram",
    tags: ["marketing", "seo", "tips"],
    createdAt: new Date("2023-12-10"),
    score: 65,
  },
  {
    id: "4",
    title: "Analisi delle tendenze di mercato",
    description: "Post approfondito sulle tendenze di mercato nel settore tecnologico per il 2023, con dati e grafici.",
    platform: "facebook",
    tags: ["analisi", "mercato", "trend"],
    createdAt: new Date("2023-10-20"),
    score: 58,
  },
  {
    id: "5",
    title: "Intervista al CEO",
    description: "Intervista esclusiva al CEO dell'azienda sulle strategie future e la vision aziendale.",
    platform: "linkedin",
    tags: ["intervista", "leadership", "business"],
    createdAt: new Date("2023-11-05"),
    score: 87,
  },
  {
    id: "6",
    title: "Challenge creativa per il team",
    description: "Video breve che mostra una challenge creativa per aumentare la coesione del team e stimolare la creatività.",
    platform: "tiktok",
    tags: ["teambuilding", "creatività", "challenge"],
    createdAt: new Date("2023-12-05"),
    score: 72,
  },
];

const Ideas = () => {
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>(mockIdeas);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterIdeas(query, platformFilter, tagFilter);
  };

  const handlePlatformChange = (platform: string) => {
    setPlatformFilter(platform);
    filterIdeas(searchQuery, platform, tagFilter);
  };

  const handleTagChange = (tag: string) => {
    setTagFilter(tag);
    filterIdeas(searchQuery, platformFilter, tag);
  };

  const filterIdeas = (query: string, platform: string, tag: string) => {
    let filtered = [...mockIdeas];

    if (query) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query.toLowerCase()) ||
          idea.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (platform !== "all") {
      filtered = filtered.filter((idea) => idea.platform === platform);
    }

    if (tag !== "all") {
      filtered = filtered.filter((idea) =>
        idea.tags.some((t) => t === tag || t.includes(tag))
      );
    }

    setFilteredIdeas(filtered);
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Le mie idee</h1>
          <Button asChild>
            <Link to="/new-idea">
              <Lightbulb className="mr-2 h-4 w-4" />
              Nuova idea
            </Link>
          </Button>
        </div>

        <FilterBar
          onSearch={handleSearch}
          onPlatformChange={handlePlatformChange}
          onTagChange={handleTagChange}
        />

        <IdeasList ideas={filteredIdeas} />
      </div>
    </PageLayout>
  );
};

export default Ideas;

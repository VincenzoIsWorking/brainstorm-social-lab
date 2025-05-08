
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

interface PerplexitySearchProps {
  title?: string;
  description?: string;
  placeholder?: string;
}

const PerplexitySearch: React.FC<PerplexitySearchProps> = ({
  title = "Ricerca avanzata",
  description = "Utilizza Perplexity per cercare informazioni rilevanti sul web",
  placeholder = "Cerca tendenze social media, idee di contenuto, o informazioni sul tuo settore..."
}) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        variant: "destructive",
        title: "Query vuota",
        description: "Inserisci un testo per la ricerca.",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Accesso richiesto",
        description: "Devi accedere per utilizzare questa funzione.",
      });
      return;
    }

    setIsSearching(true);
    setResult("");
    setRelatedQuestions([]);

    try {
      const { data, error } = await supabase.functions.invoke('perplexity-search', {
        body: { query }
      });

      if (error) throw new Error(error.message);
      
      const content = data.choices[0]?.message?.content;
      setResult(content || "Nessun risultato trovato.");
      
      // Extract related questions if they exist
      const related = data.choices[0]?.message?.related_questions || [];
      setRelatedQuestions(related);
      
    } catch (error: any) {
      console.error("Search error:", error);
      toast({
        variant: "destructive",
        title: "Errore di ricerca",
        description: error.message || "Si è verificato un errore durante la ricerca.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Testo copiato",
      description: "Il risultato è stato copiato negli appunti",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRelatedQuestionClick = (question: string) => {
    setQuery(question);
    handleSearch();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              onKeyDown={handleKeyDown}
              disabled={isSearching}
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Cerca
          </Button>
        </div>

        {isSearching ? (
          <div className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Ricerca in corso...</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                className="min-h-[200px] text-sm"
                value={result}
                readOnly
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {relatedQuestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Domande correlate:</h4>
                <ul className="space-y-1">
                  {relatedQuestions.map((question, index) => (
                    <li key={index}>
                      <Button
                        variant="link"
                        className="text-left h-auto p-0 text-sm"
                        onClick={() => handleRelatedQuestionClick(question)}
                      >
                        {question}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
      {!result && !isSearching && (
        <CardFooter className="text-sm text-muted-foreground">
          Utilizza questa funzione per cercare informazioni aggiornate sul web che possono aiutarti a creare contenuti migliori.
        </CardFooter>
      )}
    </Card>
  );
};

export default PerplexitySearch;


import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import IdeaForm from "@/components/ideas/IdeaForm";
import IdeaResults from "@/components/ideas/IdeaResults";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Tipo per l'idea
type Idea = {
  title: string;
  description: string;
  platform: "linkedin" | "facebook" | "twitter" | "youtube" | "tiktok" | "instagram";
};

// Tipo per la valutazione dell'idea
type Evaluation = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: {
    hashtags: string[];
    duration?: string;
    hook: string;
    visualStyle: string;
  };
};

const NewIdea = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const navigate = useNavigate();

  // Funzione per generare una valutazione mock
  const generateMockEvaluation = (idea: Idea): Evaluation => {
    // In un'app reale, questa funzione dovrebbe chiamare un'API di AI
    const mockScore = Math.floor(Math.random() * 40) + 60; // Score tra 60 e 99
    
    // Mock data basata sulla piattaforma
    const platformSpecificData: Record<string, any> = {
      linkedin: {
        strengths: [
          "Il contenuto è adatto a un pubblico professionale",
          "Il formato webinar è molto apprezzato su LinkedIn",
          "La tematica è rilevante per il target B2B"
        ],
        weaknesses: [
          "Manca una call-to-action chiara",
          "Potrebbe beneficiare di dati statistici"
        ],
        recommendations: {
          hashtags: ["#WorkRemote", "#LinkedInLearning", "#ProfessionalDevelopment", "#CareerGrowth", "#BusinessStrategy"],
          duration: "25-30 minuti per i webinar, 2-3 minuti per i video teaser",
          hook: "Scopri come le aziende Fortune 500 hanno aumentato la produttività del 27% con il lavoro remoto",
          visualStyle: "Professionale con grafiche minimaliste, utilizzo di blu e bianco, visualizzazione di dati in infografiche"
        }
      },
      facebook: {
        strengths: [
          "Il contenuto è coinvolgente per la community",
          "Il formato è adatto alla condivisione",
          "La tematica può generare discussioni"
        ],
        weaknesses: [
          "Potrebbe richiedere una componente più visiva",
          "La lunghezza potrebbe essere eccessiva per Facebook"
        ],
        recommendations: {
          hashtags: ["#TechTrends", "#MarketInsights", "#DigitalStrategy", "#SocialMediaTips", "#BusinessGrowth"],
          hook: "Le 3 tendenze tecnologiche che stanno rivoluzionando il mercato nel 2023",
          visualStyle: "Immagini colorate e coinvolgenti, grafici semplificati, utilizzo di elementi visivi che catturino l'attenzione durante lo scrolling"
        }
      },
      twitter: {
        strengths: [
          "Formato conciso adatto alla piattaforma",
          "Potenziale per diventare virale",
          "Tema rilevante per discussioni"
        ],
        weaknesses: [
          "Potrebbe richiedere una serie di tweet per completezza",
          "Mancano elementi visuali d'impatto"
        ],
        recommendations: {
          hashtags: ["#TechTalk", "#DigitalStrategy", "#TwitterTips", "#MarketingInsights", "#BusinessTrends"],
          hook: "3 ragioni sorprendenti per cui le tue campagne social non stanno performando come dovrebbero",
          visualStyle: "Grafica semplice ma d'impatto, utilizzo di colori contrastanti, infografiche concise"
        }
      },
      youtube: {
        strengths: [
          "Formato tutorial perfetto per YouTube",
          "Topic che genera ricerche costanti",
          "Potenziale per iscrizioni al canale"
        ],
        weaknesses: [
          "Richiede una produzione video di qualità",
          "Potrebbe necessitare di aggiornamenti periodici"
        ],
        recommendations: {
          hashtags: ["#DevTutorial", "#MobileDevelopment", "#ReactNative", "#CodingTips", "#AppDevelopment"],
          duration: "12-15 minuti per tutorial completo, considera una serie di video più brevi",
          hook: "Crea la tua prima app mobile in meno di un'ora - anche se parti da zero",
          visualStyle: "Schermo condiviso con codice, palette colori scura per il codice, inserti con spiegazioni visive animate"
        }
      },
      tiktok: {
        strengths: [
          "Formato breve ideale per TikTok",
          "Potenziale di engagement elevato",
          "Tema adatto a un pubblico giovane"
        ],
        weaknesses: [
          "Potrebbe necessitare di un approccio più creativo",
          "Manca un elemento di tendenza attuale"
        ],
        recommendations: {
          hashtags: ["#TeamChallenge", "#WorkCulture", "#OfficeLife", "#CompanyVibes", "#CreativeMinds"],
          duration: "15-30 secondi per clip, considera multipli clip per una serie",
          hook: "Ecco come abbiamo trasformato un lunedì noioso in una giornata memorabile in 30 secondi",
          visualStyle: "Movimenti di camera dinamici, transizioni veloci, musica di tendenza, utilizzo di testo sovrapposto"
        }
      },
      instagram: {
        strengths: [
          "Formato reel ottimo per Instagram",
          "Topic che può attirare engagement",
          "Potenziale per salvare nei preferiti"
        ],
        weaknesses: [
          "Richiede elementi visivi di alta qualità",
          "Potrebbe necessitare di un tocco più creativo"
        ],
        recommendations: {
          hashtags: ["#SEOTips", "#DigitalMarketing", "#InstagramGrowth", "#BusinessHacks", "#ContentStrategy"],
          duration: "Reels di 15-30 secondi, in serie di 3-5 per un argomento completo",
          hook: "Il segreto SEO che il 90% dei marketer non conosce (e che può raddoppiare il tuo traffico)",
          visualStyle: "Grafiche pulite con font ben leggibili, utilizzo di testo animato, palette di colori coerente, transizioni fluide"
        }
      }
    };
    
    // Seleziona i dati specifici per la piattaforma
    const platformData = platformSpecificData[idea.platform];
    
    return {
      score: mockScore,
      strengths: platformData.strengths,
      weaknesses: platformData.weaknesses,
      recommendations: platformData.recommendations
    };
  };

  const handleSubmitIdea = (idea: Idea) => {
    setIsSubmitting(true);
    setCurrentIdea(idea);
    
    // Simula una chiamata API con un ritardo
    setTimeout(() => {
      const mockEvaluation = generateMockEvaluation(idea);
      setEvaluation(mockEvaluation);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleSaveIdea = () => {
    // In un'app reale, qui salveremmo l'idea nel database
    toast({
      title: "Idea salvata con successo",
      description: "Puoi visualizzarla nella sezione 'Le mie idee'",
    });
    navigate("/ideas");
  };

  const handleDiscardIdea = () => {
    // Reimposta lo stato e mostra nuovamente il form
    setCurrentIdea(null);
    setEvaluation(null);
    toast({
      title: "Idea scartata",
      description: "Puoi creare una nuova idea",
      variant: "destructive",
    });
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Nuova idea</h1>
        
        <div className="max-w-2xl mx-auto">
          {!currentIdea || !evaluation ? (
            <IdeaForm onSubmit={handleSubmitIdea} isSubmitting={isSubmitting} />
          ) : (
            <IdeaResults
              title={currentIdea.title}
              platform={currentIdea.platform}
              evaluation={evaluation}
              onSave={handleSaveIdea}
              onDiscard={handleDiscardIdea}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default NewIdea;

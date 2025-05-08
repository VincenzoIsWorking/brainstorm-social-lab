
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Account e abbonamenti",
    questions: [
      {
        question: "Come posso creare un account?",
        answer: "Puoi creare un account gratuitamente cliccando su 'Inizia Gratis' nella nostra homepage. Dovrai fornire il tuo nome, indirizzo email e creare una password. Una volta completata la registrazione, avrai accesso immediato alla dashboard."
      },
      {
        question: "Quali metodi di pagamento accettate?",
        answer: "Accettiamo tutte le principali carte di credito (Visa, Mastercard, American Express) e PayPal. I pagamenti vengono elaborati in modo sicuro attraverso il nostro partner di pagamento."
      },
      {
        question: "Posso cambiare piano in qualsiasi momento?",
        answer: "Sì, puoi modificare il tuo piano in qualsiasi momento dalla sezione 'Account' nella tua dashboard. Se passi a un piano superiore, ti verrà addebitata solo la differenza proporzionale al tempo rimanente del tuo abbonamento attuale. Se passi a un piano inferiore, la modifica sarà attiva dal prossimo periodo di fatturazione."
      },
      {
        question: "Offrite una prova gratuita?",
        answer: "Sì, offriamo un account gratuito con funzionalità di base che puoi utilizzare per sempre. Questo ti permette di provare la piattaforma prima di passare a un piano a pagamento per accedere a funzionalità più avanzate."
      }
    ]
  },
  {
    category: "Funzionalità e utilizzo",
    questions: [
      {
        question: "Come funziona la generazione di idee AI?",
        answer: "La nostra tecnologia AI analizza le tendenze dei social media, il tuo settore e il tuo pubblico di riferimento per generare idee di contenuti pertinenti. Puoi specificare parametri come piattaforma, tono, obiettivi e il nostro sistema creerà suggerimenti personalizzati per i tuoi contenuti."
      },
      {
        question: "Posso programmare post su più piattaforme social?",
        answer: "Al momento, il nostro calendario editoriale ti permette di pianificare i contenuti, ma non pubblichiamo direttamente sui social media. Puoi esportare il tuo calendario e utilizzarlo con strumenti di pubblicazione social di terze parti."
      },
      {
        question: "Come posso personalizzare i template?",
        answer: "Nella sezione Template della dashboard, puoi selezionare qualsiasi template predefinito e personalizzarlo secondo le tue esigenze. Puoi modificare testo, colori, immagini e struttura. Una volta modificato, puoi salvare il template personalizzato nella tua libreria per uso futuro."
      },
      {
        question: "Ci sono limiti al numero di idee che posso generare?",
        answer: "Il piano Standard include 100 idee AI al mese. Il piano Premium offre idee illimitate. Se hai un account gratuito, hai un limite di 5 idee al mese."
      }
    ]
  },
  {
    category: "Supporto tecnico",
    questions: [
      {
        question: "Come posso ottenere supporto se ho problemi?",
        answer: "Offriamo diverse opzioni di supporto. Puoi consultare la nostra documentazione nella sezione Guide, contattarci via email dalla pagina Supporto o, per gli utenti Premium, utilizzare il supporto prioritario con tempi di risposta garantiti."
      },
      {
        question: "Offrite formazione o tutorial per i nuovi utenti?",
        answer: "Sì, offriamo una serie di tutorial video e guide scritte nella sezione Guide del nostro sito. Inoltre, organizziamo regolarmente webinar gratuiti per i nuovi utenti per aiutarti a iniziare."
      }
    ]
  },
  {
    category: "Privacy e sicurezza",
    questions: [
      {
        question: "Come proteggete i miei dati?",
        answer: "Utilizziamo crittografia avanzata per proteggere tutti i tuoi dati. Le tue informazioni sono archiviate in server sicuri e non vengono mai condivise con terze parti senza il tuo consenso esplicito. Puoi consultare la nostra Politica sulla Privacy per maggiori dettagli."
      },
      {
        question: "Posso esportare i miei dati se decido di chiudere l'account?",
        answer: "Sì, puoi richiedere un'esportazione completa dei tuoi dati in qualsiasi momento dalla sezione Impostazioni del tuo account. Ti forniremo un file compresso con tutti i tuoi contenuti, idee salvate e altre informazioni."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Domande frequenti</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trova risposte alle domande più comuni su SocialLab
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((category, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="mb-8">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        
        <div className="mt-16 border-t pt-12">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Hai ancora domande?</CardTitle>
                <CardDescription>Non riesci a trovare la risposta che stai cercando?</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <Button asChild variant="outline">
                  <Link to="/guides">Consulta le Guide</Link>
                </Button>
                <Button asChild>
                  <Link to="/support">Contatta il Supporto</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;

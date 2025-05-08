
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isWeekend, isSameDay } from "date-fns";
import { it } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Calendar as CalendarIcon, Edit } from "lucide-react";

// Social platform colors
const platformColors = {
  instagram: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-200",
  facebook: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200",
  tiktok: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200",
  linkedin: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300 border-sky-200",
  twitter: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 border-cyan-200",
  youtube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
};

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  platform: string;
  time: string;
  description: string;
  status: "draft" | "scheduled" | "published";
}

interface EventFormData {
  title: string;
  date: Date;
  platform: string;
  time: string;
  description: string;
  status: "draft" | "scheduled";
}

// Dummy calendar data with properly typed status values
const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Post sulla nuova collezione",
    date: new Date(2025, 4, 10),
    platform: "instagram",
    time: "12:00",
    description: "Presentazione dei nuovi prodotti con foto in studio.",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Video tutorial del prodotto",
    date: new Date(2025, 4, 12),
    platform: "tiktok",
    time: "17:30",
    description: "Tutorial di 30 secondi che mostra come utilizzare il nostro prodotto.",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Articolo sul settore",
    date: new Date(2025, 4, 14),
    platform: "linkedin",
    time: "09:00",
    description: "Analisi delle tendenze del settore con insights esclusivi.",
    status: "draft",
  },
  {
    id: 4,
    title: "Sondaggio preferenze clienti",
    date: new Date(2025, 4, 15),
    platform: "instagram",
    time: "15:00",
    description: "Sondaggio nelle stories per capire le preferenze dei clienti.",
    status: "scheduled",
  },
  {
    id: 5,
    title: "Diretta Q&A",
    date: new Date(2025, 4, 18),
    platform: "facebook",
    time: "18:30",
    description: "Sessione live di domande e risposte con il nostro esperto.",
    status: "draft",
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState<number | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: new Date(),
    platform: "",
    time: "12:00",
    description: "",
    status: "draft"
  });

  // Events for selected date
  const selectedDateEvents = events.filter(event => 
    isSameDay(event.date, date)
  );

  // All events sorted by date
  const sortedEvents = [...events].sort((a, b) => 
    a.date.getTime() - b.date.getTime()
  );

  const handleDayClick = (day: Date) => {
    setDate(day);
  };

  const openEventDialog = (event?: CalendarEvent) => {
    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        platform: event.platform,
        time: event.time,
        description: event.description,
        status: event.status === "published" ? "scheduled" : event.status
      });
      setIsEditMode(true);
      setEditEventId(event.id);
    } else {
      setFormData({
        title: "",
        date: date,
        platform: "",
        time: "12:00",
        description: "",
        status: "draft"
      });
      setIsEditMode(false);
      setEditEventId(null);
    }
    setIsEventDialogOpen(true);
  };

  const confirmDelete = (eventId: number) => {
    setEventToDelete(eventId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (eventToDelete !== null) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      toast({
        title: "Evento eliminato",
        description: "L'evento è stato eliminato dal calendario.",
      });
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (isEditMode && editEventId) {
      // Update existing event
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.id === editEventId 
            ? { ...formData, id: event.id, status: formData.status } 
            : event
        )
      );
      toast({
        title: "Evento aggiornato",
        description: "Le modifiche sono state salvate.",
      });
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        ...formData,
        id: Math.max(0, ...events.map(e => e.id)) + 1,
        status: formData.status,
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Evento creato",
        description: "Il nuovo evento è stato aggiunto al calendario.",
      });
    }
    setIsEventDialogOpen(false);
  };

  // Function to check if a date has events
  const hasEvents = (day: Date) => {
    return events.some(event => isSameDay(event.date, day));
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendario Editoriale</h1>
            <p className="text-muted-foreground">
              Pianifica e organizza i contenuti per i tuoi social media
            </p>
          </div>
          <div className="flex gap-3">
            <Tabs value={view} onValueChange={(v) => setView(v as "calendar" | "list")} className="w-[260px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
                <TabsTrigger value="list">Lista</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={() => openEventDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Nuovo contenuto
            </Button>
          </div>
        </div>
        
        <div>
          <TabsContent value="calendar" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <Card className="col-span-2 p-4">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  locale={it}
                  modifiers={{
                    hasEvents: (date) => hasEvents(date),
                  }}
                  modifiersStyles={{
                    hasEvents: { 
                      fontWeight: 'bold',
                      backgroundColor: 'hsl(var(--brand-50))'
                    },
                  }}
                  styles={{
                    day_selected: {
                      backgroundColor: 'hsl(var(--brand-600))',
                      color: 'white',
                      borderRadius: '3px',
                    }
                  }}
                />
              </Card>

              {/* Events for selected date */}
              <Card className="col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>
                      {format(date, "d MMMM yyyy", { locale: it })}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {isToday(date) 
                      ? "Contenuti per oggi" 
                      : "Contenuti pianificati"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nessun contenuto programmato</p>
                      <Button 
                        variant="ghost" 
                        onClick={() => openEventDialog()}
                        className="mt-2"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Aggiungi contenuto
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedDateEvents.map(event => (
                        <Card key={event.id} className="p-3 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <Badge className={platformColors[event.platform as keyof typeof platformColors]}>
                                  {event.platform}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{event.time}</span>
                              </div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                            </div>
                            <div className="flex">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => openEventDialog(event)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => confirmDelete(event.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <Card className="p-6">
              <div className="space-y-3">
                {sortedEvents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p className="mb-2">Nessun contenuto programmato</p>
                    <Button 
                      onClick={() => openEventDialog()}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Aggiungi il tuo primo contenuto
                    </Button>
                  </div>
                ) : (
                  sortedEvents.map(event => (
                    <Card key={event.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge className={platformColors[event.platform as keyof typeof platformColors]}>
                              {event.platform}
                            </Badge>
                            <Badge variant={event.status === "published" ? "default" : event.status === "scheduled" ? "secondary" : "outline"}>
                              {event.status === "published" ? "Pubblicato" : event.status === "scheduled" ? "Programmato" : "Bozza"}
                            </Badge>
                          </div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        </div>
                        <div className="flex flex-col sm:items-end justify-between">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => openEventDialog(event)}
                              className="h-8"
                            >
                              <Edit className="h-4 w-4 mr-1" /> Modifica
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => confirmDelete(event.id)}
                              className="h-8 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Elimina
                            </Button>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2 sm:mt-0">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                              {format(event.date, "d MMM yyyy", { locale: it })} - {event.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>
        </div>
        
        {/* Add/Edit Event Dialog */}
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Modifica contenuto" : "Nuovo contenuto"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? "Modifica i dettagli del contenuto pianificato." 
                  : "Aggiungi un nuovo contenuto al tuo calendario editoriale."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo</Label>
                <Input 
                  id="title" 
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="Titolo del contenuto"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <div className="relative">
                    <Input 
                      id="date"
                      type="date"
                      value={format(formData.date, "yyyy-MM-dd")}
                      onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        if (!isNaN(newDate.getTime())) {
                          handleFormChange('date', newDate);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Ora</Label>
                  <Input 
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleFormChange('time', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="platform">Piattaforma</Label>
                <Select 
                  value={formData.platform} 
                  onValueChange={(value) => handleFormChange('platform', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona piattaforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Stato</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleFormChange('status', value as "draft" | "scheduled")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bozza</SelectItem>
                    <SelectItem value="scheduled">Programmato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  placeholder="Descrizione del contenuto..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handleSubmit}>
                {isEditMode ? "Salva modifiche" : "Aggiungi contenuto"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Conferma eliminazione</DialogTitle>
              <DialogDescription>
                Sei sicuro di voler eliminare questo contenuto? Questa azione non può essere annullata.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Annulla
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Elimina
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Calendar;

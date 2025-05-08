
import React, { useState } from "react";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isSameDay, isSameMonth, parseISO } from "date-fns";
import { it } from "date-fns/locale";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Status badge colors
const statusColors = {
  draft: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 border-amber-200",
  scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-200",
  published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
};

// Platform badge colors
const platformColors = {
  linkedin: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300 border-sky-200",
  facebook: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 border-indigo-200",
  x: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 border-gray-200", // Changed from twitter to x
  instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300 border-pink-200",
  tiktok: "bg-black text-white dark:bg-gray-800 dark:text-gray-200 border-gray-400",
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
    date: new Date(2024, 4, 10),
    platform: "instagram",
    time: "10:00",
    description: "Lancio della nuova collezione estiva",
    status: "scheduled",
  },
  {
    id: 2,
    title: "Video tutorial makeup",
    date: new Date(2024, 4, 12),
    platform: "youtube",
    time: "15:00",
    description: "Tutorial di makeup estivo con i nuovi prodotti",
    status: "draft",
  },
  {
    id: 3,
    title: "Articolo sul blog",
    date: new Date(2024, 4, 15),
    platform: "linkedin",
    time: "08:30",
    description: "Articolo sulle tendenze del settore",
    status: "published",
  },
  {
    id: 4,
    title: "Sondaggio utenti",
    date: new Date(2024, 4, 20),
    platform: "facebook",
    time: "12:00",
    description: "Sondaggio sulle preferenze dei clienti",
    status: "scheduled",
  },
  {
    id: 5,
    title: "Reel su nuovi prodotti",
    date: new Date(2024, 4, 25),
    platform: "instagram",
    time: "17:00",
    description: "Reel sui nuovi arrivi del mese",
    status: "draft",
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: new Date(),
    platform: "instagram",
    time: "12:00",
    description: "",
    status: "draft",
  });
  
  // Handle date selection in calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  // Get events for selected day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.date, day));
  };
  
  // Event day style - used to highlight days with events
  const dayHasEvent = (day: Date) => {
    return events.some(event => isSameDay(day, event.date));
  };
  
  // Create new event
  const handleCreateEvent = () => {
    const newEvent: CalendarEvent = {
      id: events.length + 1,
      title: formData.title,
      date: formData.date,
      platform: formData.platform,
      time: formData.time,
      description: formData.description,
      status: formData.status,
    };
    
    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
    
    // Reset form data
    setFormData({
      title: "",
      date: new Date(),
      platform: "instagram",
      time: "12:00",
      description: "",
      status: "draft",
    });
    
    toast({
      title: "Evento creato",
      description: `${formData.title} è stato aggiunto al calendario.`,
    });
  };
  
  // Update event
  const handleUpdateEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...formData } : event
      );
      setEvents(updatedEvents);
      setIsDialogOpen(false);
      setSelectedEvent(null);
      
      toast({
        title: "Evento aggiornato",
        description: `${formData.title} è stato aggiornato.`,
      });
    }
  };
  
  // Delete event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setIsDialogOpen(false);
      setSelectedEvent(null);
      
      toast({
        title: "Evento eliminato",
        description: `${selectedEvent.title} è stato rimosso dal calendario.`,
      });
    }
  };
  
  // Open dialog for new event
  const openNewEventDialog = () => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      date: date,
      platform: "instagram",
      time: "12:00",
      description: "",
      status: "draft",
    });
    setIsDialogOpen(true);
  };
  
  // Open dialog for editing existing event
  const openEditEventDialog = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      platform: event.platform,
      time: event.time,
      description: event.description,
      status: event.status === "published" ? "scheduled" : event.status,
    });
    setIsDialogOpen(true);
  };
  
  // Handle input changes
  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Calendario Contenuti</h1>
          <Button onClick={openNewEventDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Nuovo contenuto
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
                <CardDescription>Gestisci i tuoi contenuti</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  locale={it}
                  modifiers={{ hasEvents: (day) => dayHasEvent(day) }}
                  modifiersStyles={{
                    hasEvents: { 
                      fontWeight: 'bold',
                      backgroundColor: 'hsl(var(--brand-50))'
                    },
                  }}
                  styles={{
                    day: {
                      borderRadius: '3px',
                    }
                  }}
                  components={{
                    DayContent: (props) => (
                      <div 
                        className={cn(
                          "flex relative items-center justify-center p-0",
                          props.selected && "bg-brand-600 text-white rounded-md"
                        )}
                      >
                        {props.date.getDate()}
                        {dayHasEvent(props.date) && (
                          <div className="absolute bottom-0 w-1 h-1 bg-brand-600 rounded-full"></div>
                        )}
                      </div>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Events list */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Contenuti per {format(date, "d MMMM yyyy", { locale: it })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getEventsForDay(date).length > 0 ? (
                    getEventsForDay(date).map((event) => (
                      <div 
                        key={event.id}
                        className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        onClick={() => openEditEventDialog(event)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className={platformColors[event.platform as keyof typeof platformColors]}>
                              {event.platform}
                            </Badge>
                            <Badge variant="outline" className={statusColors[event.status]}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <CalendarIcon className="h-4 w-4 mr-1" /> {event.time}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Nessun contenuto programmato per questa data</p>
                      <Button variant="outline" size="sm" onClick={openNewEventDialog}>
                        <Plus className="h-4 w-4 mr-1" /> Aggiungi contenuto
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modal for creating/editing events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Modifica contenuto" : "Nuovo contenuto"}</DialogTitle>
            <DialogDescription>
              {selectedEvent 
                ? "Modifica i dettagli del contenuto programmato." 
                : "Aggiungi un nuovo contenuto al calendario."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titolo</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Inserisci un titolo"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PP") : "Seleziona data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && handleInputChange("date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Ora</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={formData.time} 
                  onChange={(e) => handleInputChange("time", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="platform">Piattaforma</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => handleInputChange("platform", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona piattaforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="x">X</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Stato</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value as "draft" | "scheduled")}
                  disabled={selectedEvent?.status === "published"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bozza</SelectItem>
                    <SelectItem value="scheduled">Programmato</SelectItem>
                    {selectedEvent?.status === "published" && (
                      <SelectItem value="published">Pubblicato</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descrivi il contenuto"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            {selectedEvent && (
              <Button variant="destructive" type="button" onClick={handleDeleteEvent}>
                <Trash2 className="h-4 w-4 mr-1" /> Elimina
              </Button>
            )}
            <div>
              <Button variant="outline" type="button" className="mr-2" onClick={() => setIsDialogOpen(false)}>
                Annulla
              </Button>
              <Button 
                type="button" 
                onClick={selectedEvent ? handleUpdateEvent : handleCreateEvent}
                disabled={!formData.title}
              >
                {selectedEvent ? "Aggiorna" : "Crea"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Calendar;


import { useState } from "react";
import { CalendarEvent, EventFormData } from "@/types/calendar";
import { useToast } from "@/hooks/use-toast";
import { isSameDay } from "date-fns";

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

export const useCalendarEvents = () => {
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
  
  // Handle input changes
  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
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

  return {
    date,
    events,
    isDialogOpen,
    selectedEvent,
    formData,
    handleDateSelect,
    getEventsForDay,
    dayHasEvent,
    handleInputChange,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    openNewEventDialog,
    openEditEventDialog,
    setIsDialogOpen
  };
};

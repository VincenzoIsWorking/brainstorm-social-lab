
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import CalendarSidebar from "@/components/calendar/CalendarSidebar";
import EventList from "@/components/calendar/EventList";
import EventFormDialog from "@/components/calendar/EventFormDialog";
import { useCalendarEvents } from "@/hooks/use-calendar-events";

const Calendar = () => {
  const {
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
  } = useCalendarEvents();

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
            <CalendarSidebar 
              date={date}
              onDateChange={handleDateSelect}
              dayHasEvent={dayHasEvent}
            />
          </div>
          
          {/* Events list */}
          <div className="md:col-span-2">
            <EventList 
              date={date}
              events={getEventsForDay(date)}
              openEditEventDialog={openEditEventDialog}
              openNewEventDialog={openNewEventDialog}
            />
          </div>
        </div>
      </div>
      
      {/* Modal for creating/editing events */}
      <EventFormDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        formData={formData}
        selectedEvent={selectedEvent}
        handleInputChange={handleInputChange}
        handleCreateEvent={handleCreateEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </PageLayout>
  );
};

export default Calendar;

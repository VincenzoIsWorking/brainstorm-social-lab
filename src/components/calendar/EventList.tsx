
import React from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarEvent } from "@/types/calendar";
import { platformColors, statusColors } from "@/utils/calendar-colors";

interface EventListProps {
  date: Date;
  events: CalendarEvent[];
  openEditEventDialog: (event: CalendarEvent) => void;
  openNewEventDialog: () => void;
}

const EventList: React.FC<EventListProps> = ({
  date,
  events,
  openEditEventDialog,
  openNewEventDialog,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Contenuti per {format(date, "d MMMM yyyy", { locale: it })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
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
  );
};

export default EventList;

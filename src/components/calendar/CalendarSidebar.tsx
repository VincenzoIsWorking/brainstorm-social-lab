
import React from "react";
import { it as itLocale } from "date-fns/locale"; // Corrected import for Italian locale
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";

interface CalendarSidebarProps {
  date: Date;
  onDateChange: (date: Date | undefined) => void;
  dayHasEvent: (day: Date) => boolean;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  date,
  onDateChange,
  dayHasEvent,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario</CardTitle>
        <CardDescription>Gestisci i tuoi contenuti</CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateChange}
          className="rounded-md border pointer-events-auto"
          locale={itLocale}
          modifiers={{ hasEvents: (day) => dayHasEvent(day) }}
          modifiersStyles={{
            hasEvents: { 
              fontWeight: 'bold',
              backgroundColor: 'hsl(var(--brand-50))'
            }
          }}
          styles={{
            day: {
              borderRadius: '3px'
            }
          }}
          components={{
            DayContent: (props) => (
              <div 
                className={cn(
                  "flex relative items-center justify-center p-0",
                  isSameDay(props.date, date) && "bg-brand-600 text-white rounded-md"
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
  );
};

export default CalendarSidebar;

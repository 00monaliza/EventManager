import EventFilters from '@/components/events/EventFilters'
import EventList from '@/components/events/EventList'

export default function EventsPage() {
  return (
    <>
      <EventFilters />
      <EventList mode="filtered" />
    </>
  )
}

document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let modal = document.getElementById("eventModal");
    let eventTitleInput = document.getElementById("eventTitle");
    let eventDateInput = document.getElementById("eventDate");

    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        events: [], // Initial empty event array
        eventContent: function(arg) {
            let deleteButton = document.createElement('span');
            deleteButton.innerHTML = "X"; // "X" button
            deleteButton.classList.add("fc-event-delete");

            // Prevent the FullCalendar eventClick from firing when "X" is clicked
            deleteButton.onclick = function(e) {
                e.stopPropagation(); // Prevents eventClick from firing
                if (confirm('Are you sure you want to delete this event?')) {
                    arg.event.remove(); // Remove the event on clicking "X"
                }
            };

            let titleElement = document.createElement('span');
            titleElement.innerHTML = arg.event.title;

            let arrayOfDomNodes = [titleElement, deleteButton];
            return { domNodes: arrayOfDomNodes };
        },
        dateClick: function(info) {                
            eventDateInput.value = info.dateStr; // Store the date of the clicked day
            modal.style.display = "block"; // Show the modal
        },
        eventClick: function(info) {
            // Prompt for deletion confirmation
            if (confirm('Are you sure you want to delete this event?')) {
                info.event.remove(); // Remove the event from the calendar
            }
        }
    });
    document.getElementById("eventForm").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent default form submission
        var title = eventTitleInput.value; // Get the event title
        var date = eventDateInput.value; // Get the clicked date

        // Add new event to the calendar
        calendar.addEvent({
            title: title,
            start: date,
            allDay: true, // Set as an all-day event
            id: Date.now().toString() // Generate a unique ID
        });

        modal.style.display = "none"; // Hide the modal after creation
        eventTitleInput.value = ''; // Clear the input field
    });

    // Close modal on clicking the close button
    document.getElementById("closeModal").addEventListener("click", function() {
        modal.style.display = "none"; // Hide the modal
    });
    calendar.render();
});

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("calendar").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("calendar").style.marginLeft= "250px";
}
/*
function addEvent(){
    calendar.events.add({
            title: title,
            start: new Date(),
            allDay: true, // Set as an all-day event
            })
        }
            */
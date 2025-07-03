document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("event-list");

    /* ---- main ---- */
    async function fetchEvents() {
        try {
            const res = await fetch("/events");
            const events = await res.json();
            list.innerHTML = "";

            if (!Array.isArray(events) || events.length === 0) {
                list.innerHTML = "<li>No events yet.</li>";
                return;
            }

            [...events].reverse().forEach((evt) => {
                const li = document.createElement("li");
                li.textContent = buildMessage(evt);
                list.appendChild(li);
            });
        } catch (err) {
            console.error(err);
            list.innerHTML = `<li style="color:red;">Error loading events</li>`;
        }
    }

    function fmt(raw) {
        if (!raw) return new Date().toLocaleString("en-IN", { hour12: true });
        const d = new Date(raw);
        if (!isNaN(d)) {
            return d.toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
        }
        return raw;
    }

    function pickTS(evt) {
        return (
            evt.head_commit?.timestamp ||
            evt.pull_request?.merged_at ||
            evt.pull_request?.created_at ||
            evt.pull_request?.updated_at ||
            evt.hook?.updated_at ||
            evt.timestamp
        );
    }

    /* ---- helper: build human sentence ---- */
    function buildMessage(evt) {
        const ts = fmt(pickTS(evt));

        /* PUSH */
        if (evt.pusher && evt.commits) {
            const author = evt.pusher.name || evt.pusher.username || "Unknown";
            const branch = evt.ref?.split("/").pop() || "branch";
            return `${author} pushed to ${branch} on ${ts}`;
        }

        /* PULL‑REQUEST */
        if (evt.pull_request) {
            const pr = evt.pull_request;
            const from = pr.head?.ref || "unknown";
            const to = pr.base?.ref || "unknown";
            const user = pr.user?.login || evt.sender?.login || "Unknown";

            /* merged */
            if (pr.merged || (evt.action === "closed" && pr.merged === true)) {
                return `${user} merged branch ${from} to ${to} on ${ts}`;
            }
            return `${user} opened a pull request from ${from} to ${to} on ${ts}`;
        }

        /* Ping / hook event */
        if (evt.hook) {
            const user = evt.sender?.login || "Someone";
            return `${user} pinged the webhook on ${ts}`;
        }

        /* fallback */
        return `Unrecognized event on ${ts}`;
    }

    /* first call & 15‑sec polling */
    fetchEvents();
    setInterval(fetchEvents, 15_000);
});

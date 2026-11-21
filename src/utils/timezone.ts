/**
 * Timezone conversion utilities for date-aware Indian Standard Time (IST)
 * and Halifax (America/Halifax) conversions.
 */

export interface FormattedEventTime {
  istTimeFormatted: string;
  halifaxTimeFormatted: string;
  isDateConfigured: boolean;
  timeZoneAbbreviation: string;
  fullDateString?: string;
}

/**
 * Calculates date-aware time for Halifax given an IST time and optional date.
 */
export function getHalifaxTime(
  eventDateStr: string | null,
  eventTimeIST: string = "19:00"
): FormattedEventTime {
  const [hoursIST, minutesIST] = eventTimeIST.split(":").map(Number);

  // If no date is configured, explain both ADT and AST possibilities accurately
  if (!eventDateStr) {
    return {
      istTimeFormatted: "7:00 PM IST",
      halifaxTimeFormatted: "9:30 AM ADT (Summer/Fall) / 8:30 AM AST (Winter)",
      isDateConfigured: false,
      timeZoneAbbreviation: "ADT / AST",
    };
  }

  try {
    // Parse the given date
    const [year, month, day] = eventDateStr.split("-").map(Number);

    // 19:00 IST in UTC is 13:30 UTC (IST is UTC + 5:30)
    // In general, UTC milliseconds = Date.UTC(year, month - 1, day, hours, minutes) - (5.5 * 3600 * 1000)
    const istOffsetMs = (5 * 60 + 30) * 60 * 1000;
    const localIstMs = Date.UTC(year, month - 1, day, hoursIST, minutesIST);
    const eventUtcDate = new Date(localIstMs - istOffsetMs);

    // Format in America/Halifax
    const halifaxFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Halifax",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });

    const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Halifax",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Extract timezone name (ADT or AST)
    const parts = halifaxFormatter.formatToParts(eventUtcDate);
    const tzPart = parts.find((p) => p.type === "timeZoneName")?.value || "AT";
    const formattedHalifax = halifaxFormatter.format(eventUtcDate);

    // Format IST
    const istFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });

    return {
      istTimeFormatted: istFormatter.format(eventUtcDate),
      halifaxTimeFormatted: formattedHalifax,
      isDateConfigured: true,
      timeZoneAbbreviation: tzPart,
      fullDateString: fullDateFormatter.format(eventUtcDate),
    };
  } catch (err) {
    console.error("Error formatting timezone:", err);
    return {
      istTimeFormatted: "7:00 PM IST",
      halifaxTimeFormatted: "9:30 AM Halifax Time",
      isDateConfigured: false,
      timeZoneAbbreviation: "ADT",
    };
  }
}

/**
 * Calculates remaining countdown time until the event
 */
export function getCountdownTime(
  eventDateStr: string | null,
  eventTimeIST: string = "19:00"
) {
  if (!eventDateStr) return null;

  try {
    const [hoursIST, minutesIST] = eventTimeIST.split(":").map(Number);
    const [year, month, day] = eventDateStr.split("-").map(Number);

    const istOffsetMs = (5 * 60 + 30) * 60 * 1000;
    const localIstMs = Date.UTC(year, month - 1, day, hoursIST, minutesIST);
    const targetUtcMs = localIstMs - istOffsetMs;
    const nowUtcMs = Date.now();

    const diffMs = targetUtcMs - nowUtcMs;

    if (diffMs <= 0) {
      return {
        isPast: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      isPast: false,
      days,
      hours,
      minutes,
      seconds,
    };
  } catch {
    return null;
  }
}

/**
 * Calculates elapsed relationship duration
 */
export function getRelationshipDuration(startDateStr: string | null) {
  if (!startDateStr) return null;

  try {
    const start = new Date(startDateStr);
    const now = new Date();

    if (isNaN(start.getTime())) return null;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      // Get days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffHours = now.getHours();

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours: diffHours,
    };
  } catch {
    return null;
  }
}

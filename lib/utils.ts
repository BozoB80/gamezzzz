import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to calculate the last played date within the desired range
const calculateLastPlayedDate = () => {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 16); // Random days between 0 and 15
  const lastPlayedDate = new Date(today);
  lastPlayedDate.setDate(today.getDate() - daysAgo);
  return lastPlayedDate;
};

// Format the last played date
export const formatLastPlayedDate = (date: Date): string => {
  const today = new Date();
  const timeDifference = today.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference <= 5) {
    return `${daysDifference} days ago`;
  } else {
    // Format the date in the "Mon. 7th" format with English month names
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      localeMatcher: 'best fit',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  }
};


// Get the last played date
const lastPlayedDate = calculateLastPlayedDate();
export const playedDate = formatLastPlayedDate(lastPlayedDate)
export const convertTime = (s, timeZone = 'UTC'): string => {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone,
    });
    
    return new Date(s).toISOString().slice(0, 19).replace('T', ' ');
    // return formatDate(new Date(parseInt(s)),'MMM d, y hh:mm:ss', 'en_GB')
  }
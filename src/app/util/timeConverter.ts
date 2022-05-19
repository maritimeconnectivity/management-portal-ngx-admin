export const convertTime = (s, timeZone = 'UTC'): string => {
  if (s) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone,
    });
    return new Date(s).toISOString().slice(0, 19).replace('T', ' ');
  }
}
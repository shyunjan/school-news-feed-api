export default function isCurrentTimeInRange(
  start_time_str: string,
  end_time_str: string,
  country: string
): boolean {
  let offset_hours = 0; // UTC
  switch (country) {
    case 'Cambodia': // 캄보디아
      offset_hours = 7;
      break;
    case 'Korea': // 한국
      offset_hours = 9;
      break;
    default:
      break; // UTC
  }

  const current_date = new Date(
    new Date().getTime() + offset_hours * 60 * 60 * 1000
  );
  const current_hours = current_date.getUTCHours();
  const current_minutes = current_date.getUTCMinutes();

  const start_hours = parseInt(start_time_str.split(':')[0]);
  const start_minutes = parseInt(start_time_str.split(':')[1]);

  const end_hours = parseInt(end_time_str.split(':')[0]);
  const end_minutes = parseInt(end_time_str.split(':')[1]);

  const current_time_in_minutes = current_hours * 60 + current_minutes;
  const start_time_in_minutes = start_hours * 60 + start_minutes;
  const end_time_in_minutes = end_hours * 60 + end_minutes;

  return (
    current_time_in_minutes >= start_time_in_minutes &&
    current_time_in_minutes <= end_time_in_minutes
  );
}

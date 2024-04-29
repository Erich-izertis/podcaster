import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function CellDuration(duration: number): JSX.Element {
    const durationObj = dayjs.duration(duration);
    const formattedDuration = `${durationObj.hours()}:${durationObj.minutes()}:${durationObj.seconds()}`;

    return <span>{formattedDuration}</span>;
}

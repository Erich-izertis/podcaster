import {FormattedDate} from 'react-intl';
export default function CellDate(date: string): JSX.Element {

    return (
      <FormattedDate year="numeric"
                     month="long"
                     day="2-digit"
                     value={new Date(date)} />
    );
}
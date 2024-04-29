// cells components
import CellTitle from './CellTitle'
import CellDate from './CellDate'
import CellDuration from './CellDuration'

export default [
  {
    title: 'Title',
    dataIndex: 'trackName',
    render: CellTitle,
  },
  {
    title: 'Date',
    dataIndex: 'releaseDate',
    render: CellDate,
  },
  {
    title: 'Duration',
    dataIndex: 'trackTimeMillis',
    render: CellDuration,
  }
];

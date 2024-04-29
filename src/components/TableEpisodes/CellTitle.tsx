import { Link } from "react-router-dom";

interface DataType {
    collectionId: number;
    trackId: number;
}

export default function CellTitle(title: string, row: DataType): JSX.Element {
    return (
        <Link className='text-blue-800'
              to={`/podcast/${row.collectionId}/episode/${row.trackId}`}
              key={row.collectionId}>
          {title}
       </Link>
    );
}
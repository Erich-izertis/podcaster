import Table from 'antd/es/table';
// columns definitions
import columns from './columns'

export interface TableEpisodesProps {
    data: Array<any>
    total: number
    loading: boolean
}

export default function TableEpisodes({ data, total, loading }: TableEpisodesProps): JSX.Element {
    const title = () => <p className='font-semibold text-lg'>Episodes: {total}</p>;

    const propsTable = {
        title,
        columns,
        loading,
        rowKey: 'trackId',
        dataSource: data,
        pagination:{
            style: {
              marginBottom: -45,
                marginRight: 16
            },
            position: ['topRight', 'none']
        }
    }

    // @ts-ignore
    return <Table {...propsTable} />;
}
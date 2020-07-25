import React, {useContext} from 'react';
import FetchContext from '../../../contexts/FetchContext';
import PageBase from '../../base/PageBase';

const Area = (props) => {
    var fetchHelper = useContext(FetchContext);
    const data = React.useMemo(
        fetchHelper.get, []
    );
    
    const columns = React.useMemo(() => [
            {
                Header: 'id',
                accessor: 'id',
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Facturable',
                accessor: 'isBillable',
                canSort: false
            }
        ], []
    );
    var grid = {
        data: data,
        columns: columns
    }

    return (
        <PageBase grid={grid} title="Áreas" />
    );
}

export default Area;
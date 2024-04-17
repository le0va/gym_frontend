import { useMemo } from "react";
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { ITrainingUser } from "../../types";
import './index.scss';


interface UsersTableProps {
    data: ITrainingUser[];
}


const UsersTable = ({ data }: UsersTableProps) => {

    const columns = useMemo<MRT_ColumnDef<ITrainingUser>[]>(
        () => [
            {
                header: '№Гурт/Кім',
                accessorFn: (dataRow) => `${dataRow.hostel}) ${dataRow.room}`,
                id: 'hostelRoom'
            },
            {
                header: 'Імʼя',
                accessorFn: (dataRow) => dataRow.name,
                id: 'userName'
            },
            {
                header: 'Початок',
                accessorFn: (dataRow) => `${dataRow.trainingStart?.getHours() < 10 ? '0' : ''}${dataRow.trainingStart?.getHours()}:${dataRow.trainingStart?.getMinutes() < 10 ? '0' : ''}${dataRow.trainingStart?.getMinutes()}`,
                id: 'trainingStart',
            }
        ], [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                width: {
                    xs: column.id === 'userName' ? '265px' :
                        column.id === 'trainingStart' ? '80px' : 'auto',
                    sm: '150px',
                    md: '150px',
                    lg: '150px',
                    xl: '150px'
                },
                minWidth: '0px',
                padding: column.id === 'hostelRoom' ? '0px 5px 0px 20px' : '15px 10px',
            }
        }),
        muiTableBodyCellProps: ({ column }) => ({
            sx: {
                width: {
                    xs: column.id === 'userName' ? '280px' : 'auto',
                },
                minWidth: '0px',
                padding: column.id === 'hostelRoom' ? '0px 5px 0px 25px' : '15px 10px',

            }
        }),
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: false,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableHiding: false,
        enableFullScreenToggle: false,
        enableFilters: false,
        enableSorting: false,
        enablePagination: false,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        localization: MRT_Localization_UK
    });

    return <MaterialReactTable
        table={table}

    />;
}


export default UsersTable;
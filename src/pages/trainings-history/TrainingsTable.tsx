import { useMemo } from 'react';
import { observer } from 'mobx-react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    MRT_SortingState,
    MRT_PaginationState
} from 'material-react-table';
import { MRT_Localization_UK } from 'material-react-table/locales/uk';
import { Updater } from '@tanstack/table-core/build/lib/types';
import { ITrainingsStore } from '../../store/trainings.store';
import { ITrainingSession } from '../../types';


interface TrainingsTableProps {
    store: ITrainingsStore;
}


const TrainingsTable = ({ store }: TrainingsTableProps) => {
    const tableOutputByDate = store.tableOutputByDate;

    const handleGlobalFilterChange = (updaterOrValue: Updater<string>) => {
        const oldFilter = store.searchMRT;
        const newFilter = updaterOrValue instanceof Function ? updaterOrValue(oldFilter) : updaterOrValue;
        store.setSearchMRT(newFilter);
    }

    const handleSortingChange = (updaterOrValue: Updater<MRT_SortingState>) => {
        const oldSorting = store.sortingMRT;
        const newSorting = updaterOrValue instanceof Function ? updaterOrValue(oldSorting) : updaterOrValue;
        store.setSortingMRT(newSorting);
    }

    const handlePaginationChange = (updaterOrValue: Updater<MRT_PaginationState>) => {
        const oldPagination = store.paginationMRT;
        const newPagination = updaterOrValue instanceof Function ? updaterOrValue(oldPagination) : updaterOrValue;
        store.setPaginationMRT(newPagination);
    }

    const columns = useMemo<MRT_ColumnDef<ITrainingSession>[]>(
        () => [
            {
                header: 'Кім.№',
                accessorFn: (dataRow) => dataRow.user?.room === 0 ? '-' : dataRow.user?.room,
                id: 'room',
                muiFilterTextFieldProps: {
                    placeholder: 'Фільтр по кімнаті'
                },
            },
            {
                header: 'Імʼя',
                accessorFn: (dataRow) => dataRow.user?.name,
                id: 'userName',
                muiFilterTextFieldProps: {
                    placeholder: 'Фільтр по імені'
                }
            },
            {
                header: 'Початок',
                accessorFn: (dataRow) => tableOutputByDate ?
                    `${dataRow.start.getHours() < 10 ? '0' : ''}${dataRow.start.getHours()}:${dataRow.start.getMinutes() < 10 ? '0' : ''}${dataRow.start.getMinutes()}` :
                    `${dataRow.start.getDate() < 10 ? '0' : ''}${dataRow.start.getDate()}.${dataRow.start.getMonth() < 9 ? '0' : ''}${dataRow.start.getMonth() + 1}.${dataRow.start.getFullYear()} / ${dataRow.start.getHours() < 10 ? '0' : ''}${dataRow.start.getHours()}:${dataRow.start.getMinutes() < 10 ? '0' : ''}${dataRow.start.getMinutes()}`,
                id: 'trainingStart'
            },
            {
                header: 'Кінець',
                accessorFn: (dataRow) => `${dataRow.end.getHours() < 10 ? '0' : ''}${dataRow.end.getHours()}:${dataRow.end.getMinutes() < 10 ? '0' : ''}${dataRow.end.getMinutes()}`,
                id: 'trainingEnd'
            }
        ],
        [tableOutputByDate],
    );

    const table = useMaterialReactTable({
        columns,
        data: store.trainings,
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                width: {
                    xs: column.id === 'userName' ? '200px' :
                        column.id === 'trainingStart' ? '60px' :
                            column.id === 'trainingEnd' ? '60px' : 'auto',
                    sm: '150px',
                    md: '150px',
                    lg: '150px',
                    xl: '150px'
                },
                minWidth: '0px',
                padding: column.id === 'room' ? '0px 5px 0px 20px' : '15px 10px',
            }
        }),
        muiTableBodyCellProps: ({ column }) => ({
            sx: {
                width: {
                    xs: column.id === 'userName' ? '200px' : 'auto',
                },
                minWidth: '0px',
                padding: column.id === 'room' ? '0px 5px 0px 25px' : '15px 10px',

            }
        }),
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableDensityToggle: false,
        enableHiding: false,
        enableFullScreenToggle: false,
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        enableColumnFilters: false,
        enableFilters: !tableOutputByDate,
        enableGlobalFilter: !tableOutputByDate,
        enableSorting: !tableOutputByDate,
        enablePagination: !tableOutputByDate,
        enableTopToolbar: !tableOutputByDate,
        enableBottomToolbar: !tableOutputByDate,
        initialState: {
            showGlobalFilter: true
        },
        state: {
            sorting: store.sortingMRT,
            pagination: {
                pageIndex: store.paginationMRT.pageIndex,
                pageSize: tableOutputByDate ? 300 : store.paginationMRT.pageSize
            }
        },
        onGlobalFilterChange: handleGlobalFilterChange,
        onSortingChange: handleSortingChange,
        onPaginationChange: handlePaginationChange,
        muiPaginationProps: {
            showRowsPerPage: false,
            showFirstButton: false,
            showLastButton: false,
            shape: 'rounded',
        },
        paginationDisplayMode: 'pages',
        rowCount: store.paginationMeta.totalItems,
        localization: MRT_Localization_UK
    });

    return <MaterialReactTable table={table} />;
}


export default observer(TrainingsTable);
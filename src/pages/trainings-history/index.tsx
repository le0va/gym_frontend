import { useEffect } from "react";
import { observer } from "mobx-react";
import Datepicker from "./Datepicker";
import DropdownViewController from "./DropdownViewController";
import TrainingsTable from "./TrainingsTable";
import Message from "../../components/ui/Message";
import { ITrainingsStore } from "../../store/trainings.store";
import './index.scss';


interface TrainingsHistoryProps {
    store: ITrainingsStore;
}


const TrainingsHistory = ({ store }: TrainingsHistoryProps) => {

    useEffect(() => {
        store.setError('');
        store.fetchTrainings();
    }, [store.searchMRT, store.sortingMRT, store.filterDate, store.tableOutputByDate, store.paginationMRT]);

    return (
        <div className="trainings-history__wrapper">
            <div className="container">
                {store.error && <Message type="error">{store.error}</Message>}

                <div className="control-panel">
                    {store.tableOutputByDate &&
                        <Datepicker
                            currentDate={store.filterDate}
                            setCurrentDate={store.setFilterDate.bind(store)}
                            className="trainings-history__datepicker" />
                    }
                    <DropdownViewController
                        isTableOutputByDate={store.tableOutputByDate}
                        setIsTableOutputByDate={store.setTableOutputByDate.bind(store)}
                    />
                </div>

                <TrainingsTable store={store} />
            </div>
        </div>

    );
}


export default observer(TrainingsHistory);
import { useRef, useState } from 'react';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import Dropdown from '../../components/ui/Dropdown';
import Switch from '../../components/ui/Switch';
import './filterSettings.scss';


interface FilterSettingsProps {
    isTableOutputByDate: boolean;
    setIsTableOutputByDate: (isActive: boolean) => void;
}


const FilterSettings = ({ isTableOutputByDate, setIsTableOutputByDate }: FilterSettingsProps) => {
    const [isOn, setIsOn] = useState(isTableOutputByDate);
    const switchRef = useRef<HTMLLabelElement>(null);

    const handleCloseDropdownOnClick = (e: React.MouseEvent, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (switchRef.current?.contains(e.target as Node)) {
            setTimeout(() => setIsOpen(false), 200);     // await for handleChangeOption
        }
    }

    return (
        <Dropdown
            trigger={<TuneSharpIcon className='filter-settings__trigger' />}
            onDropdownClick={handleCloseDropdownOnClick}
        >
            <div className='filter-settings__container'>
                <p>Фільтр по даті</p>
                <Switch
                    ref={switchRef}
                    isOn={isOn}
                    handleToggle={() => {
                        setIsOn(!isOn)                                      //
                        setTimeout(() => {                                  //  smooth table change animation
                            setIsTableOutputByDate(!isTableOutputByDate)    //  
                        }, 220);
                    }}
                />
            </div>
        </Dropdown>
    );
}


export default FilterSettings;
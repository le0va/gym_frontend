import Dropdown from "../../components/ui/Dropdown";
import Button from "../../components/ui/Button";
import './dropdownViewController.scss';


interface DropdownViewControllerProps {
    isTableOutputByDate: boolean;
    setIsTableOutputByDate: (isActive: boolean) => void;
}


const DropdownViewController = ({
    isTableOutputByDate,
    setIsTableOutputByDate
}: DropdownViewControllerProps) => {

    const closeDropdownOnClick = (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        setTimeout(() => {
            setOpen(false);     // await for handleChangeOption
        }, 0);
    }

    return (
        <Dropdown
            className="trainings-history__view-controller"
            trigger={<Button className="trigger">Відображати: {isTableOutputByDate ? 'По даті' : 'Усі'}</Button>}
            onDropdownClick={closeDropdownOnClick}
        >
            <>
                <label className="option">
                    <input
                        type="checkbox"
                        checked={isTableOutputByDate}
                        onChange={() => setIsTableOutputByDate(true)}
                    />
                    По даті
                </label>
                <label className="option">
                    <input
                        type="checkbox"
                        checked={!isTableOutputByDate}
                        onChange={() => setIsTableOutputByDate(false)}
                    />
                    Усі
                </label>
            </>
        </Dropdown>
    );
}


export default DropdownViewController;
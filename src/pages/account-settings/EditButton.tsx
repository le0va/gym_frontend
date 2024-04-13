import Button from "../../components/ui/Button";


interface EditButtonProps {
    enableEditMode: () => void;
}

const EditButton = ({ enableEditMode }: EditButtonProps) => {
    return (
        <Button type="button" onClick={enableEditMode}>Редагувати</Button>
    );
}


export default EditButton;
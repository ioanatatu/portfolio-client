import { MdClear } from "react-icons/md";

const CloseButton = (props) => {
    return (
        <div onClick={props.click}>
            <MdClear />
        </div>
    );
};

export default CloseButton;

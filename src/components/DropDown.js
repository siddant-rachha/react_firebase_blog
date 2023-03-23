//bootstrap
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

function DropDown({ dropdown, setDropdown }) {
    return (
        <>
            {console.log('DROPDOWN COMPONENT.JS RENDERED')}

            <DropdownButton className=""
                as={ButtonGroup}
                id="dropdwon"
                variant="outline-primary"
                title={dropdown}
            >
                <Dropdown.Item eventKey="1" onClick={() => setDropdown("latest")} active={dropdown == "latest" ? true : false} >latest</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => setDropdown("oldest")} active={dropdown == "oldest" ? true : false} >oldest</Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={() => setDropdown("premium")} active={dropdown == "premium" ? true : false} >premium</Dropdown.Item>
            </DropdownButton>
        </>
    )
}

export default DropDown
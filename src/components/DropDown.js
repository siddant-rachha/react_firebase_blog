import React from 'react'
import { DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'

function DropDown({dropdown, setDropdown}) {
    return (
        <DropdownButton className=""
            as={ButtonGroup}
            id="dropdwon"
            variant="outline-primary"
            title={dropdown}
        >
            <Dropdown.Item eventKey="1" onClick={() => setDropdown("latest")} active={dropdown == "latest" ? true : false} >latest</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setDropdown("oldest")} active={dropdown == "oldest" ? true : false} >oldest</Dropdown.Item>
        </DropdownButton>
    )
}

export default DropDown
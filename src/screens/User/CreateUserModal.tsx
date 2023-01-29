import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { CreateUserForm } from "../../components/User/Form/CreateForm"

export const CreateUserModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {
  const toggle = () => setOpen(!open)
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>បង្កើតអ្នកប្រើប្រាស់</ModalHeader>
      <ModalBody>
        <CreateUserForm />
      </ModalBody>
    </Modal>
  )
}
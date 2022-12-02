import Form from "react-bootstrap/Form"

const FormRow = ({type, name, value, handleChange, placeholder}) => {
  return (
    <Form.Group className='py-2'>
      <Form.Label>{placeholder}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Form.Group>
  )
}
export default FormRow
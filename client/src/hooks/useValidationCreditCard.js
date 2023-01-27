import { useCallback, useState } from 'react'

const useValidationCreditCard = () => {
  const [valueValidate, setValueValidate] = useState('')

  const formatValue = useCallback(
    (e, { maxLengthForInputField, newValue, maxLengthToAddNewValue }) => {
      if (!e && !maxLengthForInputField && !newValue && !maxLengthForInputField)
        return setValueValidate('')

      const inputVal = e.target.value.replace(/ /g, '')
      let inputNumbersOnly = inputVal.replace(/\D/g, '')

      if (inputNumbersOnly.length > maxLengthForInputField) {
        inputNumbersOnly = inputNumbersOnly.substr(0, maxLengthForInputField)
      }

      const maxLengthRegEx = new RegExp(maxLengthToAddNewValue, 'g')
      const splits = inputNumbersOnly.match(maxLengthRegEx)

      let spacedNumber = ''
      if (splits) spacedNumber = splits.join(newValue)

      setValueValidate(spacedNumber)
    },
    []
  )

  return { valueValidate, formatValue }
}
export default useValidationCreditCard

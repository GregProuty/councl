import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

const Checkbox = () => (
  <RadixCheckbox.Root className='bg-white w-[25px] h-[25px] rounded flex justify-center items-center shadow'>
    <RadixCheckbox.Indicator>
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
)

export default Checkbox
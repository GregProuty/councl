import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'
// .CheckboxRoot {
//   background-color: white;
//   width: 25px;
//   height: 25px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 2px 10px var(--blackA7);
// }

const Checkbox = () => (
  <RadixCheckbox.Root className='bg-white w-[25px] h-[25px] rounded flex justify-center items-center shadow'>
    <RadixCheckbox.Indicator>
      <CheckIcon />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
)

export default Checkbox
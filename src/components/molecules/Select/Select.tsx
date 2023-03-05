
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { clsx } from "clsx"
import React from "react"

import { SENTIMENTS } from '@/consts/enums'

import Button from "./Button"

type SelectProps = {
  onValueChange: (e: any) => void
};

const Select = (props: SelectProps) => (
  <SelectPrimitive.Root defaultValue="neutral" onValueChange={props.onValueChange}>
    <SelectPrimitive.Trigger aria-label="Food" asChild>
      <Button>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="ml-2">
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </Button>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Content>
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronUpIcon />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="-mt-10 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
        <SelectPrimitive.Group>
          {SENTIMENTS.map(
            (f, i) => (
              <SelectPrimitive.Item
                className={clsx(
                  "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900",
                  "radix-disabled:opacity-50",
                  "focus:outline-none select-none"
                )}
                // disabled={f === "Neutral"}
                key={`${f}-${i}`}
                value={f.toLowerCase()}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            )
          )}
        </SelectPrimitive.Group>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
        <ChevronDownIcon />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Root>
)

export default Select
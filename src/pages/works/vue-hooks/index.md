#### `useValid`

##### Description

The `useValid` function is used for form validation and supports various validation rules, including `required`, `pattern`, and custom validators. It allows you to validate form fields and provides methods to trigger individual and all validations.

##### Usage

###### Parameters

- `rules` (type: `Rules`): An object containing the validation rules for form fields.

  Example:

  ```javascript
  {
    name: [{ required: true, message: 'Please enter a name' }],
    age: [{ required: true, message: 'Please enter an age' }],
    phone: [
      { required: true, message: 'Please enter a phone number' },
      { pattern: /^1\d{10}$/, message: 'Please enter a valid phone number' }
    ],
  }
  ```


###### Return Value
The function returns an array containing three elements:

1. validResult (type: IValidResult): An object that stores the validation results for each form field.

2. triggerValidProp (type: triggerValidProp): A function used to trigger validation for a specific form field.

3. triggerValidAll (type: triggerValidAll): A function used to trigger validation for all form fields.


###### Example

```javascript
const [validResult, triggerValidProp, triggerValidAll] = useValid({
  name: [{ required: true, message: "Please enter a name" }],
  age: [{ required: true, message: "Please enter an age" }],
  phone: [
    { required: true, message: "Please enter a phone number" },
    { pattern: /^1\d{10}$/, message: "Please enter a valid phone number" },
  ],
});

triggerValidProp("name", ""); // { prop: 'name', valid: false, message: 'Please enter a name' }
triggerValidProp("name", "John Doe"); // { prop: 'name', valid: true, message: 'Validation passed' }
triggerValidAll({ name: "John Doe", age: 25, phone: "12345678901" });
// Returns: [true, [{ prop: 'name', valid: true, message: 'Validation passed' },
//                 { prop: 'age', valid: true, message: 'Validation passed' },
//                 { prop: 'phone', valid: false, message: 'Please enter a valid phone number' }]]

console.log(validResult);
// Returns:
// {
//   name: { prop: 'name', valid: true, message: 'Validation passed' },
//   age: { prop: 'age', valid: true, message: 'Validation passed' },
//   phone: { prop: 'phone', valid: false, message: 'Please enter a valid phone number' }
// }
```

#### `useViewSize`

##### Description

The `useViewSize` function is a Vue 3 Composition API function designed to provide reactive information about the current viewport size. It also offers a computed property to determine the size type based on a configuration object.

##### Usage

###### Parameters

- `config` (type: `IConfig`, optional): An object that defines custom breakpoints and their corresponding numerical values. If not provided, it uses default breakpoints.

  Default Configuration:

  ```javascript
  {
    xm: 520,
    sm: 640,
    md: 768,
    mxd: 821,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  ```

###### Return Value

The function returns an array containing two elements:

1. sizeType (type: ComputedRef\<string>): A computed property that determines the current viewport size type based on the provided or default configuration.

2. size (type: { width: number; height: number }): A reactive object that provides the current viewport's width and height.

``` javascript
import { ref, onBeforeUnmount } from "vue";
import { useViewSize } from "./useViewSize";

// Define custom breakpoints
const customConfig = {
  xs: 400,
  sm: 600,
  md: 900,
};

const [sizeType, size] = useViewSize(customConfig);

// Access the computed size type
console.log(sizeType.value); // e.g., "md"

// Access the reactive size object
console.log(size.width); // Current viewport width
console.log(size.height); // Current viewport height

// Cleanup event listener on component unmount
onBeforeUnmount(() => {
  // Remove the event listener
  // You may need to do this depending on your Vue component structure
});

```


#### `useToggle`

#### Description

The `useToggle` function is a Vue 3 Composition API function used for toggling between two values. It allows you to easily switch between two provided values and provides a function to trigger the toggle action.

##### Usage

###### Parameters

- `values` (type: `[T, T]`): An array containing the two values between which you want to toggle.

###### Return Value

The function returns an array containing two elements:

1. `active` (type: `Ref<T>`): A reactive reference that represents the current active value.

2. `toggle` (type: `(value?: T) => void`): A function that is used to toggle between the two values. If a specific value is provided as an argument, it sets that value as the new active value.

###### Example

```javascript
import { ref } from "vue";
import { useToggle } from "./useToggle";

const [active, toggle] = useToggle([1, 2]);

// Toggle between the two values
toggle(); // active.value = 2 (initially set to the first value, toggles to the second value)
toggle(); // active.value = 1 (toggles back to the first value)
toggle(2); // active.value = 2 (sets the active value to the second value)
toggle(1); // active.value = 1 (sets the active value to the first value)

// Access the current active value
console.log(active.value); // The current active value (either 1 or 2)


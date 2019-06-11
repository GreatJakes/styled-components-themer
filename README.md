# styled-components-themer - JavaScript Object to CSS

Use this if you:

* use styled-components in your project.
* hate writing CSS *and* JS inside template literals.
* have an IDE with code completion features.
* don't want to declare a new component for every single element that you want to style.
* have a complex design system that isn't based on scales.

This utility function is a more robust and customizable implementation of React and styled-components' JS-to-CSS methods. It greatly improves on [styled-components](https://www.styled-components.com/)' theming capabilities by escaping the hassle of template literal syntax. It allows for greater code reuse and modular styling. It also contains a few shortcuts to make your job even easier and is designed to be modified to your specific needs.

To be clear: Themer does not do anything that styled-components can't already do. It just makes accomplishing those things a lot faster and with less boilerplate.

This is not a dependency package. It's just a file with some code; its written to be easily modifiable to your purposes. The themer() function outputs a string that contains the style properties to be inserted into a styled-component's string literal.

Note: This was written to work with styled-components, but the output of the function can be compiled into CSS by most pre-processors.

## Installation
Simply copy themer.js anywhere into your project and import the themer function where you see fit.

## Usage
When you create a component with styled-components, call the themer function within the template literal and pass the theme prop to it:

```jsx
import styled   from 'styled-components'
import {themer} from '../utils/themer'

const Div = styled.div`${props => themer(props.theme)}`

export default Div
```

Then, write your styles as if they were a JavaScript object:

```js
const styleObject = {
    display: flex,
    flexDirection: column,
    alignItems: center,
    margin: '0 auto',
    height: '100%',
    width: '100%',
    position: absolute,
    top: 0,
    left: 0,
    boxSizing: borderBox,
}
```

Finally, pass your style object to the component's theme prop:

```jsx
<Div theme={styleObject} {...props} />
```

## Writing Styles in JavaScript
In the basic usage example, you'll see a plain JavaScript object. The object's properties should be familiar to you, as this is how inline styles are written for standard React components. Themer takes that concept and runs with it.

### Shortcuts
Here are a few ways to make writing styles in JSON even easier.

#### Numbers to Pixel Values
Just like when writing inline styles for React components, you can use a raw number value where a single pixel value is needed. Themer will automatically add the 'px' at the end. If the style needs multiple values, or has units other than pixels, you should wrap the value in quotes.

```js
const exampleStyle = {
    height: 100,
    width: '100%',
    margin: '0 auto'
}

// height: 100px;
// width: 100%;
// margin: 0 auto;
```

#### Mixins & the Spread Operator
With JavaScript objects, every style object is potentially a mixin. Just use the ES6 spread operator to insert the properties of one object into another. Then, you can overwrite the properties as you see fit.

```js
const exampleMixin = {
    height: 50,
    backgroundColor: 'blue'
}

const exampleStyle = {
    ...exampleMixin,
    height: 100
}

// background-color: blue;
// height: 100px;
```

#### Common String Values as Variables
You may notice that in some of the examples above, some string values do not have quotes around them. That's because themer.js exports a set of variables that are direct translations from the variable name to a CSS value. These are declared for the most common string values, provided that their names don't clash with any other variable. If your IDE has some auto-import feature for used variables, you can focus on writing just the CSS without those pesky single quotes slowing you down.

#### Input Field Placeholders
Adjusting the appearance of placeholder text within a field is pretty simple:

```js
const exampleStyle = {
    placeholder: {
        color: black
    }
}
```

### CSS Pseudo-classes and Pseudo-elements
Hover states are easy - just write the hover property as an object that contains its own styles. Other pseudo-classes and pseudo-elements are just as easy. For pseudo-classes that require a parameter (in parenthesis), just add the 'param' property to the object.

```js
const exampleStyle = {
    color: white,
    margin: '0 auto',
    hover: {
        color: black,
    },
    lastChild: {
        borderBottom: '1px solid #ccc'
    },
    nthChild: {
        param: '3n+3',
        backgroundColor: 'blue'
    },
    before: {
        content: '"\\2013\\0020"',
        height: 25,
    },
}
```
### Media Queries
To provide styling for a particular media query, you can define that media query string within the 'media' object near the bottom of the themer.js file.

Default configuration: The predefined breakpoints are: mobile, tablet, small (small desktop), large (large desktop), and print. This arrangement assumes that styles are written mobile-first. This means that styles written outside of the media query notation will be applied to mobile layouts and will be inherited all the way up to larger breakpoints - styles written for the tablet breakpoint are not applied to the mobile breakpoint, but are inherited in larger breakpoints, and so on. If you want to write styles that ONLY apply to the mobile breakpoint without having to cancel them out in other scopes, use the 'mobile' breakpoint (it's essentially "mobile-only"). Additionally, the print layout only inherits the tablet breakpoint (I've found this extremely convenient when styling for printers).

Example:

```js
const exampleStyle = {
    display: flex,
    fontSize: 18,
    mobile: {
        flexDirection: column
    },
    tablet: {
        fontSize: 16
    },
    small: {
        fontSize: 18
    },
    large: {
        fontSize: 20
    },
}
```

You can nest media queries inside of styles, or you can nest styles inside of media queries. Write it however you desire. Styled-components will sort it out.

### Modifier Classes
With React and styled-components, you don't often need modifier classes, but when you do, themer has got you covered. If the component you're styling gets a className applied to it that is supposed to change its appearance, you can use the following notation:

```js
const exampleStyle = {
    class: {
        name: 'active',
        backgroundColor: 'yellow'
    }
}

// .component-class.active { background-color: yellow; }
```

If you need multiple modifier classes, just make the class property an array of multiple objects. The name property can also be an array if you want to apply the same styles across multiple modifier classes.

```js
const exampleStyle = {
    class: [
        {
            name: 'active',
            backgroundColor: 'yellow'
        },
        {
            name: ['inactive', 'disabled'],
            backgroundColor: 'gray'
        }
    ]
}
```

### Child Selectors
If you need to style a child element, just do this:

```js
const exampleStyle = {
    child: {
        selector: '> a',
        color: 'blue'
    }
}

// .component-class > a { color: blue; } 
```

Just like with modifier classes above, if you need to define styles for multiple child selectors, make the child property an array. The selector property can also be an array if you want to apply the same styles across multiple selectors.

### Browser-specific CSS
You can target specific browsers.

```js
const exampleStyle = {
    ie: {              // IE10 & 11
        color: 'blue'
    },
    ff: {              // Firefox
        color: 'red'
    },
    edge: {            // Edge
        color: 'teal'
    },
    ios: {             // Safari on iOS
        color: 'green'
    },
    safari: {          // Safari 9+
        color: 'brown'
    }
}
```

### @keyframes

Declaring keyframes follows the expected syntax. Here, we want to include an "ident" property, for the animation's identifier name.

```js
const exampleStyle = {
    keyframes: {
        ident: 'example',
        from: {
            width: 100
        },
        to: {
            width: 0
        }
    }
}

// @keyframes example { from { width: 100px; } to { width: 0; } }

const anotherExampleStyle = {
    keyframes: {
        ident: 'example',
        0: {
            width: 100
        },
        100: {
            width: 0
        }
    }
}

// @keyframes example { 0% { width: 100px; } 100% { width: 0; } }
```

## Tips & Strategies

### Extreme Component Reuse
With themer, you don't need to declare a bunch of different components via styled-components for every unique element in your design. For example, you only need to declare a single styled.div component. From there, just pass the desired (and appropriately-named) style object as the component's theme prop.

```jsx
const Div = styled.div`${props => themer(props.theme)}`
```

You can just use the Div component anywhere you need a styled div:

```jsx
<Div theme={exampleStyle} {...props} />
```

A Div component can be used for any other tag if you're that hyped about code reuse:

```jsx
<Div theme={exampleStyle} as="header" {...props} />
```

### Default and Custom Themes

With the handy use of the ES6 spread operator, you can set a default style for a component while allowing another style object passed to the theme prop:

```jsx
const ExampleComponent = ({theme}) =>
    <Div theme={{...defaultStyle, ...theme}} />

ExampleComponent.defaultProps = {
    theme: {}
}
```

You can also do this within the styled-component's declaration if you want to allow theming for a less reusable component:

```jsx
const Div = styled.div`${props => themer({...defaultStyle, ...props.theme})}`
```

### Complex Styles / Atomic Design
Things may get a little tedious if you have to declare a single style object variable for each and every element that needs to be styled. You can get around this by packaging all of the styles for a single "[molecule](http://bradfrost.com/blog/post/atomic-web-design/#molecules)" together - as long as the names you give to these nested styles do not conflict with any CSS property name or other property that themer uses to function.

```jsx
const defaultStyle = {
    padding: 25,
    backgroundColor: 'pink',
    inner: {
        backgroundColor: black
    }
}

const ExampleComponent = ({theme}) =>
    <Div theme={{...defaultStyle, ...theme}}>
        <Div theme={{...defaultStyle.inner, ...theme.inner}}>Inner Content</Div>
    </Div>

ExampleComponent.defaultProps = {
    theme: {
        inner: {}
    }
}
```

## Coming Soon

* @font-face support.
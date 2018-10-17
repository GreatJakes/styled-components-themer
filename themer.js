import {css}                  from 'styled-components/macro'

/**
 * Takes a theme object and converts it to CSS that is then applied to styled-components
 * Certain properties will convert numerical values into pixel values (see: pixelProperties below)
 *
 * @param {object} theme
 * @returns {string}
 */

export const themer = theme => {
    let style = ''
    for (let prop in theme) {
        if (theme.hasOwnProperty(prop)) {
            if (isCssProperty(prop)) style += handleCssProperty(theme[prop],prop)
            else if (isCssPseudoClass(prop)) style += handleCssPseudoClass(theme[prop], prop)
            else if (isPlaceholder(prop)) style += handlePlaceholder(theme[prop])
            else if (isBreakpoint(prop)) style += handleBreakpoint(theme[prop],prop)
            else if (isModifierClass(prop)) style += handleModifierClass(theme[prop])
            else if (isChildSelector(prop)) style += handleChildSelector(theme[prop])
        }
    }

    return style
}

const isCssProperty = prop => cssProperties[prop]

const isCssPseudoClass = prop => cssPseudoClasses[prop]

const isPlaceholder = prop => prop === 'placeholder'

const isBreakpoint = prop => media.hasOwnProperty(prop)

const isModifierClass = prop => prop === 'class'

const isChildSelector = prop => prop === 'child'

const handleCssProperty = (style, prop) => `${cssProperties[prop]}: ${handleStyle(style, prop)};`

const handleCssPseudoClass = (style, prop) =>
    `&:${cssPseudoClasses[prop]}${style.param !== undefined ? `(${style.param})` : ''} {${themer(style)}}`

const handlePlaceholder = style => {
    let output = ''
    for (let i in placeholderSelectors) {
        output += `${placeholderSelectors[i]} {${themer(style)}}`
    }

    return output
}

const handleBreakpoint = (style, prop) => media[prop]`${themer(style)}`.join('')

const handleModifierClass = style => {
    if (Array.isArray(style)) {
        let output = ''
        for (let i in style) {
            if (style.hasOwnProperty(i))
                output += `&.${style[i].name} {${themer(style[i])}}`
        }

        return output
    }

    return `&.${style.name} {${themer(style)}}`
}

const handleChildSelector = style => {
    if (Array.isArray(style)) {
        let output = ''
        for (let i in style) {
            if (style.hasOwnProperty(i))
                output += `${style[i].selector} {${themer(style[i])}}`
        }

        return output
    }

    return `${style.selector} {${themer(style)}}`
}

const handleStyle = (style, prop) => {
    if (pixelProperties.includes(cssProperties[prop]) && typeof style === 'number' && style !== 0)
        return `${style}px`
    return style
}

const cssProperties = {
    alignContent: 'align-content',
    alignItems: 'align-items',
    alignSelf: 'align-self',
    background: 'background',
    backgroundAttachment: 'background-attachment',
    backgroundColor: 'background-color',
    backgroundImage: 'background-image',
    backgroundOrigin: 'background-origin',
    backgroundPosition: 'background-position',
    backgroundPositionX: 'background-position-x',
    backgroundPositionY: 'background-position-y',
    backgroundRepeat: 'background-repeat',
    backgroundSize: 'backgroundSize',
    border: 'border',
    borderBottom: 'border-bottom',
    borderBottomColor: 'border-bottom-color',
    borderColor: 'border-color',
    borderLeft: 'border-left',
    borderLeftColor: 'border-left-color',
    borderRadius: 'border-radius',
    borderRight: 'border-right',
    borderRightColor: 'border-right-color',
    borderStyle: 'border-style',
    borderTop: 'border-top',
    borderTopColor: 'border-top-color',
    borderWidth: 'border-width',
    bottom: 'bottom',
    boxShadow: 'box-shadow',
    boxSizing: 'box-sizing',
    breakAfter: 'break-after',
    breakBefore: 'break-before',
    breakInside: 'break-inside',
    clear: 'clear',
    clip: 'clip',
    clipPath: 'clip-path',
    color: 'color',
    columnFill: 'column-fill',
    columnGap: 'column-gap',
    columnRule: 'column-rule',
    columnSpan: 'column-span',
    columnWidth: 'column-width',
    columns: 'columns',
    content: 'content',
    cursor: 'cursor',
    direction: 'direction',
    display: 'display',
    filter: 'filter',
    flex: 'flex',
    flexBasis: 'flex-basis',
    flexDirection: 'flex-direction',
    flexGrow: 'flex-grow',
    flexShrink: 'flex-shrink',
    flexWrap: 'flex-wrap',
    float: 'float',
    font: 'font-family',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontWeight: 'font-weight',
    grid: 'grid',
    gridGap: 'grid-gap',
    gridRow: 'grid-row',
    gridTemplate: 'grid-template',
    height: 'height',
    justifyContent: 'justify-content',
    left: 'left',
    letterSpacing: 'letter-spacing',
    lineHeight: 'line-height',
    listStyle: 'list-style',
    markerOffset: 'marker-offset',
    margin: 'margin',
    marginBottom: 'margin-bottom',
    marginLeft: 'margin-left',
    marginRight: 'margin-right',
    marginTop: 'margin-top',
    maxHeight: 'max-height',
    maxWidth: 'max-width',
    minHeight: 'min-height',
    minWidth: 'min-width',
    opacity: 'opacity',
    order: 'order',
    outline: 'outline',
    overflow: 'overflow',
    overflowWrap: 'overflow-wrap',
    overflowX: 'overflow-x',
    overflowY: 'overflow-y',
    padding: 'padding',
    paddingBottom: 'padding-bottom',
    paddingLeft: 'padding-left',
    paddingRight: 'padding-right',
    paddingTop: 'padding-top',
    pageBreakAfter: 'page-break-after',
    pageBreakBefore: 'page-break-before',
    pointerEvents: 'pointer-events',
    position: 'position',
    quotes: 'quotes',
    right: 'right',
    textAlign: 'text-align',
    textDecoration: 'text-decoration',
    textIndent: 'text-indent',
    textShadow: 'text-shadow',
    textTransform: 'text-transform',
    textOverflow: 'text-overflow',
    top: 'top',
    transition: 'transition',
    transform: 'transform',
    verticalAlign: 'vertical-align',
    visibility: 'visibility',
    webkitAppearance: '-webkit-appearance',
    whiteSpace: 'white-space',
    width: 'width',
    wordSpacing: 'word-spacing',
    wordWrap: 'word-wrap',
    zIndex: 'z-index'
}

const pixelProperties = [
    cssProperties.borderRadius,
    cssProperties.bottom,
    cssProperties.columnWidth,
    cssProperties.fontSize,
    cssProperties.height,
    cssProperties.left,
    cssProperties.letterSpacing,
    cssProperties.margin,
    cssProperties.marginBottom,
    cssProperties.marginLeft,
    cssProperties.marginRight,
    cssProperties.marginTop,
    cssProperties.maxHeight,
    cssProperties.maxWidth,
    cssProperties.minHeight,
    cssProperties.minWidth,
    cssProperties.padding,
    cssProperties.paddingBottom,
    cssProperties.paddingLeft,
    cssProperties.paddingRight,
    cssProperties.paddingTop,
    cssProperties.right,
    cssProperties.textIndent,
    cssProperties.top,
    cssProperties.width,
]

const cssPseudoClasses = {
    active: 'active',
    after: 'after',
    before: 'before',
    checked: 'checked',
    disabled: 'disabled',
    empty: 'empty',
    enabled: 'enabled',
    firstChild: 'first-child',
    firstOfType: 'first-of-type',
    focus: 'focus',
    hover: 'hover',
    inRange: 'in-range',
    invalid: 'invalid',
    lang: 'lang',
    lastChild: 'last-child',
    lastOfType: 'last-of-type',
    link: 'link',
    not: 'not',
    nthChild: 'nth-child',
    nthLastChild: 'nth-last-child',
    nthLastOfType: 'nth-last-of-type',
    nthOfType: 'nth-of-type',
    onlyOfType: 'only-of-type',
    onlyChild: 'only-child',
    optional: 'optional',
    outOfRange: 'out-of-range',
    readOnly: 'read-only',
    readWrite: 'read-write',
    required: 'required',
    root: 'root',
    target: 'target',
    valid: 'valid',
    visited: 'visited',
    firstLetter: 'first-letter',
    firstLine: 'first-line',
    selection: 'selection'
}

const placeholderSelectors = [
    ':-moz-placeholder',
    ':-ms-input-placeholder',
    '::-moz-placeholder',
    '::-webkit-input-placeholder'
]

const breakpointUpperLimit = {
    mobile: 768,
    tablet: 1280,
    small: 1630
}

const mediaQuery = (...query) => (...rules) => css`@media ${css(...query)} { ${css(...rules)} }`

const media = {
    mobile: mediaQuery`screen and (max-width: ${breakpointUpperLimit.mobile - 1}px)`,
    tablet: mediaQuery`print, screen and (min-width: ${breakpointUpperLimit.mobile}px)`,
    small: mediaQuery`screen and (min-width: ${breakpointUpperLimit.tablet}px)`,
    large: mediaQuery`screen and (min-width: ${breakpointUpperLimit.small}px)`,
    print: mediaQuery`print`
}

/**
 *  These variable declarations are intended to make styling easier by
 *  eliminating the need to use quotes when writing styles with text values.
 *
 *  These are only useful if your IDE has some sort of auto-import of references.
 */
export const
    absolute = 'absolute',
    auto = 'auto',
    black = 'black',
    block = 'block',
    borderBox = 'border-box',
    center = 'center',
    column = 'column',
    fixed = 'fixed',
    flex = 'flex',
    flexEnd = 'flex-end',
    flexStart = 'flex-start',
    hidden = 'hidden',
    inherit = 'inherit',
    inlineBlock = 'inline-block',
    inlineFlex = 'inline-flex',
    none = 'none',
    normal = 'normal',
    pointer = 'pointer',
    relative = 'relative',
    row = 'row',
    spaceBetween = 'space-between',
    transparent = 'transparent',
    uppercase = 'uppercase',
    white = 'white',
    wrap = 'wrap'
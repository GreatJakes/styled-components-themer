import {css} from 'styled-components/macro'

/**
 * Takes a theme object and converts it to CSS that is then applied to styled-components
 * Certain properties will convert numerical values into pixel values (see: pixelProperties below)
 *
 * @param {object} theme
 * @returns {string}
 */

export const themer = theme => {
    let style = '',
        breakpoints = []
    for (let prop in theme) {
        if (theme.hasOwnProperty(prop)) {
            if (isCssProperty(prop)) style += handleCssProperty(theme[prop], prop)
            else if (isCssPseudoClass(prop)) style += handleCssPseudoClass(theme[prop], prop)
            else if (isPlaceholder(prop)) style += handlePlaceholder(theme[prop])
            else if (isModifierClass(prop)) style += handleModifierClass(theme[prop])
            else if (isChildSelector(prop)) style += handleChildSelector(theme[prop])
            else if (isKeyFrames(prop)) style += handleKeyFrames(theme[prop])
            else if (isBreakpoint(prop)) breakpoints[Object.keys(media).indexOf(prop)] = handleBreakpoint(theme[prop], prop)
        }
    }

    style += breakpoints.join('')
    return style
}

const isCssProperty = prop => cssProperties[prop]

const isCssPseudoClass = prop => cssPseudoClasses[prop]

const isPlaceholder = prop => prop.toLowerCase() === 'placeholder'

const isBreakpoint = prop => media.hasOwnProperty(prop)

const isModifierClass = prop => prop.toLowerCase() === 'class'

const isChildSelector = prop => prop.toLowerCase() === 'child'

const isKeyFrames = prop => prop.toLowerCase() === 'keyframes'

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

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

const handleKeyFrames = style => {
    if (style.ident) {
        let output = ''
        for (let i in style) {
            if (style.hasOwnProperty(i)) {
                if (isNumeric(i))
                    output += `${i}% {${themer(style[i])}}`
                else if (i.toLowerCase() !== 'ident')
                    output += `${i} {${themer(style[i])}}`
            }
        }

        return `@keyframes ${style.ident} {${output}`
    }
}

const cssProperties = {
    alignContent: 'align-content',
    alignItems: 'align-items',
    alignSelf: 'align-self',
    all: 'all',
    animation: 'animation',
    backfaceVisibility: 'backface-visibility',
    background: 'background',
    backgroundAttachment: 'background-attachment',
    backgroundBlendMode: 'background-blend-mode',
    backgroundClip: 'background-clip',
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
    borderBottomLeftRadius: 'border-bottom-left-radius',
    borderBottomRightRadius: 'border-bottom-right-radius',
    borderBottomStyle: 'border-bottom-style',
    borderBottomWidth: 'border-bottom-width',
    borderCollapse: 'border-collapse',
    borderColor: 'border-color',
    borderImage: 'border-image',
    borderImageOutset: 'border-image-outset',
    borderImageRepeat: 'border-image-repeat',
    borderImageSlice: 'border-image-slice',
    borderImageSource: 'border-image-source',
    borderImageWidth: 'border-image-width',
    borderLeft: 'border-left',
    borderLeftColor: 'border-left-color',
    borderLeftStyle: 'border-left-style',
    borderLeftWidth: 'border-left-width',
    borderRadius: 'border-radius',
    borderRight: 'border-right',
    borderRightColor: 'border-right-color',
    borderRightStyle: 'border-right-style',
    borderRightWidth: 'border-right-width',
    borderSpacing: 'border-spacing',
    borderStyle: 'border-style',
    borderTop: 'border-top',
    borderTopColor: 'border-top-color',
    borderTopLeftRadius: 'border-top-left-radius',
    borderTopRightRadius: 'border-top-right-radius',
    borderTopStyle: 'border-top-style',
    borderTopWidth: 'border-top-width',
    borderWidth: 'border-width',
    bottom: 'bottom',
    boxDecorationBreak: 'box-decoration-break',
    boxShadow: 'box-shadow',
    boxSizing: 'box-sizing',
    breakAfter: 'break-after',
    breakBefore: 'break-before',
    breakInside: 'break-inside',
    captionSide: 'caption-side',
    caretColor: 'caret-color',
    clear: 'clear',
    clip: 'clip',
    clipPath: 'clip-path',
    color: 'color',
    columnCount: 'column-count',
    columnFill: 'column-fill',
    columnGap: 'column-gap',
    columnRule: 'column-rule',
    columnRuleColor: 'column-rule-color',
    columnRuleStyle: 'column-rule-style',
    columnRuleWidth: 'column-rule-width',
    columnSpan: 'column-span',
    columnWidth: 'column-width',
    columns: 'columns',
    content: 'content',
    counterIncrement: 'counter-increment',
    counterReset: 'counter-reset',
    cursor: 'cursor',
    direction: 'direction',
    display: 'display',
    emptyCells: 'empty-cells',
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
    fontFeatureSettings: 'font-feature-settings',
    fontKerning: 'font-kerning',
    fontLanguageOverride: 'font-language-override',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontSynthesis: 'font-synthesis',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    grid: 'grid',
    gridArea: 'grid-area',
    gridAutoColumns: 'grid-auto-columns',
    gridAutoFlow: 'grid-auto-flow',
    gridAutoRows: 'grid-auto-rows',
    gridColumn: 'grid-column',
    gridColumnEnd: 'grid-column-end',
    gridColumnGap: 'grid-column-gap',
    gridColumnStart: 'grid-column-start',
    gridGap: 'grid-gap',
    gridRow: 'grid-row',
    gridRowEnd: 'grid-row-end',
    gridRowGap: 'grid-row-gap',
    gridRowStart: 'grid-row-start',
    gridTemplate: 'grid-template',
    gridTemplateAreas: 'grid-template-areas',
    gridTemplateColumns: 'grid-template-columns',
    gridTemplateRows: 'grid-template-rows',
    hangingPunctuation: 'hanging-punctuation',
    height: 'height',
    hyphens: 'hyphens',
    imageRendering: 'image-rendering',
    justifyContent: 'justify-content',
    left: 'left',
    letterSpacing: 'letter-spacing',
    lineBreak: 'line-break',
    lineHeight: 'line-height',
    listStyle: 'list-style',
    listStyleImage: 'list-style-image',
    listStylePosition: 'list-style-position',
    listStyleType: 'list-style-type',
    margin: 'margin',
    marginBottom: 'margin-bottom',
    marginLeft: 'margin-left',
    marginRight: 'margin-right',
    marginTop: 'margin-top',
    markerOffset: 'marker-offset',
    maxHeight: 'max-height',
    maxWidth: 'max-width',
    minHeight: 'min-height',
    minWidth: 'min-width',
    mixBlendMode: 'mix-blend-mode',
    objectFit: 'object-fit',
    objectPosition: 'object-position',
    opacity: 'opacity',
    order: 'order',
    orphans: 'orphans',
    outline: 'outline',
    outlineColor: 'outline-color',
    outlineOffset: 'outline-offset',
    outlineStyle: 'outline-style',
    outlineWidth: 'outline-width',
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
    pageBreakInside: 'page-break-inside',
    perspective: 'perspective',
    perspectiveOrigin: 'perspective-origin',
    pointerEvents: 'pointer-events',
    position: 'position',
    quotes: 'quotes',
    resize: 'resize',
    right: 'right',
    size: 'font-size',
    tabSize: 'tab-size',
    tableLayout: 'table-layout',
    textAlign: 'text-align',
    textAlignLast: 'text-align-last',
    textCombineUpright: 'text-combine-upright',
    textDecoration: 'text-decoration',
    textDecorationColor: 'text-decoration-color',
    textDecorationLine: 'text-decoration-line',
    textDecorationStyle: 'text-decoration-style',
    textIndent: 'text-indent',
    textJustify: 'text-justify',
    textOrientation: 'text-orientation',
    textOverflow: 'text-overflow',
    textShadow: 'text-shadow',
    textTransform: 'text-transform',
    textUnderlinePosition: 'text-underline-position',
    top: 'top',
    transform: 'transform',
    transformOrigin: 'transform-origin',
    transformStyle: 'transform-style',
    transition: 'transition',
    transitionDelay: 'transition-delay',
    transitionDuration: 'transition-duration',
    transitionProperty: 'transition-property',
    transitionTimingFunction: 'transition-timing-function',
    unicodeBidi: 'unicode-bidi',
    userSelect: 'user-select',
    verticalAlign: 'vertical-align',
    visibility: 'visibility',
    webkitAppearance: '-webkit-appearance',
    weight: 'font-weight',
    whiteSpace: 'white-space',
    width: 'width',
    windows: 'windows',
    wordBreak: 'word-break',
    wordSpacing: 'word-spacing',
    wordWrap: 'word-wrap',
    writingMode: 'writing-mode',
    zIndex: 'z-index'
}

const pixelProperties = [
    cssProperties.borderBottomLeftRadius,
    cssProperties.borderBottomRightRadius,
    cssProperties.borderBottomWidth,
    cssProperties.borderLeftWidth,
    cssProperties.borderRightWidth,
    cssProperties.borderTopLeftRadius,
    cssProperties.borderTopRightRadius,
    cssProperties.borderTopWidth,
    cssProperties.borderRadius,
    cssProperties.bottom,
    cssProperties.columnRuleWidth,
    cssProperties.columnWidth,
    cssProperties.fontSize,
    cssProperties.gridColumnGap,
    cssProperties.gridGap,
    cssProperties.gridRowGap,
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
    cssProperties.outlineWidth,
    cssProperties.padding,
    cssProperties.paddingBottom,
    cssProperties.paddingLeft,
    cssProperties.paddingRight,
    cssProperties.paddingTop,
    cssProperties.perspective,
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
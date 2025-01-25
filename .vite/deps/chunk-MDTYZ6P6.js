import {
  requirePropFactory_default,
  useDefaultProps
} from "./chunk-MJW2WNW5.js";
import {
  createGrid,
  generateUtilityClass,
  generateUtilityClasses,
  require_prop_types,
  styled_default,
  useTheme
} from "./chunk-LMLP6RGP.js";
import {
  __toESM
} from "./chunk-2TUXWMP5.js";

// node_modules/@mui/material/Grid2/Grid2.js
var import_prop_types = __toESM(require_prop_types());
var Grid2 = createGrid({
  createStyledComponent: styled_default("div", {
    name: "MuiGrid2",
    slot: "Root",
    overridesResolver: (props, styles) => {
      const {
        ownerState
      } = props;
      return [styles.root, ownerState.container && styles.container];
    }
  }),
  componentName: "MuiGrid2",
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiGrid2"
  }),
  useTheme
});
true ? Grid2.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * The number of columns.
   * @default 12
   */
  columns: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.number), import_prop_types.default.number, import_prop_types.default.object]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: import_prop_types.default.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types.default.arrayOf(import_prop_types.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types.default.object]),
  /**
   * Defines the offset value for the type `item` components.
   */
  offset: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number, import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number])), import_prop_types.default.object]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  /**
   * Defines the size of the the type `item` components.
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.bool, import_prop_types.default.number, import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.bool, import_prop_types.default.number])), import_prop_types.default.object]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string])), import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string]),
  /**
   * @ignore
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * @internal
   * The level of the grid starts from `0` and increases when the grid nests
   * inside another grid. Nesting is defined as a container Grid being a direct
   * child of a container Grid.
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid container> // level 1
   *     <Grid container> // level 2
   * ```
   *
   * Only consecutive grid is considered nesting. A grid container will start at
   * `0` if there are non-Grid container element above it.
   *
   * ```js
   * <Grid container> // level 0
   *   <div>
   *     <Grid container> // level 0
   * ```
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid>
   *     <Grid container> // level 0
   * ```
   */
  unstable_level: import_prop_types.default.number,
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: import_prop_types.default.oneOf(["nowrap", "wrap-reverse", "wrap"])
} : void 0;
if (true) {
  const Component = Grid2;
  const requireProp = requirePropFactory_default("Grid2", Component);
  Component["propTypes"] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Component.propTypes,
    direction: requireProp("container"),
    spacing: requireProp("container"),
    wrap: requireProp("container")
  };
}
var Grid2_default = Grid2;

// node_modules/@mui/material/Grid2/grid2Classes.js
function getGrid2UtilityClass(slot) {
  return generateUtilityClass("MuiGrid2", slot);
}
var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
var WRAPS = ["nowrap", "wrap-reverse", "wrap"];
var GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var grid2Classes = generateUtilityClasses("MuiGrid2", [
  "root",
  "container",
  // spacings
  ...SPACINGS.map((spacing) => `spacing-xs-${spacing}`),
  // direction values
  ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
  // wrap values
  ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
  // grid sizes for all breakpoints
  ...GRID_SIZES.map((size) => `grid-xs-${size}`),
  ...GRID_SIZES.map((size) => `grid-sm-${size}`),
  ...GRID_SIZES.map((size) => `grid-md-${size}`),
  ...GRID_SIZES.map((size) => `grid-lg-${size}`),
  ...GRID_SIZES.map((size) => `grid-xl-${size}`)
]);
var grid2Classes_default = grid2Classes;

export {
  Grid2_default,
  getGrid2UtilityClass,
  grid2Classes_default
};
//# sourceMappingURL=chunk-MDTYZ6P6.js.map

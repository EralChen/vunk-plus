/**
 * Global ambient declaration for `vue-types`, used by `@vunk-plus/ant`'s type checking.
 *
 * `vue-types@7` ships `.d.mts` that imports (but does not re-export) internal
 * types like `ValidatorFunction` from a hashed deep path. When `tsc` emits
 * declaration files it cannot name those types, producing `TS2883` errors.
 *
 * This `declare module` shadows the real `vue-types` package **only for type
 * checking**. Runtime resolution still uses the real package, so behaviour is
 * unchanged.
 */
declare module 'vue-types' {
  import type { PropType } from 'vue'

  type NativeType = string | boolean | number | null | undefined | Function
  type Constructor = new (...args: any[]) => any
  type DefaultFactory<T> = (() => T) | T
  type DefaultType<T> = T extends NativeType ? T : DefaultFactory<T>
  type ExtractNonArray<T> = T extends (infer U)[] ? never : T
  type Prop<T> = ExtractNonArray<PropType<T>>

  export interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null
    required?: boolean
    default?: D | DefaultFactory<D> | null | undefined | object
    validator?(value: unknown, props: Record<string, unknown>): boolean
  }

  export type InferType<T> = T extends { type: null | true }
    ? any
    : T extends ObjectConstructor | { type: ObjectConstructor }
      ? Record<string, any>
      : T extends Prop<infer V>
        ? V
        : T extends PropOptions<infer V>
          ? V
          : T extends VueTypeDef<infer V>
            ? V
            : T extends VueTypeValidableDef<infer V>
              ? V
              : T

  export type ValidatorFunction<T> = (
    value: T,
    props?: Record<string, unknown>,
  ) => boolean

  interface VueTypeBaseDef<
    T = unknown,
    D = DefaultType<T>,
    U = T extends NativeType ? T : () => T,
  > extends PropOptions<T> {
    _vueTypes_name: string
    type?: PropType<T>
    readonly def: (def?: D) => this & { default: U }
    readonly isRequired: this & { required: true }
  }

  export type VueTypeDef<T = unknown> = VueTypeBaseDef<T>

  export interface VueTypeValidableDef<
    T = unknown,
    V = ValidatorFunction<T>,
  > extends VueTypeBaseDef<T> {
    readonly validate: (fn: V) => this & { validator: V }
  }

  export type VueProp<T> = VueTypeBaseDef<T> | PropOptions<T>

  export interface VueTypeShape<T> extends VueTypeBaseDef<
    T,
    DefaultType<Partial<T>>,
    () => Partial<T>
  > {
    readonly loose: VueTypeLooseShape<T>
  }

  export interface VueTypeLooseShape<T> extends VueTypeBaseDef<
    T,
    DefaultFactory<Partial<T & Record<string, any>>>,
    () => Partial<T> & Record<string, any>
  > {
    readonly loose: VueTypeLooseShape<T>
    readonly _vueTypes_isLoose: true
  }

  export interface VueTypesDefaults {
    func: (...args: any[]) => any
    bool: boolean
    string: string
    number: number
    array: () => any[]
    object: () => Record<string, any>
    integer: number
  }

  export interface VueTypesConfig {
    silent: boolean
    logLevel: 'log' | 'warn' | 'error' | 'debug' | 'info'
  }

  export interface VueTypesInterface extends VueTypesDefaults {
    new (): {}
    defaults: Partial<VueTypesDefaults>
    get sensibleDefaults(): boolean | Partial<VueTypesDefaults>
    set sensibleDefaults(v: boolean | Partial<VueTypesDefaults>)
    config: VueTypesConfig
    readonly any: VueTypeValidableDef<any, ValidatorFunction<any>>
    readonly func: VueTypeValidableDef<
      (...args: any[]) => any,
      ValidatorFunction<(...args: any[]) => any>
    >
    readonly bool: VueTypeValidableDef<boolean, ValidatorFunction<boolean>>
    readonly string: VueTypeValidableDef<string, ValidatorFunction<string>>
    readonly number: VueTypeValidableDef<number, ValidatorFunction<number>>
    readonly array: VueTypeValidableDef<unknown[], ValidatorFunction<unknown[]>>
    readonly object: VueTypeValidableDef<
      Record<string, any>,
      ValidatorFunction<Record<string, any>>
    >
    readonly integer: VueTypeDef<number>
    readonly symbol: VueTypeDef<symbol>
    readonly nullable: PropOptions<null, null>
    readonly custom: <T>(
      validatorFn: ValidatorFunction<T>,
      warnMsg?: string,
    ) => VueTypeDef<T>
    readonly oneOf: <D, T extends readonly D[] = readonly D[]>(
      arr: T,
    ) => VueTypeDef<T[number]>
    readonly oneOfType: <
      D extends InferType<U>,
      U extends VueProp<any> | Prop<any> = any,
    >(
      arr: U[],
    ) => VueTypeDef<D>
    readonly arrayOf: <T extends VueProp<any> | Prop<any>>(
      type: T,
    ) => VueTypeDef<InferType<T>[]>
    readonly instanceOf: <C extends Constructor>(
      instanceConstructor: C,
    ) => VueTypeDef<InstanceType<C>>
    readonly objectOf: <T extends VueProp<any> | Prop<any>>(
      type: T,
    ) => VueTypeDef<Record<string, InferType<T>>>
    readonly shape: <T extends object>(obj: {
      [K in keyof T]: Prop<T[K]> | VueProp<T[K]>
    }) => VueTypeShape<T>
    extend(..._args: any[]): void
    utils: {
      validate(value: unknown, type: unknown): boolean
      toType: <T = unknown>(
        name: string,
        obj: PropOptions<T>,
        validable?: boolean,
      ) => VueTypeDef<T> | VueTypeValidableDef<T>
    }
  }

  export function createTypes(
    defs?: Partial<VueTypesDefaults>,
  ): VueTypesInterface

  export const config: VueTypesConfig
}

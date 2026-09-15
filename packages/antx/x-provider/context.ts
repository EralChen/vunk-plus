import { objectType, type AnyObject } from '../_util/type';
import { computed, type ComputedRef, type CSSProperties, defineComponent, inject, type InjectionKey, provide, shallowRef, triggerRef, unref, watch } from 'vue';
import type { ConfigProviderProps as OriAntdConfigProviderProps } from '@vunk-plus/ant';
import type { SenderProps } from '../sender/interface';

// Stubbed types for components not included in vendored antx
interface ActionsProps {}
interface AttachmentsProps {}
interface BubbleProps {}
interface ConversationsProps {}
interface PromptsProps {}
interface SuggestionProps {}
interface ThoughtChainProps {}
interface WelcomeProps {}

// refer from the ConfigProviderProps of ant-design-vue
export interface AntdConfigProviderProps {
  iconPrefixCls?: OriAntdConfigProviderProps['iconPrefixCls'];
  getTargetContainer?: OriAntdConfigProviderProps['getTargetContainer'];
  getPopupContainer?: OriAntdConfigProviderProps['getPopupContainer'];
  prefixCls?: OriAntdConfigProviderProps['prefixCls'];
  getPrefixCls?: OriAntdConfigProviderProps['getPrefixCls'];
  renderEmpty?: OriAntdConfigProviderProps['renderEmpty'];
  transformCellText?: OriAntdConfigProviderProps['transformCellText'];
  csp?: OriAntdConfigProviderProps['csp'];
  input?: OriAntdConfigProviderProps['input'];
  autoInsertSpaceInButton?: OriAntdConfigProviderProps['autoInsertSpaceInButton'];
  locale?: OriAntdConfigProviderProps['locale'];
  pageHeader?: OriAntdConfigProviderProps['pageHeader'];
  componentSize?: OriAntdConfigProviderProps['componentSize'];
  componentDisabled?: OriAntdConfigProviderProps['componentDisabled'];
  direction?: OriAntdConfigProviderProps['direction'];
  space?: OriAntdConfigProviderProps['space'];
  virtual?: OriAntdConfigProviderProps['virtual'];
  dropdownMatchSelectWidth?: OriAntdConfigProviderProps['dropdownMatchSelectWidth'];
  form?: OriAntdConfigProviderProps['form'];
  pagination?: OriAntdConfigProviderProps['pagination'];
  theme?: OriAntdConfigProviderProps['theme'];
  select?: OriAntdConfigProviderProps['select'];
  wave?: OriAntdConfigProviderProps['wave'];
}

export interface XComponentStyleConfig {
  classNames: Record<string, string>;
  styles: Record<string, CSSProperties>;
  className: string;
  style: CSSProperties;
}

export type DefaultPickType = keyof XComponentStyleConfig;

export type ComponentStyleConfig<
  CompProps extends AnyObject,
  PickType extends keyof CompProps = DefaultPickType,
> = Pick<CompProps, PickType | DefaultPickType>;

export interface XComponentsConfig {
  actions?: ComponentStyleConfig<ActionsProps>;
  bubble?: ComponentStyleConfig<BubbleProps>;
  conversations?: ComponentStyleConfig<ConversationsProps>;
  prompts?: ComponentStyleConfig<PromptsProps>;
  sender?: ComponentStyleConfig<SenderProps>;
  suggestion?: ComponentStyleConfig<SuggestionProps>;
  thoughtChain?: ComponentStyleConfig<ThoughtChainProps>;
  attachments?: ComponentStyleConfig<AttachmentsProps>;
  welcome?: ComponentStyleConfig<WelcomeProps>;
}

export type XProviderProps = XComponentsConfig & AntdConfigProviderProps & {
  // Non-component config props
};

const XProviderContextKey: InjectionKey<ComputedRef<XProviderProps>> =
  Symbol('XProviderContext');

export const globalXProviderApi = shallowRef<XProviderProps>();

export const useXProviderContextProvider = (value: ComputedRef<XProviderProps>) => {
  provide(XProviderContextKey, value);
  watch(
    value,
    () => {
      globalXProviderApi.value = unref(value);
      triggerRef(globalXProviderApi);
    },
    { immediate: true, deep: true },
  );
};

export const useXProviderContextInject = () => {
  return inject(
    XProviderContextKey,
    computed(() => globalXProviderApi.value || {}),
  );
};
export const XProviderContextProvider = defineComponent({
  props: {
    value: objectType<XProviderProps>(),
  },
  setup(props, { slots }) {
    useXProviderContextProvider(computed(() => props.value));
    return () => {
      return slots.default?.();
    };
  },
});

export default XProviderContextProvider;

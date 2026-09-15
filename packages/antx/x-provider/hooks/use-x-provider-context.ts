import { useConfigContextInject } from '@vunk-plus/ant';

export const defaultPrefixCls = 'ant';

function useXProviderContext() {
  const { getPrefixCls, direction, csp, iconPrefixCls, theme } = useConfigContextInject();

  return {
    theme,
    getPrefixCls,
    direction,
    csp,
    iconPrefixCls,
  };
}

export default useXProviderContext;

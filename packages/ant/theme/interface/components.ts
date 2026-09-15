import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as CalendarComponentToken } from '../../calendar/style';
import type { ComponentToken as DatePickerComponentToken } from '../../date-picker/style';
import type { ComponentToken as EmptyComponentToken } from '../../empty/style';
import type { ComponentToken as FlexComponentToken } from '../../flex/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as ModalComponentToken } from '../../modal/style';
import type { ComponentToken as ProgressComponentToken } from '../../progress/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as TooltipComponentToken } from '../../tooltip/style';
import type { ComponentToken as TypographyComponentToken } from '../../typography/style';
import type { ComponentToken as UploadComponentToken } from '../../upload/style';
import type { ComponentToken as WaveToken } from '../../_util/wave/style';

export interface ComponentTokenMap {
  Button?: ButtonComponentToken;
  Calendar?: CalendarComponentToken;
  DatePicker?: DatePickerComponentToken;
  Empty?: EmptyComponentToken;
  Flex?: FlexComponentToken;
  Form?: {};
  Grid?: {};
  Image?: ImageComponentToken;
  Input?: {};
  Modal?: ModalComponentToken;
  Progress?: ProgressComponentToken;
  Space?: SpaceComponentToken;
  Tooltip?: TooltipComponentToken;
  Typography?: TypographyComponentToken;
  Upload?: UploadComponentToken;

  /** @private Internal TS definition. Do not use. */
  Wave?: WaveToken;
}